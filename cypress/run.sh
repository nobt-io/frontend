#!/bin/bash

set -x;
set -e;

node_modules/.bin/ws -p 3000 -d dist --spa index.html &
HTTP_SERVER_PID=$!

sleep 1
node_modules/.bin/cypress run --browser chrome

kill -9 ${HTTP_SERVER_PID}
