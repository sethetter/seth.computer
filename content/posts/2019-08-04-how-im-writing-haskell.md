+++
title = "How I'm currently writing Haskell"
author = "Seth Eter"
date = 2019-08-04
+++

Recently, I decided to jump back into learning and exploring in the fun and
mind-bending world of functional programming. I've spent some time diving into
Haskell before (in 2018 I completed all [Advent of
Code](https://adventofcode.com) challenges in Haskell!) and I very much enjoyed
myself. The amount of mental backflips I had to perform with it being such a
different way of thinking about my code was valuable, and enjoyable!

I decided, this time around, to jump in even deeper.

To that end, I installed [NixOS](https://nixos.org) on my personal laptop and
decided to learn more about the purely functional side of package management,
environment management and operating systems. A good friend of mine had made me
familiar with Nix before, and it piqued my interest.

My system and user setup can be found [in my dotfiles
repo](https://github.com/sethetter/dotfiles/tree/12a1469853e575ea7386850c3c3e07eecb31efb8),
stored in a `nixos` branch. But for this article I want to talk about the
development environment setup I have put together using Nix for the purpose of
writing Haskell code.

_Note: I'm sure there are *a lot* of things I'm missing here, and could greatly
improve, and will probably learn about as I get further in. What I'm sharing
today is something that at least *works* for me, for now._

# Goals

As always, there are tons of ways a person can approach dev environments, and
using diferent tools in different ways can lead to a huge variety of outcomes.
To that end, I'm rooting my setup in the following goals.

- *Efficient access to information*. When I want to look up the type signature
  or documentation for a function, that should be a relatively quick and easy
  process.
- *Fast feedback*. Haskell development is all about having a conversation with
  the compiler, and is part of what makes it so much fun. Reducing the
  latency in that conversation means a more fluid and enjoyable development
  experience.
- *Locally contained*. Since we're using Nix, it makes sense to have as much
  of the tooling and configuration contained within the project itself, so
  anyone with nix can just get up and running.
- *Simplicity*. Should be self explanatory, but I don't want to introduce any
  sort of complexity, unless the value it adds is worth it _and can't be
  achieve by another, simpler tooling combination_.

As you'll see, there are tradeoffs made between each of these goals in certain
decisions, but I try to make sure I understand and make those tradeoffs
consciously.

# Tools

The tools involved in this whole setup are as follows.

- Nix + Cabal, for dependencies.
- Vim, for writing the code.
- GHCid, for compiler feedback.
- Hoogle, for documentation.

# Vim, Tmux, Fish, Git

There are a few tools that _are_ installed at the system level, and not the
project level. Having _literally everything_ defined and available within the
project is a cool idea, but all things must have a limit.

My preferred shell is [fish](https://fishshell.com/), preferred editor is
[vim](https://www.vim.org/), preferred version control system is
[git](https://git-scm.com/), and I prefer managing my terminal sessions with
[tmux](https://github.com/tmux/tmux/wiki).

I also have some vim plugins installed, but have opted to try and keep them
simple by avoiding any language server integration, etc. Syntax highlighting is
the main thing I'm going for here, and I'll depend on self contained tools
running in separate terminal sessions for the feedback I would otherwise want
directly in my editor.

This decision has _greatly_ simplified the overall setup. The headache of
getting vim integration with local nix dependencies was not worth it.

How I have all of these things configured can be seen [in my dotfiles
repo](https://github.com/sethetter/dotfiles/tree/12a1469853e575ea7386850c3c3e07eecb31efb8).

# Cabal, getting started

[Cabal](https://www.haskell.org/cabal/) is the tool we will use to manage our Haskell project, and it's
dependencies. It also has a command for initializing a new project, which we
can use with the following `nix-shell` command.

```shell
$ nix-shell -p ghc --run "cabal init"
```

This will take you through some prompts to get your project configured, and
will output some files, most important of which is the `projectname.cabal`
file. This file defines the project, what it outputs, and what it's Haskell
dependency inputs are.

## Real quick, why not Stack?

Another option we have for defining our Haskell project and it's dependencies
was to use [Stack](https://docs.haskellstack.org/en/stable/README/), which will
almost always come up as the preferred tool when Googling around, _except if
you're also using Nix_.

One of stack's main benefits is that it pulls project depdendencies from
[Stackage](https://www.stackage.org/), a project which maintains snpashots of
known stable Haskell packages that work well together, pass tests, and build
consistently.  This helps to avoid what is known in the Haskell world as "cabal
hell", where trying to get a set of dependencies for your project that all
build together and work as intended takes way more work than should be
necessary.

So why don't we need Stack? Because *Nix knows to pull it's Haskell packages
from Stackage as well*! This is accomplished using the
[`cabal2nix`](https://www.stackage.org/package/cabal2nix) tool. As we'll see in
the next section, using this tool from a nix file directly is quite simple and
convenient.

# Base Nix setup

There are 2 nix files we will keep in our project root. One is for defining the
project itself, mostly based on our cabal file. The second is for defining our
local development environment tooling.

*The first one is `default.nix`.* This file is pretty simple, and just calls
`cabal2nix` on our local cabal file that was created with our earlier `cabal
init`. This is all it contains.

```nix
# default.nix
{ pkgs ? import <nixpkgs> {} }:
pkgs.haskellPackages.callCabal2nix "your-project-name" ./. {}
```

This would be the same as using the `cabal2nix` utility to generate a nix file
from our project's cabal file. With this in place, we don't have to call
`cabal2nix` any time our cabal file is updated.

*The second one is `shell.nix`.* This one is used for defining all the
dependencies needed for our local development environment. It first pulls in
everything from `default.nix`, and then adds a few more things used for the
dev process.

```nix
# shell.nix
{ pkgs ? import <nixpkgs> {} }:
let
  project = pkgs.haskellPackages.callPackage ./default.nix {};
in
  pkgs.stdenv.mkDerivation {
    name = "shell";
    buildInputs = with pkgs; project.env.nativeBuildInputs ++ [
      haskellPackages.hoogle
      haskellPackages.hlint
      haskellPackages.ghcid
    ];
  }
```

The extra tools that are getting included are..

- *hoogle*, for looking up information from [Hoogle](https://hoogle.haskell.org).
- *hlint*, for linting.
- *ghcid*, for having a conversation with the compiler (mentioned shortly).

With these files in place we can run `nix-shell` and be dropped into an
environment where all of the above dependencies that we've specified are
available, including the dependencies from our cabal file, pulled from
stackage.

And that's it! As I mentioned above, vim, tmux, and fish are all installed at
the user level, and some vim plugins are in place.

Next we'll talk about the two important pieces for making the development
process effective, efficient, and enjoyable.

# GHCi(d)

As we saw in our `shell.nix` file, we now have a couple different utilities
installed, one of which is `ghcid`. There's also another utility available that
came along with having GHC installed for our haskell environment, `ghci`.

First, *`ghci`* is a Haskell repl that we can load our code into for testing
and introspection. What is the type of the composition of two of our functions,
with one partially applied? Just type it into `ghci` with the `:t` prefix to
find out. This tool [can do a whole lot more](https://downloads.haskell.org/~ghc/latest/docs/html/users_guide/ghci.html) too!

To make our experience even better, we can have a file called `.ghci` in our
project root which will run some commands when `ghci` starts up.

```shell
-- .ghci
:set -fwarn-unused-binds -fward-unused-imports
:add src/MyLib.hs src/Main.hs test/Spec.hs
```

The first line ensures we get warnings for unused variable bindings, and unused
imports, because hygeine is important. The second line imports the modules that
we want in scope in our `ghci` session.

You may have noticed that this means every time we add a file to our project,
we have to include it here. This may not be a big deal, but could be an
annoyance. I imagine there's a way to get around this, but I'm not sure what it
is yet.

On top of being a powerful repl tool, `ghci` _also_ powers the `ghcid` tool (as
the name suggests). `ghcid` simply runs `ghci` as a daemon, reloading
everything when source files are changed.

The result is very quick feedback from GHC on what is wrong with our code. I
mentioned previously being able to "have a conversation" with the compiler, and
`ghcid` is exactly how we make that conversation fluid.

I typically like to have a tmux split open next to vim with `ghcid` running
within a nix-shell. I also pass a command to it so it knows how to run my test
suite upon successful compilation (which I'll talk about more in the next
section).

```shell
$ nix-shell --run "ghcid --test Spec.run"
```

At this point I can work on my code in vim and get real time feedback in a tmux
split from `ghcid`, and upon successful compilation, my test suite will run.
Neat! You can learn about more GHCid features in [this
article](https://www.parsonsmatt.org/2018/05/19/ghcid_for_the_win.html)

# Testing with hspec

In the last section, I mentioned passing an argument to our `ghcid` command
that would allow our test suite to run after a successful compilation. That
test suite is being run with [`hspec`](https://hspec.github.io/).

To make hspec available in our project, we need to add it to our cabal
dependencies, but we do this in a specific area of the file, under a
`test-suite` section. Add the following to the bottom of your cabal file.

```yaml
test-suite tests
  type:                exitcode-stdio-1.0
  hs-source-dirs:      test
  main-is:             Main.hs
  other-modules:       Spec

  build-depends:       base ^>=4.12.0.0,
                       hspec,
                       your-project
```

Here we are specifying a `test-suite` for our project named `tests` (cabal
allows you to have multiple test suites defined). The tests are contained in
the `test` folder, and the main module to run is `Main.hs`. Our dependencies
outside of `base` are our project lib, and `hspec`. Lastly, we want to define
one other module, `Spec`.

It's important to note here that all our `Main.hs` module does is run the test
suite with `Spec.run`. The reason for this is so we can run our test suite in
`ghcid` without having a collision on the `Main` module name. You'll notice in
the `.ghci` configuration above, we don't include `test/Main.hs`, specifically
to avoid that naming collision.

Here's our entire `test/Main.hs` file.

```haskell
-- test/Main.hs
module Main where

import Spec

main :: IO ()
main = Spec.run
```

..and here's a small sample file for `test/Spec.hs`.

```haskell
module Spec where

import Test.Hspec
import YourLib (add5)

run :: IO ()
run = hspec $ do
  describe "add5" $ do
    it "adds 5 to the provided Int" $ do
      add5 3 `shouldBe` 8
```

Now we can add to this as we go, and `ghcid` will automatically run them on any
code changes, which makes for a very nice development experience. Awesome.

# Hoogle, documentation and type lookups

One of our goals, the first one actually, is _efficient access to information_.
Some of that information is about our local code, but we are also going to need
access to information about the dependencies we're using, and Prelude.


Thankfully we installed a handy tool called `hoogle` that let's us search for
that information, as well as a vim plugin for using and browsing hoogle search
results! Hoogle even lets us search by type, which can help us find something
to fit exactly the spot we need in our code.

# Building the project

There's still a lot I have to learn about building nix derivations, and cabal
packages, and distributing them, so all I can really cover here is how to build
an executable with cabal (or nix) and run it.

To build and run it with cabal..

```shell
$ cabal v2-build
$ cabal v2-run your-executable
```

To build it with nix..

```shell
$ nix-build
```

In the output of `nix-build`, you should see a path to a `bin` folder, with
your executable inside it. You can run it from there to test it out.

# That's it for now!

I'm sure there will be many ways in which this setup changes over time, but
this is what I have for now, and hopefully it's a nice and simple setup that
others new to the worlds of Nix and Haskell can benefit from. Both tools are
incredibly fun to work with, and powerful tools to have at your disposal. I
look forward to sharing more about them in the future!
