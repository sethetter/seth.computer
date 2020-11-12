#!/usr/bin/env bash
zola build
netlify deploy \
  --prod \
  --dir=$NETLIFY_DEPLOY_DIR \
 --auth=$NETLIFY_AUTH_TOKEN \
 --site=$NETLIFY_SITE_ID