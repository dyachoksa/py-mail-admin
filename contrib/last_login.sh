#!/usr/bin/env bash

SCRIPT_LOCATION=$(dirname "$0")
BASE_DIR=$(dirname "$SCRIPT_LOCATION")

cd "$BASE_DIR" || exit

source .venv/bin/activate

flask mailboxes set-last-login "$USER" "$IP"

exec "$@"
