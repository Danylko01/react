/*
 * @Description:
 * @Author: Danylko
 * @Date: 2024-08-26 18:45:34
 * @LastEditTime: 2024-08-26 19:19:38
 */
const isDev = process.env.NODE_ENV === 'development';

module.exports = {
	// 执行顺序由右往左，所以先处理ts，再处理jsx,最后再试一下babel转换为低版本语法
	presets: [
		[
			'@babel/preset-env',
			{
				// 设置兼容目标浏览器版本,这里可以不写，babel-loader会自动寻找上面配置好的文件.browserslistrc
				// "targets": {
				//  "chrome": 35,
				//  "ie": 9
				// },
				useBuiltIns: 'usage', // 根据配置的浏览器兼容，以及代码中使用到的api进行引入polyfill按需添加
				corejs: 3, // 配置使用core-js低版本
			},
		],
		'@babel/preset-react',
		'@babel/preset-typescript',
	],
	plugins: [
		isDev && require.resolve('react-refresh/babel'), // 配置react开发环境热替换
		['@babel/plugin-proposal-decorators', { legacy: true }],
	].filter(Boolean),
};
