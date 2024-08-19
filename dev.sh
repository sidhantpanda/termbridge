#!/usr/bin/env bash
set -e

cleanup() {
    docker compose -f  compose.dev.yaml down
    trap '' EXIT INT TERM
    exit $err
}

trap cleanup SIGINT EXIT

# Determine if sudo is required
if docker info &> /dev/null; then
    SUDO=""
else
    SUDO="sudo"
    echo "Docker commands require sudo permission. Please ensure you have the necessary privileges."
fi

# Make sure docker-compose is installed
if command -v docker-compose &> /dev/null; then
    DOCKER_COMPOSE_CMD="docker-compose"
elif docker compose version &> /dev/null; then
    DOCKER_COMPOSE_CMD="docker compose"
else
    echo "Neither 'docker-compose' nor 'docker compose' is installed."
    exit 1
fi

# Ensure the termbridge network exists
if [ -z "$($SUDO docker network ls -qf name=^termbridge$)" ]; then
  echo "Creating network"
  $SUDO docker network create termbridge >/dev/null
fi

COMPOSE_HTTP_TIMEOUT=120 $SUDO $DOCKER_COMPOSE_CMD -f compose.dev.yaml up -d --force-recreate

yarn dev
