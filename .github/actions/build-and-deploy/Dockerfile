FROM node:lts-alpine

ARG zola_version=0.12.2
ARG netlify_auth_token
ARG netlify_site_id
ARG netlify_deploy_dir=public

WORKDIR /src

RUN apk add curl~=7
# TODO: parameterize zola version
RUN curl -L https://github.com/getzola/zola/releases/download/v${zola_version}/zola-v${zola_version}-x86_64-unknown-linux-gnu.tar.gz | tar xz
RUN mv zola /usr/bin/zola
RUN npm i -g netlify-cli

RUN /usr/bin/zola build

ENV NETLIFY_AUTH_TOKEN=${netlify_auth_token}
ENV NETLIFY_SITE_ID=${netlify_site_id}
RUN netlify deploy --prod --dir=${netlify_deploy_dir}