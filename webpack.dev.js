const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
	mode: 'development',
	devtool: 'inline-source-map',
	devServer: {
		static: './dist',
		compress: true,
		port: 8000,
		hot: true,
		open: true, // abre navegador automáticamente
	},
	output: {
		filename: 'bundle.js',
	},
});
