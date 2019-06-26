var path = require('path')
const CompressionWebpackPlugin = require("compression-webpack-plugin");
function resolve(dir) {
    return path.join(__dirname, dir)
}
// 使用 webpack
// var webpack = require('webpack')
module.exports = {
    // publicPath: "./",
    assetsDir: "static",
    // pages: {},
    // /**
    //  * 开发环境服务器配置
    //  */
    devServer: {
        open: true,
        host: '0.0.0.0',
        port: 8080,
        https: false,
        hotOnly: false,
        //配置跨域处理,只有一个代理
        proxy: 'http://power.xmfstore.com/power/',
    },
    // //修改全局路径
    chainWebpack: (config) => {
        config.resolve.alias
            // .set('vue$', 'vue/dist/vue.esm.js')
            .set('@src', resolve('src'))
            .set('@node_modules', resolve('node_modules'))
            /* 添加分析工具*/
            if (process.env.NODE_ENV === 'production') {
                    if (process.env.npm_config_report) {
                        config
                            .plugin('webpack-bundle-analyzer')
                            .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
                            .end();
                        config.plugins.delete('prefetch')
                    }
                } 
    },
    productionSourceMap: false,
    configureWebpack: (config) => {
        if (process.env.NODE_ENV === 'production') {
            // 为生产环境修改配置...
            config.mode = 'production'
            return {
                plugins: [
                    new CompressionWebpackPlugin({
                        test: /\.js$|\.html$|\.css/, //匹配文件名
                        threshold: 10240, //对超过10k的数据进行压缩
                        deleteOriginalAssets: false //是否删除原文件
                    })
                ]
            }
        }
    }
    // configureWebpack: {
    //     resolve: {
    //         extensions: ['.js', '.vue', '.json']
    //     },
    //     plugins: [
    //         new CompressionWebpackPlugin({
    //             filename: '[path].gz[query]',
    //             algorithm: 'gzip',
    //             test: new RegExp('\\.(js|css)$'),
    //             threshold: 10240,
    //             minRatio: 0.8
    //         })
    //     ]
    // }
}
