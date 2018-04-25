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

The build configuration of travis is split into two parts: Regular build and deployment. The regular build steps are always executed whereas the deployment command is only executed if the request for building the commit comes from the main repository and is not(!) a pull-request. Secure variables are not available to pull-requests. The `npm run deploy` command, as listed above, requires two environment variables to be set, which are not available to regular builds in order to prevent them from being exposed by malicious pull-requests that modify the .travis.yml config and try to export them. If you look at the `package.json` file, you will see that the `npm run deploy` command is just the `npm run compile` command executed with the `ENV` variable set to production. This triggers some configuration overrides that make the presence of other env variables mandatory.

### Source Maps

Generation of source maps is enabled for both, JS and CSS. However, we do not upload the source maps to Amazon S3. We just upload them to sentry.io which gives us nice stacktraces in error reports.

### GZIP Compression

Building the project with the command listed above enables several plugins in the webpack configuration. One of the most important ones is the compression plugin. It is configured to compress all JavaScript and CSS files and their respective source maps with gzip and place them to the "gzipped" folder in the "dist" folder. This is necessary in order to simplify deployment of those artifacts.

Usually, gzip-compression is handled by the webserver that serves that files. Our app though is served by Amazon S3, which just hands out the files the way they are. This means we have to apply the gzip compression up-front and already store those files gzipped. That is reason why we have two "sync" commands in the deployment config found in the .travis.yml file. The first one uploads all the files that have not been processed by the compression plugin, like pictures and regular text files. The second command then uploads all JavaScript and CSS files from the "gzipped" folder and sets the content encoding correctly. This way, our S3 bucket always serves those files with gzip compression. It may be of importance that S3 completely ignores whether or not the browser requests the files gzipped. However, for the last 20 years (https://webmasters.stackexchange.com/a/22223), all browsers support gzip compression so we should not have a problem with serving those files gzipped all the time.

All of this is only needed because sentry cannot yet handle gzipped files. As soon as sentry can do that, we can simply override the original files with the gzipped ones and just upload the whole dist folder.