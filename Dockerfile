FROM node:20-bookworm AS installer

COPY . /app
RUN corepack enable yarn
WORKDIR /app
RUN yarn install

FROM node:20-bookworm AS builder-common

COPY . /app
RUN corepack enable yarn
WORKDIR /app
COPY --from=installer /app/node_modules /app/node_modules

WORKDIR /app/packages/common
RUN yarn build

FROM node:20-bookworm AS builder-client

COPY . /app
RUN corepack enable yarn

WORKDIR /app
COPY --from=installer /app/node_modules /app/node_modules
COPY --from=builder-common /app/packages/common/dist /app/packages/common/dist

WORKDIR /app/packages/client
RUN yarn build

FROM node:20-bookworm AS builder-server

COPY . /app
RUN corepack enable yarn

WORKDIR /app
COPY --from=installer /app/node_modules /app/node_modules
COPY --from=builder-common /app/packages/common/dist /app/packages/common/dist

WORKDIR /app/packages/server
RUN yarn build

# Use a lightweight base image for the final image
FROM node:20-alpine

RUN corepack enable yarn

COPY . /app

COPY --from=installer /app/node_modules /app/node_modules
COPY --from=builder-common /app/packages/common/dist /app/packages/common/dist
COPY --from=builder-client /app/packages/client/dist /app/packages/client/dist
COPY --from=builder-server /app/packages/server/dist /app/packages/server/dist

WORKDIR /app/packages/server

ENV CLIENT_DIST=/app/packages/client/dist

EXPOSE 3000

CMD ["yarn", "start"]
