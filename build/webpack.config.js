import config from '../config'
import webpack from 'webpack'
import _debug from 'debug'

import stylesLoaderConfiguration from "./stylesLoaderConfiguration"

import HtmlWebpackPlugin from 'html-webpack-plugin'
import ExtractTextPlugin from "extract-text-webpack-plugin"
import CompressionWebpackPlugin from "compression-webpack-plugin"
import BundleAnalyzerPlugin from 'webpack-bundle-analyzer/lib/BundleAnalyzerPlugin'

const debug = _debug('app:webpack:config');
const {__DEV__, __PROD__, __TEST__} = config.globals;
const paths = config.utils_paths;

let webpackConfig = {
  entry: [
    'webpack-hot-middleware/client?http://localhost:3000',
    paths.client("main.js")
  ],
  resolve: {
    modules: [
      paths.client("."),
      "node_modules"
    ],
    extensions: [ '.js', '.jsx', '.json' ]
  },
  devtool: config.compiler_devtool,
  target: "web",
  output: {
    filename: `[name].[${config.compiler_hash_type}].js`,
    chunkFilename: "[name].bundle.js",
    path: paths.dist(),
    publicPath: config.compiler_public_path
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: /src/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              plugins: [ 'transform-runtime' ],
              presets: [ 'es2015', 'react', 'stage-0' ]
            }
          }
        ],
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        // EJS-Template engine
        test: /\.ejs$/,
        loader: "ejs-loader"
      },
      stylesLoaderConfiguration,
      {
        test: /\.woff(\?.*)?$/,
        loader: 'url-loader',
        options: {
          prefix: "fonts/",
          name: "[path][name].[ext]",
          limit: 10000,
          mimetype: "application/font-woff"
        }
      },
      {
        test: /\.woff2(\?.*)?$/,
        loader: 'url-loader',
        options: {
          prefix: "fonts/",
          name: "[path][name].[ext]",
          limit: 10000,
          mimetype: "application/font-woff2"
        }
      },
      {
        test: /\.otf(\?.*)?$/,
        loader: 'file-loader',
        options: {
          prefix: "fonts/",
          name: "[path][name].[ext]",
          limit: 10000,
          mimetype: "font/opentype"
        }
      },
      {
        test: /\.ttf(\?.*)?$/,
        loader: 'url-loader',
        options: {
          prefix: "fonts/",
          name: "[path][name].[ext]",
          limit: 10000,
          mimetype: "application/octet-stream"
        }
      },
      {
        test: /\.eot(\?.*)?$/,
        loader: 'file-loader',
        options: {
          prefix: "fonts/",
          name: "[path][name].[ext]"
        }
      },
      {
        test: /\.svg(\?.*)?$/,
        loader: 'url-loader',
        options: {
          prefix: "fonts/",
          name: "[path][name].[ext]",
          limit: 10000,
          mimetype: "image/svg+xml"
        }
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader',
        options: {
          name: `[name].[hash].[ext]`,
          limit: 8192
        }
      }
    ],

  },
  plugins: [
    new webpack.DefinePlugin(config.globals),
    new HtmlWebpackPlugin({
      template: 'src/index.template.ejs',
      hash: false,
      favicon: paths.client('static/favicon.ico'),
      filename: 'index.html',
      inject: 'body',
      minify: {
        collapseWhitespace: true
      }
    })
  ],
}

if (__DEV__) {
  debug('Enable plugins for live development (HMR, NoErrors).');
  webpackConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new BundleAnalyzerPlugin({
      analyzerMode: "disabled", // Switch to server to enable analysis
      defaultSizes: "gzip"
    })
  )
} else if (__PROD__) {
  debug('Enable plugins for production.');
  webpackConfig.plugins.push(
    new webpack.optimize.ModuleConcatenationPlugin(),
    new ExtractTextPlugin(`styles.[contenthash].css`),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        unused: true,
        dead_code: true,
        warnings: false
      },
      // If we don't enable sourceMaps in the UglifyJS plugin, we don't get any even though babel is configured to create them.
      sourceMap: config.compiler_devtool !== false
    }),
    // See readme.md for documentation about gzip compression
    new CompressionWebpackPlugin({
      asset: "gzipped/[path]",
      algorithm: "gzip",
      test: /\.(js|css|html|map)$/,
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

export default webpackConfig
