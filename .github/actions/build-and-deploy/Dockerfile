FROM node:lts-alpine

ARG zola_version=0.12.2
ARG netlify_auth_token
ARG netlify_site_id
ARG netlify_deploy_dir=public

ENV NETLIFY_AUTH_TOKEN=${netlify_auth_token}
ENV NETLIFY_SITE_ID=${netlify_site_id}

WORKDIR /src

# zola
RUN apk add curl~=7
RUN curl -L https://github.com/getzola/zola/releases/download/v${zola_version}/zola-v${zola_version}-x86_64-unknown-linux-gnu.tar.gz | tar xz
RUN mv zola /bin/zola

# netlify
RUN npm i -g netlify-cli

RUN ls -la /bin

# build and deploy!
RUN zola build
RUN netlify deploy --prod --dir=${netlify_deploy_dir}