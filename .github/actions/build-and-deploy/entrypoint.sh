#!/bin/sh -l
zola build
netlify deploy --prod --dir=public