import config from '../config'
import cssnano from 'cssnano'
import ExtractTextPlugin from "extract-text-webpack-plugin"

let paths = config.utils_paths;
let { __DEV__ } = { ...config.globals };

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

let loaders = [
  {
    loader: "css-loader",
    options: {
      // We use cssnano with the postcss loader, so we tell
      // css-loader not to duplicate minimization.
      minimize: false,
      sourceMap: true,
      modules: true,
      importLoaders: 1,
      localIdentName: "[name]__[local]___[hash:base64:5]" // This is the pattern the css classes will have after being processed.
    }
  },
  {
    loader: "postcss-loader",
    options: {
      // https://github.com/postcss/postcss-loader#plugins
      // postcss allows several plugins to be applied, we just use cssnano
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
];

let styleLoaderConfiguration = {
  test: /\.scss$/,
  include: cssModulesRegex
};

// Exclude ExtractTextPlugin in DEV environment so hot-reloading of styles works
// https://github.com/webpack-contrib/extract-text-webpack-plugin/issues/30#issuecomment-179426938
if (__DEV__) {
  styleLoaderConfiguration.loaders = ["style-loader", ...loaders];
} else {
  styleLoaderConfiguration.use = ExtractTextPlugin.extract({
    fallback: "style-loader",
    use: loaders
  })
}

export default styleLoaderConfiguration;
