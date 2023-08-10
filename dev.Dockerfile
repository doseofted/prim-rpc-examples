# FIXME: Tests work on host but fail inside of container (WIP)

FROM node:18-bullseye
USER root
# Corepack is still experimental and not enabled by default
# LINK https://nodejs.org/api/corepack.html#enabling-the-feature
RUN corepack enable
# These are required for running Playwright browsers (provided by Playwright over CLI)
RUN apt-get update && apt-get install -y \
  libnss3 \
  libnspr4 \
  libatk1.0-0 \
  libatk-bridge2.0-0 \
  libcups2 \
  libdbus-1-3 \
  libdrm2 \
  libxkbcommon0 \
  libatspi2.0-0 \
  libxcomposite1 \
  libxdamage1 \
  libxfixes3 \
  libxrandr2 \
  libgbm1 \
  libasound2
USER node
# Create generic project folder in home and assign to correct user
RUN mkdir -p /home/node/project && chown node /home/node/project
WORKDIR /home/node/project
# Install dependencies
COPY --chown=node pnpm-*.yaml package.json ./
RUN pnpm fetch
RUN pnpm install --frozen-lockfile
# Copy all projects into container
COPY --chown=node ./ ./
# Install needed browsers
RUN pnpm test-install
# Run the tests
CMD [ "pnpm", "test" ]
