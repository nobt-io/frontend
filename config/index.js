/* eslint key-spacing:0 spaced-comment:0 */
import path from 'path'
import _debug from 'debug'
import { argv } from 'yargs'
import ip from 'ip'

const localip = ip.address()
const debug = _debug('app:config')
debug('Creating default configuration.')

// ========================================================
// Default Configuration
// ========================================================
const config = {
  env : process.env.NODE_ENV || 'development',

  // ----------------------------------
  // Project Structure
  // ----------------------------------
  path_base  : path.resolve(__dirname, '..'),
  dir_client : 'src',
  dir_dist   : 'dist',
  dir_server : 'server',
  dir_test   : 'tests',

  // ----------------------------------
  // Server Configuration
  // ----------------------------------
  server_host : localip, // use string 'localhost' to prevent exposure on local network
  server_port : process.env.PORT || 3000,

  // ----------------------------------
  // Compiler Configuration
  // ----------------------------------
  compiler_css_modules     : true,
  compiler_devtool         : 'source-map',
  compiler_hash_type       : 'chunkhash',
  compiler_fail_on_warning : false,
  compiler_quiet           : false,
  compiler_public_path     : '/',
  compiler_stats           : {
    chunks : false,
    chunkModules : false,
    colors : true
  },
  vendor_packages : [
    'babel-polyfill',
    'history',
    'react',
    'react-dom',
    'react-headroom',
    'react-bootstrap',
    'react-intl',
    'react-redux',
    'react-router',
    'react-router-redux',
    'redux-logger',
    'react-copy-to-clipboard',
    'redux-thunk',
    'react-toolbox',
    'react-scrollspy',
    'react-rotating-text',
    'debug',
    'redux',
    'reselect',
    'axios'
  ],

  // ----------------------------------
  // Test Configuration
  // ----------------------------------
  coverage_reporters : [
    { type : 'text-summary' },
    { type : 'lcov', dir : 'coverage' }
  ]
}

/************************************************
-------------------------------------------------

All Internal Configuration Below
Edit at Your Own Risk

-------------------------------------------------
************************************************/

// ------------------------------------
// Environment
// ------------------------------------
// N.B.: globals added here must _also_ be added to .eslintrc
config.globals = {
  'process.env'  : {
    'NODE_ENV' : JSON.stringify(config.env)
  },
  'COMMIT_HASH'   : JSON.stringify(process.env.COMMIT_HASH),
  'SENTRY_DSN'    : JSON.stringify(process.env.SENTRY_DSN),
  'NODE_ENV'      : config.env,
  '__DEV__'       : config.env === 'development',
  '__PROD__'      : config.env === 'production',
  '__TEST__'      : config.env === 'test',
  '__DEBUG__'     : config.env === 'development' && !argv.no_debug,
  '__COVERAGE__'  : !argv.watch && config.env === 'test',
  '__BASENAME__'  : JSON.stringify(process.env.BASENAME || '')
};

// ------------------------------------
// Validate Vendor Dependencies
// ------------------------------------
const pkg = require('../package.json')

config.vendor_packages = config.vendor_packages
  .filter((dep) => {
    if (pkg.dependencies[dep]) return true

    debug(
      `Package "${dep}" was not found as an npm dependency in package.json; ` +
      `it won't be included in the webpack vendor bundle.
       Consider removing it from vendor_dependencies in ~/config/index.js`
    )
  })

// ------------------------------------
// Utilities
// ------------------------------------
const resolve = path.resolve
const base = (...args) =>
  Reflect.apply(resolve, null, [config.path_base, ...args])

config.utils_paths = {
  base   : base,
  client : base.bind(null, config.dir_client),
  dist   : base.bind(null, config.dir_dist)
};

// ------------------------------------
// Env-specific configuration
// ------------------------------------
debug(`Applying environment specific configuration for ${config.env}.`);

// Note: If this fails, you are missing a config file for you environment.
let configFactory = require(`./config.${config.env}.js`).default;
let overrides = configFactory(config);

Object.assign(config, overrides);

export default config;
