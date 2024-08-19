#!/usr/bin/env bash
set -e

cleanup() {
    docker compose -f  compose.dev.yaml down
    trap '' EXIT INT TERM
    exit $err
}

trap cleanup SIGINT EXIT

# Make sure docker-compose is installed
if command -v docker-compose &> /dev/null; then
    DOCKER_COMPOSE_CMD="docker-compose"
elif docker compose version &> /dev/null; then
    DOCKER_COMPOSE_CMD="docker compose"
else
    echo "Neither 'docker-compose' nor 'docker compose' is installed."
    exit 1
fi

if [ -z "$(docker network ls -qf name=^termbridge$)" ]; then
  echo "Creating network"
  docker network create termbridge >/dev/null
fi

COMPOSE_HTTP_TIMEOUT=120 $DOCKER_COMPOSE_CMD -f compose.dev.yaml up -d --force-recreate

yarn dev
