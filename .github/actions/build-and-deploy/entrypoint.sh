#!/usr/bin/env bash
curl -L https://github.com/getzola/zola/releases/download/v${ZOLA_VERSION}/zola-v${ZOLA_VERSION}-x86_64-unknown-linux-gnu.tar.gz | tar xz -C /usr/local/bin

# Install netlify
npm i -g netlify-cli

# Kick off build and deploy
zola build
netlify deploy \
  --prod \
  --dir=$NETLIFY_DEPLOY_DIR \
 --auth=$NETLIFY_AUTH_TOKEN \
 --site=$NETLIFY_SITE_ID