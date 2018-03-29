const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const DefinePlugin = require("webpack").DefinePlugin;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CompressionPlugin = require("compression-webpack-plugin");

module.exports = (_, argv) => {

	const isProduction = argv.mode === 'production';

	const requireEnv = (envName) => {

		const envValue = JSON.stringify(process.env[ envName ]);

		if (!envValue) {
			throw new Error(`${envName} is not defined!`)
		}

		return envValue;
	};

	return {
		entry: [
			'babel-polyfill',
			'./src/app.js'
		],
		devtool: 'source-map',
		module: {
			rules: [
				{
					test: /\.(js|jsx)$/,
					exclude: /node_modules/,
					use: [ 'babel-loader' ]
				},
				{
					test: /\.scss$/,
					use: [
						MiniCssExtractPlugin.loader,
						{
							loader: "css-loader",
							options: {modules: true}
						},
						{
							loader: "sass-loader",
							options: {
								sourceMap: true,
								includePaths: [ path.resolve(__dirname, "src", "styles") ],
								data: `@import '${path.resolve(__dirname, "src", "styles", "theme.scss")}';`,
							}
						}
					]
				}, {
					test: /\.(png|jpg)$/,
					use: [
						{
							loader: "file-loader",
							options: {
								name: "[name]_[hash:4].[ext]"
							}
						}
					]
				}
			]
		},
		resolve: {
			modules: [ path.resolve(__dirname, "src"), "node_modules" ]
		},
		output: {
			path: __dirname + '/dist',
			publicPath:
				'/',
			filename:
				'bundle.js'
		},
		plugins: [
			new HtmlWebpackPlugin({
				template: 'src/index.template.ejs',
				favicon: path.resolve(__dirname, 'src', 'static', 'favicon.ico')
			}),
			new DefinePlugin({
				COMMIT_HASH: isProduction ? requireEnv('COMMIT_HASH') : '',
				SENTRY_DSN: isProduction ? requireEnv('SENTRY_DSN') : '',
				__DEV__: argv.mode === "development"
			}),
			new MiniCssExtractPlugin(),
			new CompressionPlugin({
				asset: "gzipped/[path]",
				algorithm: "gzip",
				test: /\.(js|css|map)$/,
				minRatio: 0.8,
				deleteOriginalAssets: false
			})
		],
		devServer: {
			contentBase: './dist',
			historyApiFallback: true,
			port: 3000
		}
	};
};