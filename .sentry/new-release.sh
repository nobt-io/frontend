set -e;

VERSION=$(yarn run --silent sentry-cli releases propose-version);

yarn run --silent sentry-cli releases new "$VERSION";
yarn run --silent sentry-cli releases files "$VERSION" upload-sourcemaps ./dist --validate;
yarn run --silent sentry-cli releases set-commits "$VERSION" --auto;
