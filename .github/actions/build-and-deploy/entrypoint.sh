#!/usr/bin/env bash
zola build
netlify deploy --prod --dir public --auth $NETLIFY_AUTH_TOKEN