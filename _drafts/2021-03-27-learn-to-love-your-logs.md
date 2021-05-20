+++
title = "Learn to love your logs"
author = "Seth Etter"
date = 2021-03-27

[taxonomies]
tags = ["programming"]
+++

When a new problem arises in your system, what do you turn to for more information? In general, "the logs" should be somewhere pretty high on that list.

Sometimes there are no logs, and that's super unfortunate. Sometimes it's not obvious where those logs may live. Sometimes the logs are so noisy it's difficult to get any useful information out of them.

There are certainly many reasons why log data may not be front of mind for a particular system. But resolving those issues and learning to make the most of this source of information is a worthy endeavor.

Consistent effort should be made to become familiar with your logs, know where they are, what information they contain, and how they can be tuned to be even more useful.

## Engineering is about problem solving

When you're attempting to solve a problem, what you need is **information**. What is the problem you're trying to solve? What context does this problem occur in? What steps lead to the occurrence of the problem? What is the state of the system when the problem occurs?

**Quite often, the answers to all of these questions, as well as more targeted questions specific to the system, can be found in the logs.**

## Spend time investing in your logs

- Structured logging, attach metadata
  - For web apps, attach request IDs
  - Attach other useful information — current layer, etc
- Use logging levels to be able to turn up the detail on demand
  - Leave your debug logging in place as debug statements

## Know how to search your logs

- Local development — keep them tailed, be able to search, pretty print
- Deployed systems — tons of resources on this
- Know your layers and where to find each layer's logs
- Know the shape of your logs
- Become familiar with important keywords worth searching for

## Make it a habit
