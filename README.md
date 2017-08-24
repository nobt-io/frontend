# nobt.io Frontend

[![Build Status](https://travis-ci.org/nobt-io/frontend.svg?branch=master)](https://travis-ci.org/nobt-io/frontend)


## Running the frontend locally

In order to run the frontend locally, use `npm run dev`. It will compile the source code and host the application on `http://localhost:3000`.

## Building from source

To build the production-ready version of the frontend, use `npm run deploy`. The build process requires two environment variables to be set: `COMMIT_HASH` and `SENTRY_DSN`. Both are used to configure Raven, the JavaScript library for Sentry in order to provide error reporting. The deploy command just invokes `npm run compile` with `NODE_ENV` set to `production`. This triggers a config override and makes the two configuration values mandatory. For more information see `config/index.js` and `config/environment.js`.

## Deployment configuration

The project and its environment is setup for CD to an Amazon S3 bucket. The following lines are an effort to document how this is achieved.

### GZIP compression

Building the project with the command listed above enables several plugins in the webpack configuration. One of the most important ones is the compression plugin. It is configured to compress all JavaScript and CSS files and their respective source maps with gzip and place them to the "gzipped" folder in the "dist" folder. This is necessary in order to simplify deployment of those artifacts.

Usually, gzip-compression is handled by the webserver that serves that files. Our app though is served by Amazon S3, which just hands out the files the way they are. This means we have to apply the gzip compression up-front and already store those files gzipped. That is reason why we have two "sync" commands in the deployment config found in the .travis.yml file. The first one uploads all the files that have not been processed by the compression plugin, like pictures and regular text files. The second command then uploads all JavaScript and CSS files from the "gzipped" folder and sets the content encoding correctly. This way, our S3 bucket always serves those files with gzip compression. It may be of importance that S3 completely ignores whether or not the browser requests the files gzipped. However, for the last 20 years (https://webmasters.stackexchange.com/a/22223), all browsers support gzip compression so we should not have a problem with serving those files gzipped all the time.

### Source Maps

Generation of source maps is enabled for both, JS and CSS. However, the configuration for the production environment is set to "hidden-source-maps" which means that no link to the source maps is embedded in the minified file. We also do not upload the source maps to Amazon S3. We just upload them to sentry.io which gives us nice stacktraces in error reports.

### Travis configuration

The build configuration of travis is split into two parts: Regular build and deployment. The regular build steps are always executed whereas the deployment command is only executed if the request for building the commit comes from the main repository and is not(!) a pull-request. Secure variables are not available to pull-requests. The `npm run deploy` command, as listed above, requires two environment variables to be set, which are not available to regular builds in order to prevent them from being exposed by malicious pull-requests that modify the .travis.yml config and try to export them. If you look at the `package.json` file, you will see that the `npm run deploy` command is just the `npm run compile` command executed with the `ENV` variable set to production. This triggers some configuration overrides that make the presence of other env variables mandatory.
