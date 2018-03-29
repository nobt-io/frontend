const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const DefinePlugin = require("webpack").DefinePlugin;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


module.exports = (env, argv) => ({
	entry: [
		'babel-polyfill',
		'./src/app.js'
	],
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
				use: [ "file-loader" ]
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
			COMMIT_HASH: getAssertedEnvValue(argv.mode, "COMMIT_HASH"),
			SENTRY_DSN: getAssertedEnvValue(argv.mode, "SENTRY_DSN"),
			__DEV__: argv.mode === "development"
		}),
		new MiniCssExtractPlugin()
	],
	devServer: {
		contentBase: './dist',
		historyApiFallback: true,
		port: 3000
	}
});

function getAssertedEnvValue(mode, envName) {

	const envValue = JSON.stringify(process.env[ envName ]);

	if (mode === "production" && !envValue) {
		throw new Error(`${envName} is not defined!`)
	}

	return envValue;
}
