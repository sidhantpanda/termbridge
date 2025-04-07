#!/bin/bash
# Usage: ./find_port.sh <port>

if [ $# -ne 1 ]; then
  echo "Usage: $0 <port>"
  exit 1
fi

PORT=$1

echo "Searching for processes listening on port $PORT..."

# Check if lsof is available
if command -v lsof &> /dev/null; then
    lsof -iTCP:$PORT -sTCP:LISTEN -n -P
# Fallback to netstat if lsof isn't available
elif command -v netstat &> /dev/null; then
    sudo netstat -tulpn | grep ":$PORT"
else
    echo "Neither lsof nor netstat is installed. Please install one of them to proceed."
    exit 1
fi
