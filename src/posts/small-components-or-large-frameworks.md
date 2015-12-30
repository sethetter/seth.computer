---
collection: posts
layout: post.html
title: Small components, or large frameworks?
url: small-components-or-large-frameworks
date: 2015-06-25
---

This is a hot topic these days, and the JavaScript world is definitely siding
with "small, composable components" over "one framework that gives you
everything you probably need". However, I think there are some things to
consider that get often looked over in the debate.

Just to clarify: I'm not sure which I side on. I have *years* of frustrations
with frameworks that make me think the small module approach is "better". But,
I've also experienced some pains when working in a component driven stack as
well.

Maybe I'm just playing devil's advocate, or something. Either way, here's what's
been on my mind.

### Frameworks are complex, and that's bad

Sure. Frameworks have to solve for a lot of things, and they have to try and
provide as many features as possible to handle any scenario that you might
encounter. The point of a framework is giving you just about everything you
could need. That's a pretty big task to take on, so inherently it's going to
result in a complex system.

Here's the thing people never mention: sometimes you need all those things, and
**a large web application is going to be a inherently complex**. We should
always strive to make them as simple as possible, but there is still a
limitation. The things we build sometimes have to be large and complex.

**Scenario 1: Build it with a framework**

If we are building a very large and featureful web application, using a
framework means we have all we need (allegedly, I'll admit). Learning to use the
framework is an overhead, but the documentation is usually all in one place and
usually consistent, which is nice.

**Scenario 2: Build it with a bunch of small modules**

If we are building a very large and featureful web application using a bunch of
small modules, we are *still* going to end up with a pretty damn complex
technology stack. Just because each tool in itself is small and easy to
understand doesn't mean that the collection of modules and how they interact *as
a whole* will also be simple and digestible.

In fact, it can be quite the opposite.

### Consistency

One benefit of a framework is the consistency. If you arent't sure how to
accomplish a particular task, chances are it has been done by another user of
the framework and you can find the answer online somewhere.

For modules, this is equally true. However, if the task you're trying to
accomplish involves more than just one of the modules you're using, then you
have to find an answer that involves the use of those two modules specifically,
which can be a bit less likely (unless they're very popular modules, etc).

### The parts of a whole

When you're working with a framework, typically each piece of that framework has
it's own documentation. You could even think of these pieces as modules that fit
into a greater whole. That doesn't seem so bad, does it? You're essentially
doing the same with a collection of module components.

The difference is that the components in a framework are built with the rest of
the components in mind. They make damn sure that they will work well together,
and that's also part of the documentation. If two people are building modules in
isolation, who's to say how easily those two modules will actually work
together?

Sure, things like standardization and semantics can help guide this. But the
point is that frameworks typically make sure to have you covered.

### Enough rambling

This is something that's been on my mind. I'm personally trying to make my
decision on which type of architecture I prefer. There are clear wins on either
side, but my big point is that **this idea that our applications will be so much
simpler because we use a collection of simple tools is false**.

Combining a bunch of simple tools into a large system (framework, even?) results
in complexity. The complexity of a system is better handled in the overall
architecture of the system itself, not necessarily the tools you use to build
it.

Don't judge a tool just because it's a framework, judge it based on the actual
overall quality of it. Complete solutions can be great, and small modules can be
great. They each have their place in the world.
