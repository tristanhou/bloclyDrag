const VueLoaderPlugin = require('vue-loader/lib/plugin')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin');
console.log(__dirname, '根路径')

function resolve(dir) {
	return path.join(__dirname, dir);
	}

module.exports = {
	entry: {
		main: './src/main.js'
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, './dist')
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				include: [
					path.resolve(__dirname, 'src'),
					path.resolve(__dirname, 'node_modules/vant/lib/'),
					
					],
				use: ['vue-loader']
			},
			{
				test: /\.(jpg|png|gif)/,
				use: [
					{
						loader: 'file-loader',
						options: {
						name: '[name].[ext]',
						
						outputPath:  './static/image',
						}
					}
					]
			},
			{
				test: /\.js$/,
				use: ['babel-loader']
			},
			{
				test: /\.css/,
				include: [
					path.resolve(__dirname, 'src'),
					path.resolve(__dirname, 'node_modules/vant/lib/'),
					
				],
				use: [
					'style-loader',
					'css-loader',
				],
			}
		]
	},
	resolve: {
		extensions: ['.js', '.vue', '.json'],
		alias: {
			'_c': resolve('src/components'),
			'@': resolve('src')
		}
	}, 
	devServer: {
		contentBase: path.join(__dirname, './dist'), //网站的根目录为 根目录/dist，如果配置不对，会报Cannot GET /错误
		port: 8089, // 端口改为 8080
		open: true, // 自动打开浏览器，适合懒人
		proxy: {
			'/proxy/*': {
				// target: 'http://39.106.185.13:3000',
				target: 'http://10.0.16.241:3000',
				changeOrigin: true,
				pathRewrite: {
					'^/proxy': ''
				}
			  }
		}
	},
	plugins: [
		// webpack4.0 要用到这个鬼插件
		new VueLoaderPlugin(),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: './index.html',
			inject: 'body'
		}),
		new CopyPlugin([
			{ from: __dirname + '/public', to: './public' },
		])
	]
}