/* eslint-disable @typescript-eslint/no-require-imports */
// webpack.base.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');
const isDev = process.env.NODE_ENV === 'development'; // 是否是开发模式

module.exports = {
	entry: path.join(__dirname, '../src/main.tsx'), // 入口文件
	output: {
		filename: 'static/js/[name].[chunkhash:8].js', // 每个输出js的名称
		path: path.join(__dirname, '../dist'), // 打包结果输出路径
		clean: true, // webpack4需要配置clean-webpack-plugin来删除dist文件,webpack5内置了
		publicPath: '/', // 打包后文件的公共前缀路径
	},
	resolve: {
		extensions: ['.js', '.tsx', '.ts'],
		alias: {
			'@': path.join(__dirname, '../src'),
		},
		modules: [path.resolve(__dirname, '../node_modules')], // 查找第三方模块只在本项目的node_modules中查找
	},
	module: {
		rules: [
			{
				include: [path.resolve(__dirname, '../src')], //只对项目src文件的ts,tsx进行loader解析
				test: /.(ts|tsx)$/,
				use: ['thread-loader', 'babel-loader'],
			},
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						plugins: [require.resolve('react-refresh/babel')],
					},
				},
			},
			{
				test: /.css$/, //匹配所有的 css 文件
				include: [path.resolve(__dirname, '../src')],
				use: [
					isDev ? 'style-loader' : MiniCssExtractPlugin.loader, // 开发环境使用style-looader,打包模式抽离css
					'css-loader',
					'postcss-loader',
				],
			},
			{
				test: /.less$/, //匹配所有的 less 文件
				include: [path.resolve(__dirname, '../src')],
				use: [
					isDev ? 'style-loader' : MiniCssExtractPlugin.loader, // 开发环境使用style-looader,打包模式抽离css
					'css-loader',
					'postcss-loader',
					'less-loader',
				],
			},
			{
				test: /.(png|jpg|jpeg|gif|svg)$/, // 匹配图片文件
				type: 'asset', // type选择asset
				parser: {
					dataUrlCondition: {
						maxSize: 10 * 1024, // 小于10kb转base64位
					},
				},
				generator: {
					filename: 'static/images/[name].[contenthash:8][ext]', // 文件输出目录和命名
				},
			},
			{
				test: /.(woff2?|eot|ttf|otf)$/, // 匹配字体图标文件
				type: 'asset', // type选择asset
				parser: {
					dataUrlCondition: {
						maxSize: 10 * 1024, // 小于10kb转base64位
					},
				},
				generator: {
					filename: 'static/fonts/[name].[contenthash:8][ext]', // 文件输出目录和命名
				},
			},
			{
				test: /.(mp4|webm|ogg|mp3|wav|flac|aac)$/, // 匹配媒体文件
				type: 'asset', // type选择asset
				parser: {
					dataUrlCondition: {
						maxSize: 10 * 1024, // 小于10kb转base64位
					},
				},
				generator: {
					filename: 'static/media/[name].[contenthash:8][ext]', // 文件输出目录和命名
				},
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, '../public/index.html'), // 模板取定义root节点的模板
			inject: true, // 自动注入静态资源
		}),
		new webpack.DefinePlugin({
			'process.env.BASE_ENV': JSON.stringify(process.env.BASE_ENV),
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
		}),
		new Dotenv({
			path: './.env',
		}),
	],
	cache: {
		type: 'filesystem', // 使用文件缓存
	},
};
