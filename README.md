# nobt.io Frontend

[![Build Status](https://travis-ci.org/nobt-io/frontend.svg?branch=master)](https://travis-ci.org/nobt-io/frontend)

This repository contains the source code for the frontend of nobt.io!

## Running

1. `yarn run dev`: Starts the webpack-dev-server
2. Clone the API: `git clone http://github.com/nobt-io/api` (ideally as a sibling folder next to this one)
3. `yarn run api`: Starts a local API instance. A locally started frontend will connect to this one instead of the production API.

## Building

`yarn run deploy`

The build process requires two environment variables to be set: `COMMIT_HASH` and `SENTRY_DSN`. Both are used to configure Raven, the JavaScript library for Sentry in order to provide error reporting.

### Travis

The build configuration of travis is split into two parts: Regular build and deployment. The regular build steps are always executed whereas the deployment command is only executed if the request for building the commit comes from the main repository and is not(!) a pull-request. Secure variables are not available to pull-requests. The `yarn run deploy` command, as listed above, requires two environment variables to be set, which are not available to regular builds in order to prevent them from being exposed by malicious pull-requests that modify the .travis.yml config and try to export them. If you look at the `package.json` file, you will see that the `yarn run deploy` command is just the `yarn run compile` command executed with the `ENV` variable set to production. This triggers some configuration overrides that make the presence of other env variables mandatory.

### Source Maps

Generation of source maps is enabled for both, JS and CSS. However, we do not upload the source maps to Amazon S3. We just upload them to sentry.io which gives us nice stacktraces in error reports.
