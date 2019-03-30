const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = {
    mode: 'production',
    entry: { // webpack 入口配置
        app: './src/lbt.js'
    },
    module: { // loader 配置
        rules: [{
            test: /\.js$/,
            use: [{
                loader: 'babel-loader',
                options: {
                    presets: ['react', 'env']
                }
            }]
        }]
    },
    plugins: [ // 清除打包之后的文件夹多余文件
        new CleanWebpackPlugin(['dist'])
    ],
    output: { // webpack 出口配置
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    }
}