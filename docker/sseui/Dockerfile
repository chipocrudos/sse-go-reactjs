# syntax=docker/dockerfile:1

ARG NODE_VERSION=18

FROM node:${NODE_VERSION} AS base
WORKDIR /src

FROM base as build
ARG VITE_SERVERAPI
ARG VITE_APPID

WORKDIR /src

COPY ./sseui ./sseui

RUN --mount=type=cache,target=/root/.npm \
    cd sseui && yarn install

RUN env | grep VITE_ > sseui/.env
RUN cd sseui && yarn build

FROM nginx:alpine-slim as final

COPY --from=build /src/sseui/dist/. /usr/share/nginx/html/
