import config from '../config'
import cssnano from 'cssnano'
import ExtractTextPlugin from "extract-text-webpack-plugin"

let paths = config.utils_paths;

// Add any packge names here whose styles need to be treated as CSS modules.
// These paths will be combined into a single regex.
let PATHS_TO_TREAT_AS_CSS_MODULES = [
  'react-toolbox'
];

PATHS_TO_TREAT_AS_CSS_MODULES.push(
  paths.client().replace(/[\^\$\.\*\+\-\?\=\!\:\|\\\/\(\)\[\]\{\}\,]/g, '\\$&') // eslint-disable-line
);

let cssModulesRegex = new RegExp(`(${PATHS_TO_TREAT_AS_CSS_MODULES.join('|')})`)
let themeFile = paths.client("styles/theme.scss").replace(/\\/g, "\\\\");

export default {
  test: /\.scss$/,
  include: cssModulesRegex,
  use: ExtractTextPlugin.extract({
    fallback: "style-loader",
    use: [
      {
        loader: "css-loader",
        options: {
          // We use cssnano with the postcss loader, so we tell
          // css-loader not to duplicate minimization.
          minimize: false,
          sourceMap: true,
          modules: true,
          importLoaders: 1,
          localIdentName: "[name]__[local]___[hash:base64:5]"
        }
      },
      {
        loader: "postcss-loader",
        options: {
          // https://github.com/postcss/postcss-loader#plugins
          plugins: [
            cssnano({
              autoprefixer: {
                add: true,
                remove: true,
                browsers: [ 'last 2 versions' ]
              },
              discardComments: {
                removeAll: true
              },
              discardUnused: false,
              mergeIdents: false,
              reduceIdents: false,
              safe: true,
              sourcemap: true
            })
          ]
        }

      },
      {
        loader: "sass-loader",
        options: {
          sourceMap: true,
          includePaths: paths.client('styles'),
          data: `@import '${themeFile}';`,
        }
      }
    ]
  })
}
