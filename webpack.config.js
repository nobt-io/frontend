const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DefinePlugin = require('webpack').DefinePlugin;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (_, argv) => {
  const isProduction = argv.mode === 'production';

  const requireEnv = envName => {
    const envValue = JSON.stringify(process.env[envName]);

    if (!envValue) {
      throw new Error(`${envName} is not defined!`);
    }

    return envValue;
  };

  const COMMIT_HASH = isProduction
    ? requireEnv('COMMIT_HASH')
    : JSON.stringify('');
  const SENTRY_DSN = isProduction
    ? requireEnv('SENTRY_DSN')
    : JSON.stringify('');
  const __DEV__ = argv.mode === 'development';

  return {
    entry: ['babel-polyfill', './src/app.js'],
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ['babel-loader'],
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
        {
          test: /\.(ts|tsx)?$/,
          use: ['babel-loader', 'ts-loader'],
          exclude: /node_modules/,
        },
        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                modules: true,
                localIdentName: '[name]__[local]--[hash:base64:5]',
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
                includePaths: [path.resolve(__dirname, 'src', 'styles')],
                data: `@import '${path.resolve(
                  __dirname,
                  'src',
                  'styles',
                  'theme.scss'
                )}';`,
              },
            },
          ],
        },
        {
          test: /\.(png|jpg)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name]_[hash:4].[ext]',
              },
            },
          ],
        },
      ],
    },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      modules: ['./src', './node_modules'],
    },
    output: {
      path: __dirname + '/dist',
      publicPath: '/',
      filename: 'bundle.js',
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: 'src/index.template.ejs',
      }),
      new DefinePlugin({
        COMMIT_HASH,
        SENTRY_DSN,
        __DEV__,
      }),
      new MiniCssExtractPlugin(),
      new FaviconsWebpackPlugin({
        logo: './src/static/logo.png',
        title: 'Nobt.io',
      }),
      new CopyWebpackPlugin([
        { from: './src/static/humans.txt' },
        { from: './src/static/robots.txt' },
        { from: './src/static/404.html' },
      ]),
    ],
    devServer: {
      contentBase: [
        './src/static', // Serves static files during development
      ],
      historyApiFallback: true,
      port: 3000,
      host: '0.0.0.0',
    },
  };
};
