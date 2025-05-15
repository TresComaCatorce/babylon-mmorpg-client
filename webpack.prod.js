const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
	mode: 'production',
	devtool: false, // o 'source-map' si querés source maps producción
	output: {
		filename: 'bundle.[contenthash].js',
	},
	optimization: {
		splitChunks: {
			chunks: 'all',
		},
	},
});
