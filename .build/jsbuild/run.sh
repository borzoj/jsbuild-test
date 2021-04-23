#!/usr/bin/env bash

TEST_OUTPUT_DIR="/app/test-results/js/"

function finish {
  rm /app/node_modules
  user_id=$(stat -c '%u:%g' /app)
  chown -R ${user_id} /app
}
trap finish EXIT

set -e

# prepare output dirs
function prepare_dirs() {
  mkdir -p ${TEST_OUTPUT_DIR}
}

# generate the npm dependencies
function link_modules() {
  # link the dependencies installed as part of the docker build
  ln -s /usr/lib/app/node_modules /app/node_modules
}

prepare_dirs
link_modules

cd /app
npm "$@"
