// NOTE: In development, we use an explicit public path when the assets
// are served webpack by to fix this issue:
// http://stackoverflow.com/questions/34133808/webpack-ots-parsing-error-loading-fonts/34133809#34133809

export default (config) => ({
  devtool: "eval",
  compiler_public_path: `http://${config.server_host}:${config.server_port}/`,
  compiler_hash_type: 'hash',
  proxy: {
    enabled: false,
    options: {
      host: 'http://localhost:8000',
      match: /^\/api\/.*/
    }
  }
})
