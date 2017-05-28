# nobt.io Frontend

[![Build Status](https://travis-ci.org/nobt-io/frontend.svg?branch=master)](https://travis-ci.org/nobt-io/frontend)


## Running the frontend locally

In order to run the frontend locally, use `npm run dev`. It will compile the source code and host the application on `http://localhost:3000`.

## Building from source

To build the production-ready version of the frontend, use `npm run deploy`. The build process requires two environment variables to be set: `COMMIT_HASH` and `SENTRY_DSN`. Both are used to configure Raven, the JavaScript library for Sentry in order to provide error reporting. The deploy command just invokes `npm run compile` with `NODE_ENV` set to `production`. This triggers a config override and makes the two configuration values mandatory. For more information see `config/index.js` and `config/environment.js`.
