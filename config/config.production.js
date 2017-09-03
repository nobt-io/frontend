export default (config) => {

  if (!config.globals.SENTRY_DSN) {
    throw new Error("SENTRY_DSN is not defined!")
  }

  if (!config.globals.COMMIT_HASH) {
    throw new Error("COMMIT_HASH is not defined!")
  }

  return {
    compiler_public_path: '/',
    compiler_fail_on_warning: false,
    compiler_hash_type: 'chunkhash',
    compiler_stats: {
      chunks: true,
      chunkModules: true,
      colors: true
    }
  }
}
