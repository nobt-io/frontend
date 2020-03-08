const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DefinePlugin = require('webpack').DefinePlugin;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (_, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    entry: ['@babel/polyfill', './src/app.js'],
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
          use: [
            MiniCssExtractPlugin.loader,
            { loader: 'css-loader', options: { importLoaders: 1 } },
            'postcss-loader',
          ],
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
        {
          test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name]_[hash:4].[ext]',
                outputPath: 'fonts/',
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
        IS_PRODUCTION_BUILD: isProduction,
      }),
      new MiniCssExtractPlugin(),
      new FaviconsWebpackPlugin({
        logo: './src/static/logo.png',
        favicons: {
          appName: 'Nobt.io',
          appDescription: 'Split your bills with ease!',
          developerName: null,
        },
      }),
      new CopyWebpackPlugin([
        { from: './src/static/humans.txt' },
        { from: './src/static/robots.txt' },
        { from: './src/static/_redirects' },
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
