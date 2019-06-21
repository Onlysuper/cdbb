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
        // 因为是多页面，所以取消 chunks，每个页面只对应一个单独的 JS / CSS
        config.optimization
            .splitChunks({
                cacheGroups: {}
            });
    },
    productionSourceMap: false,
    // // css: {
    // //     // 是否使用css分离插件 ExtractTextPlugin
    // //     extract: true,
    // //     // 开启 CSS source maps?
    // //     // sourceMap: false,
    // //     // css预设器配置项
    // //     // loaderOptions: {},
    // //     // 启用 CSS modules for all css / pre-processor files.
    // //     // modules: false
    // // },
    configureWebpack: {
        resolve: {
            extensions: ['.js', '.vue', '.json']
        },
    // //     output: {
    // //         // filename: assetsPath('js/[name].file.[hash:6].js'),
    // //         // chunkFilename: assetsPath('js/[name].chunk.[hash:6].js')
    // //     },
        plugins: [
            new CompressionWebpackPlugin({
                filename: '[path].gz[query]',
                algorithm: 'gzip',
                test: new RegExp('\\.(js|css)$'),
                threshold: 10240,
                minRatio: 0.8
            })
        ]
    }
}
