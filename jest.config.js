module.exports = {
	"modulePaths": [
		"src"
	],
	"moduleDirectories": [
		"node_modules"
	],
	"transformIgnorePatterns": [
		"node_modules/(?!(react-redux|lodash-es)/)",
	],
	"moduleNameMapper": {
		"^.+\\.scss$": "identity-obj-proxy",
		"^.+\\.css": "identity-obj-proxy",
		"\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "identity-obj-proxy"
	},
	"verbose": true
}