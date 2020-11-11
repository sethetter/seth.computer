#!/usr/bin/env bash
zola build
netlify deploy --prod --dir public