VERSION=$(yarn run --silent sentry-cli releases propose-version);

yarn run --silent sentry-cli releases deploys "$VERSION" new --env production;
