FROM node:18-alpine3.15

RUN set -x \
    && apk update \
    && apk upgrade \
    && apk add --no-cache \
    openjdk17-jre-headless \
    && npm install -g firebase-tools
