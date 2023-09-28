FROM node:18-alpine3.15

RUN set -x \
    && apk update \
    && apk upgrade \
    && export NODE_OPTIONS=--openssl-legacy-provider
ENV NODE_OPTIONS --openssl-legacy-provider
ENV CHOKIDAR_USEPOLLING true
ENV HOST 0

WORKDIR /
COPY ./ ./
RUN set -x \
    && npm install

