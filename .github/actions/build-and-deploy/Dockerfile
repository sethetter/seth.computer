FROM node:lts

ENV ZOLA_VERSION
ENV NETLIFY_AUTH_TOKEN
ENV NETLIFY_SITE_ID
ENV NETLIFY_DEPLOY_DIR

# Install zola
RUN curl -L https://github.com/getzola/zola/releases/download/v${ZOLA_VERSION}/zola-v${ZOLA_VERSION}-x86_64-unknown-linux-gnu.tar.gz | tar xz -C /usr/local/bin

# Install netlify
RUN npm i -g netlify-cli

# Kick off build and deploy
COPY entrypoint.sh /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]