FROM node:lts

ARG zola_version=0.12.2
ARG netlify_auth_token
ARG netlify_site_id
ARG netlify_deploy_dir=public

ENV NETLIFY_AUTH_TOKEN=${netlify_auth_token}
ENV NETLIFY_SITE_ID=${netlify_site_id}

WORKDIR /src

# Install zola
RUN curl -L https://github.com/getzola/zola/releases/download/v${zola_version}/zola-v${zola_version}-x86_64-unknown-linux-gnu.tar.gz | tar xz -C /usr/local/bin

# Install netlify
RUN npm i -g netlify-cli

# Kick off build and deploy
COPY entrypoint.sh /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]