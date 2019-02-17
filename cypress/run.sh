#!/bin/bash

set -x;
set -e;

yarn run ws -p 3000 -d dist --spa index.html &
HTTP_SERVER_PID=$!

sleep 1
yarn run cypress run

kill -9 ${HTTP_SERVER_PID}