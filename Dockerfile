# Use a base image with the desired programming language and dependencies
FROM node:20-bookworm AS builder

# Copy the necessary files to the container
COPY . /app

RUN corepack enable yarn

WORKDIR /app
RUN yarn install

WORKDIR /app/packages/common
RUN yarn build

# Build the client package
WORKDIR /app/packages/client
RUN yarn build

# Build the server package
WORKDIR /app/packages/server
RUN yarn build

# Use a lightweight base image for the final image
FROM node:20-alpine

RUN corepack enable yarn


COPY . /app

# Copy the built packages from the builder stage
COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/packages/client/dist /app/packages/client/dist
COPY --from=builder /app/packages/common/dist /app/packages/common/dist
COPY --from=builder /app/packages/server/dist /app/packages/server/dist

# Set the working directory
WORKDIR /app/packages/server

# Set any necessary environment variables
ENV CLIENT_DIST=/app/packages/client/dist

EXPOSE 3000

# Specify the command to run when the container starts
CMD ["yarn", "start"]
