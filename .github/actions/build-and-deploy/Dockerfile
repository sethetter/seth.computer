FROM node:lts

ARG zola_version=0.12.2
ARG netlify_auth_token
ARG netlify_site_id
ARG netlify_deploy_dir=public

# Install zola
RUN curl -L https://github.com/getzola/zola/releases/download/v${zola_version}/zola-v${zola_version}-x86_64-unknown-linux-gnu.tar.gz | tar xz -C /usr/local/bin

# Install netlify
RUN npm i -g netlify-cli

# Kick off build and deploy
RUN zola build
RUN netlify deploy --prod --dir=public --auth=$netlify_auth_token --site=$netlify_site_id
# COPY entrypoint.sh /entrypoint.sh
# ENTRYPOINT ["/entrypoint.sh"]