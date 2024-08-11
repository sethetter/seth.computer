---
title: "Custom GitHub Actions with Docker"
author:
  name: Seth Etter
  uri: https://sethetter.com
tags: ['programming', "tools"] 
layout: "note.tsx"
links: [
  { name: "Hacker News", url = "https://news.ycombinator.com/item?id=25066079" },
  { name: "Twitter", url = "https://twitter.com/sethetter/status/1326729005337341953" },
]
---

I finally decided to dip my toes into GitHub actions recently, for a relatively simple task: build and deploy my personal site. The site is built with [zola](https://getzola.org) and deployed to [netlify](https://netlify.com).

My needs are pretty straightforward.

- The zola binary
- Node, and [netlify-cli](https://www.npmjs.com/package/netlify-cli) installed
- Secure way to provide netlify config

Then I simply make sure my site source is checked out and run the `build` and `deploy` commands.

## Some terminology

An [**action**](https://docs.github.com/en/free-pro-team@latest/actions/creating-actions/about-actions) is a single step that may be performed in a larger [**workflow**](https://docs.github.com/en/free-pro-team@latest/actions/reference/workflow-syntax-for-github-actions), which strings together multiple actions and is kicked off in response to various events (like a `git push`, or a PR). You can have a workflow that calls a single action, but an action can't be used without being called in a workflow.

## First impression with Actions

I noticed the marketplace approach first of all, and the emphasis on actions that did one small thing which you compose together. This can definitely be a nice approach to things, but my preferred way of working on CI tasks like this is to have access to a Docker container where I have a bit more control of my environment, and can codify it into a familiar Dockerfile.

My thinking is, if I can get this sort of approach to work, I'll have less required domain knowledge of GitHub actions, and can instead just lean on my Docker knowledge to set up whatever operations I may need.

Needless to say, I simply sidestepped the marketplace and found the [documentation for utilizing Docker](https://docs.github.com/en/free-pro-team@latest/actions/creating-actions/creating-a-docker-container-action), which thankfully is a valid option! 🎉

## My setup

I stumbled through this quite a bit, but ultimately am happy with the approach. I'm able to have a `Dockerfile` and custom [`entrypoint.sh`](https://docs.docker.com/engine/reference/builder/#entrypoint) file that can receive inputs via env vars from the action configuration. I'm also able to pipe secrets, stored in my GitHub repo, into the action from the workflow file.

### [The action file](https://github.com/sethetter/seth.computer/blob/1e916825348e2ee2f401b5204811c18e394432e3/.github/actions/build-and-deploy/action.yml)

```yaml
# .github/actions/build-and-deploy/action.yml
name: 'Build and deploy'
description: 'Build site with Zola and deploy to Netlify'
inputs:
  auth_token:
    description: 'Netlify auth token'
    required: true
  site_id:
    description: 'Netlify site ID to deploy to'
    required: true
  deploy_dir:
    description: 'Directory to deploy to netlify'
    required: true
  zola_version:
    description: 'Version of zola to pull'
    required: true
    default: '0.12.2'
runs:
  using: 'docker'
  image: 'Dockerfile'
  env:
    ZOLA_VERSION: ${{ inputs.zola_version }}
    NETLIFY_AUTH_TOKEN: ${{ inputs.auth_token }}
    NETLIFY_SITE_ID: ${{ inputs.site_id }}
    NETLIFY_DEPLOY_DIR: ${{ inputs.deploy_dir }}
```

This file defines our action, which will be called from a workflow which we will configure later. The main thing to notice here is how we are accepting inputs, and passing those on to our Docker container through environment variables.

**This was one of the things I stumbled over**. Currently there is no support for passing [build args](https://docs.docker.com/engine/reference/commandline/build/#set-build-time-variables---build-arg) to our Dockerfile, and the environment variables we provide are not available during the build stage, only once the [`ENTRYPOINT`](https://docs.docker.com/engine/reference/builder/#entrypoint) is called.

I was stuck on this for a decent chunk of time before realizing that [`runs.args` with `docker` are *not* build args](https://docs.github.com/en/free-pro-team@latest/actions/creating-actions/metadata-syntax-for-github-actions#runsargs), they are arguments sent to the `entrypoint`. Don't make the same mistakes I did!

The implication here is that any steps in your action that require one of these inputs must happen in the `ENTRYPOINT` provided via `env`. I'll mention this again shortly.

### Docker setup

The [Dockerfile](https://github.com/sethetter/seth.computer/blob/4fdf1675084628f6ddd3aaa31aaa05a1a118b1d6/.github/actions/build-and-deploy/Dockerfile) is pretty minimal, simply setting up the base environment I want, which is `node:lts` in this case, and then copy in my custom `[entrypoint.sh](http://entrypoint.sh)` script.

```yaml
# .github/actions/build-and-deploy/Dockerfile
FROM node:lts
COPY entrypoint.sh /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]
```

**Tip!** [Don't set a `WORKDIR`](https://docs.github.com/en/free-pro-team@latest/actions/creating-actions/dockerfile-support-for-github-actions#workdir). The action sets the workdir to the `$GITHUB_WORKSPACE` variable which is where your project source will be located.

All the action happens in the [`entrypoint.sh`](https://github.com/sethetter/seth.computer/blob/1e916825348e2ee2f401b5204811c18e394432e3/.github/actions/build-and-deploy/entrypoint.sh) file.

```yaml
# .github/actions/build-and-deploy/entrypoint.sh

#!/usr/bin/env bash
ZOLA_URL=https://github.com/getzola/zola/releases/download/v${ZOLA_VERSION}/zola-v${ZOLA_VERSION}-x86_64-unknown-linux-gnu.tar.gz
curl -L $ZOLA_URL | tar xz -C /usr/local/bin

# Install netlify
npm i -g netlify-cli

# Kick off build and deploy
zola build
netlify deploy \
  --prod \
  --dir=$NETLIFY_DEPLOY_DIR \
 --auth=$NETLIFY_AUTH_TOKEN \
 --site=$NETLIFY_SITE_ID
```

You can see here we're referencing the `env` vars we defined in our action file. Originally I had the zola and netlify install steps happening in the `Dockerfile`, but due to the inability to pass build args to the image, I wasn't able to get the `$ZOLA_VERSION` passed in. Once I had that realization, it seemed just as viable to put everything in `entrypoint.sh`.

### [The workflow file](https://github.com/sethetter/seth.computer/blob/4fdf1675084628f6ddd3aaa31aaa05a1a118b1d6/.github/workflows/build-and-deploy.yml)

```yaml
# .github/workflows/build-and-deploy.yml
name: build-and-deploy
on:
  push:
    branches: [master]
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: ./.github/actions/build-and-deploy
        with:
          zola_version: '0.12.2'
          auth_token: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          site_id: ${{ secrets.NETLIFY_SITE_ID }}
          deploy_dir: 'public'
```

This is our final configuration file, turning our new custom action into a workflow. We start by setting our workflow triggers in the `on` block. In this case we just want to run this workflow on pushes to `master`.

Next is our `jobs` block. We can define multiple jobs which would all run in parallel. If we need anything serial, it should happen within a single job. In our case, we have just one job with two actions.

The job itself starts with the checkout action, which handles checking out the repo's source into the job workspace, then we call our custom action by providing a path to the action folder.

In our `with` block we provide values for the inputs we defined on our action. You'll notice that two of the values are provided via `secrets`, which is a [feature of GitHub](https://docs.github.com/en/free-pro-team@latest/actions/reference/encrypted-secrets) I wasn't aware of before this. It's very easy to work with!

## Room for improvement

I think the main drawback here is potentially slow job run times, since we're installing our dependencies each time. Depending on what's actually slow, there are a number of ways it could be addressed.

In general, finding a base Docker image that has as much of what you need as possible (without too much bloat) is going to help. Maintaining your own images in a registry somewhere comes with it's own overhead, but that's also an option.

I'm sure using the marketplace approach could also be a way to address the performance issues, assuming you find actions that have your dependencies installed and configured appropriately, but the goal of this post was to explore a minimal action configuration while leveraging the power of Docker 😄.

**That's it!** 👋
