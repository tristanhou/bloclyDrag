const VueLoaderPlugin = require('vue-loader/lib/plugin')
const path = require('path')
// const HtmlWebpackPlugin = require('html-webpack-plugin')

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
                use: ['vue-loader']
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
    // devServer: {
    //     contentBase: path.join(__dirname, './dist'), //网站的根目录为 根目录/dist，如果配置不对，会报Cannot GET /错误
    //     port: 9000, //端口改为9000
    //     open:true // 自动打开浏览器，适合懒人
    // },
    plugins: [
        // webpack4.0 要用到这个鬼插件
        new VueLoaderPlugin(),
        // new HtmlWebpackPlugin()
    ]
}