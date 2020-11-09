+++
title = "What makes an API simple?"
author = "Seth Etter"
date = 2019-08-30
+++

I recently published a blog post for the [Ad Hoc
Blog](https://adhoc.team/blog/) titled [What makes an API
simple?](https://adhoc.team/2019/08/23/what-makes-an-api-simple/). In that post
I explored the tradeoffs around some API design decisions, and what it means
for an API to be "simple". Here is that post :)

---

When designing an API, you should always strive for simplicity. Unchecked
complexity can make your system more difficult to use, change, and debug. These
compounding effects can put you and your team in a bind when it comes to
improvements, and it can make the system painful or impossible to use for those
who depend on it.

While you typically use an API to facilitate machine-to-machine communication,
it’s almost always going to be a human who will spend the time building the
thing that integrates with your API. Taking the time to ensure that it’s as
easy as possible to get your API to do what the customer needs it to do will
make your API a better and more effective tool.

But what exactly does "keeping it simple" look like in the context of API
design? Does it mean keeping the request input as minimal as possible? Or
keeping endpoints focused on a single purpose? Straight-forward and easy-to-use
documentation? Or better yet, making it so simple that the required
documentation is minimal?

Where your implementation should fall on these various spectrums must always
come back to what is best for your users. In other words, there is no silver
bullet! What’s important is taking the time to think through the implications
of your approach and how it will affect your users.

Today, we’ll be exploring the tradeoffs you make when deciding how minimal to
keep your API’s request input data. It’s easy to assume that the best way to
keep your API simple is to have fewer request inputs, but what are we
sacrificing by going that route?

## Let's make a decision

Imagine you have an API endpoint that helps calculate the premium for an
individual on an insurance plan. Let’s assume that one of the variables going
into this calculation is whether the person likes to skydive or not. In short,
**we're trying to arrive on whether `goes_skydiving` is true or false**.

On the surface, it seems like the simplest approach here is to allow the user
to provide the `goes_skydiving` field as either true or false. We would be
giving the consumer a single field with an obvious purpose. Easy-peasy. This
raises the question though, are there cases in which this is the *wrong*
approach?

One assumption we’re making is that this boolean value implies the person
actively goes skydiving *at this point in time*. But what if there are
scenarios where we want to know if a person was an active skydiver at a
different point in time or under *different* circumstances?

A changing **context** in how you’re making this calculation means that
`goes_skydiving` might not always simply mean "are they *currently* an active
skydiver." This makes it a **derived value** that potentially requires several
pieces of contextual data and the knowledge of how to put that contextual data
together to arrive on the simple true/false value.

Knowing this, we have two options.

1. **Provide the single `goes_skydiving` boolean, keeping the API request data
   simple.** As a side effect, the consumer is now responsible for knowing the
   business rules and required data around determining the value of that single
   field.
2. **Expand the allowed request input, requiring all other contextual data
   needed to derive the `goes_skydiving` field.** The consumer now has to
   provide additional data in their request, but the burden of implementing the
   more complex business logic is now shifted onto the API.

## Is it better to have a *simple design*, or be *simple to use*?

Having a simple design means that the inputs to the API are limited and easy to
understand. It means looking at the expected request to an API endpoint doesn’t
make your eyes gloss over. But does this actually mean the API is *simple to
use*?

### Option 1: Fewer inputs, simpler interface

Going with option one means we assume that the API user knows enough about the
business logic required to arrive at the `goes_skydiving` value. Furthermore,
it means we’re assuming that the user will stay up to date with those rules
*potentially changing over time*.

If we go this route, it’s possible for the user to submit an incorrect value
for that single field. The API would likely not have enough contextual data to
know whether they applied the current business rules correctly or not. The
system assumes the user sent the right value, and as a result, returns the
wrong result, potentially in a silent fashion.

### Option 2: More inputs, fewer assumptions

Option two requires that the API user gather more individual pieces of
information to pass to the API to get to the derived `goes_skydiving` value,
which can be a burden. What if some of those specific pieces of information are
not readily available? What if there is so much required contextual data that
it requires frequent trips to the documentation to get right?

The question is whether this extra data burden is enough of a negative *for the
user* to offset the possibility that they will calculate the `goes_skydiving`
incorrectly. Sure, the API implementation will take a bit more effort, but
there is a greater assurance that the result coming from the API will be
correct according to the current state of the policy rules.

Did something change in how `goes_skydiving` is calculated over the last year?
Do we now need to look at three years of skydiving history instead of the
previous two? As long as the API implements this change and the user provides
the data to make the decision, then all API users will automatically be using
the updated version of these rules, and we get a stronger guarantee for
compliance. In the government space where policies and rules are often in flux,
this is critical.

## Being "simple to use"

When deciding between these two choices, it's important to consider your tool’s
purpose. Why are people using your API? What do they need from it? Making your
API simple to use means understanding what people are using it for, and
**optimizing in a way that makes their ability to use the API as simple as
possible**.

If the purpose of your API is to encapsulate business logic, ensuring
calculations and determinations are done accurately according to some
particular set of policies which could change over time, then "keeping it
simple" could mean placing the burden of that complexity on the API.

By making extra contextual data part of the request input, you can use
validation errors to guide the user to ensure they provide the right data.
While the time and effort required to integrate with the API may increase, this
approach helps ensure that users are integrating properly, and are receiving
useful feedback from the API along the way.

## Documentation

Whichever approach you choose, you still need good documentation. If you choose
a more simple API input interface, the documentation for that single field
should contain *all* of the information necessary for the consumer to arrive on
a value for that field. This means packing in a lot of business logic, *and*
hoping the person happens to read it and use the field correctly, *and* that
they stay up to date with any changes in the business logic!

If you choose to require all contextual data and derive the value ourselves
instead, you have to **be transparent about how the calculation is being
performed**. Make sure you document each of the contextual data points in a way
that shows how they’re used in overall determinations. Educating the users of
our tool is always a worthy endeavor, and can only lead to better understanding
and use.

## Work with your users

Whenever you’re trying to make something simple, it's important to think of the
people who are using your tool. When the design of the API reduces the
possibility of errors for the user, it becomes a more valuable tool. Making
your API easy to use also means people spend less time working to integrate
with it, meaning they get more value in less time, a win-win for everyone. An
API’s simplicity or complexity is always measured relative to its human
consumers, not in isolation.

Sometimes it will be simpler to have a design with composable elements, and
sometimes it will be simpler to encapsulate lots of nuanced logic so you guide
them along a happy path. As we mentioned from the start, there is no fixed
answer. Just make sure you’re considering all the potential tradeoffs of
whatever decision you make.

Oh, and don't forget the documentation!
