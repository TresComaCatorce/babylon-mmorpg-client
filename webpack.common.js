const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
	entry: './src/index.ts',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist'),
		clean: true,
	},
	resolve: {
		extensions: ['.ts', '.js'],
		alias: {
			'@mmorpg/assets': path.resolve(__dirname, 'src/assets'),
			'@mmorpg/controllers': path.resolve(__dirname, 'src/controllers'),
			'@mmorpg/interfaces': path.resolve(__dirname, 'src/interfaces'),
			'@mmorpg/scenes': path.resolve(__dirname, 'src/scenes'),
			'@mmorpg/utils': path.resolve(__dirname, 'src/utils'),
			'@mmorpg/entities': path.resolve(__dirname, 'src/entities'),
			'@mmorpg/camera': path.resolve(__dirname, 'src/camera'),
		},
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.css$/i,
				use: ['style-loader', 'css-loader'],
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html',
		}),
		new CopyPlugin({
			patterns: [{ from: 'src/assets', to: 'assets' }],
		}),
	],
};
