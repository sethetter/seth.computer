---
collection: posts
layout: post.html
title: How I made this site with Jekyll and GitHub
path: how-i-made-this-site-with-jekyll-and-github
url: 2015/10/15/how-i-made-this-site-with-jekyll-and-github
date: 2015-10-15
---

So, this site is made with a system called [Jekyll](http://jekyllrb.com/). It's
a static site generator written in Ruby. It's dead simple to use, and with the
help of GitHub, can be really quick and easy to deploy as well.

On top of all that, you get to write your site content in
[markdown](https://daringfireball.net/projects/markdown/)! Can't beat that.

## Getting Jekyll

First you need Ruby installed, I don't want to go too far into this but if you
don't have it, I recommend using [rvm](https://rvm.io/).

If you're up and running with Ruby, next you need to install Jekyll.

{% highlight bash %}
$ gem install jekyll
{% endhighlight %}

Now you can create your new site! The Jekyll command line tool let's you
generate a new Jekyll site with the following command.

{% highlight bash %}
$ jekyll new your-site-name
{% endhighlight %}

As an alternative, you can go find a cool Jekyll theme (like I did - the
[Lanyon theme](https://github.com/poole/lanyon)) and start with that. In my case
I just forked the repo, cloned it down, and made it my own. The directory
structure is already set up to work like a Jekyll site should.

## Local development

Since developing directly on a live server is not usually a good idea, you might
want to know how to serve your Jekyll site locally.

{% highlight bash %}
$ jekyll s
{% endhighlight %}

The "s" is short for "serve". Makes sense, right? Cool.

Now you can navigate to http://localhost:4000 and see your awesome statically
generated site. But how exactly is this working? It's pretty simple, really.

## It's all static files

All Jekyll does is take your layout files and your markdown for pages and posts
and then turn them into static HTML files. It compiles this all into a folder
called `_site/` and then launches a file server on your system.

Some benefits of this are that it's crazy fast, no server side logic to deal
with, just send along the files.

For making your layouts more complex, there is an `_includes/` folder that you
can use to hold HTML fragments that you might reuse in multiple places. You can
also define different layouts in the `_layouts/` folder for different page
types, like pages vs posts.

Lastly, `index.html` is going to be the home page for your site. Again, makes
sense.

## Site content

All of the site content is done is markdown. You can use HTML optionally, but
why would you? All of your blog posts and page content will be automagically
compiled into your layouts based on a couple things.

### Blog posts

All your blog posts will go into a `_posts/` folder. The naming convention is
`YYYY-MM-DD-title-of-your-post.md`. Jekyll, when rendering your site, will loop
through all of these and create a list of them on your home page, and create an
individual post view page for each as well.

Any time you create a new post, you simply add the file to the posts folder with
your content in markdown, and some basic information headers, re-render your
site, and you're good to go.

To build your site and generate the static files that you can host wherever you
like, use:

{% highlight bash %}
$ jekyll b
{% endhighlight %}

The `b` is short for build. You could also write `jekyll build`. Once you've
done this your site will be ready and available in `_site/`. You could then take
these files, put them up on any web server, and your site is ready!

## Hosting on GitHub Pages

Even easier than hosting static files on a web server is hosting this site on
[GitHub](https://github.com) using [GitHub Pages](https://pages.github.com/).
Start by creating a repo for your site on your GitHub account.

You will want to have your primary git branch for this site as `gh-pages`
instead of `master` like you normally would. If you go to the "Settings" in your
GitHub repo, then "Branches", you will see a place to change the "Default
branch" to something of your choosing.

Make sure to create a gh-pages branch locally and then push to it on GitHub:

{% highlight bash %}
$ git push origin gh-pages
{% endhighlight %}

You can use Jekyll normally and when you push to this new repo, it will build it
and make it available at https://yourusername.github.io/repo-name.

## Setting up custom domain

You have a site deployed using GitHub pages and Jekyll! Now you might want to
point a custom domain at it so you have something a little friendlier.

The first thing you'll want to do is create a file in the root directory of
your repo called CNAME. This file should only contain the custom domain you are
going to use, without the protocol. Mine liikes like this:

{% highlight bash %}
sethetter.com
{% endhighlight %}

Then you'll need to set a couple A records in your zone file for your domain.
The IP addresses to point to are 192.30.252.153 and 192.30.252.154. For more
info on this, check out [Setting up a custom domain with GitHub
Pages](https://help.github.com/articles/setting-up-a-custom-domain-with-github-pages/).

## Themes?

Check out [jekyllthemes.org](http://jekyllthemes.org/), or just google for
[Jekkyl Themes](http://lmgtfy.com/?q=jekyll+themes). There's a ton out there.
This one is built using the [Lanyon](https://github.com/poole/lanyon) theme.

## That's it!

Go have fun :)
