const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

// vue.config.js
module.exports = {
  publicPath: process.env.PUBLIC_PATH,

  chainWebpack: (config) => {
    config.resolve.alias
      .set('@$', resolve('src'))
      .set('@api', resolve('src/api'))
      .set('@assets', resolve('src/assets'))
      .set('@comp', resolve('src/components'))
      .set('@views', resolve('src/views'))
      .set('@layout', resolve('src/layout'))
      .set('@static', resolve('src/static'))

    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule
      .oneOf('inline')
      .resourceQuery(/inline/)
      .use('vue-svg-icon-loader')
      .loader('vue-svg-icon-loader')
      .end()
      .end()
      .oneOf('external')
      .use('file-loader')
      .loader('file-loader')
      .options({
        name: 'assets/[name].[hash:8].[ext]'
      })
  },

  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },

  lintOnSave: undefined,
  // babel-loader no-ignore node_modules/*
  transpileDependencies: [],
  productionSourceMap: false,
  // devServer: {
  //   proxy: {
  //     '/': { // 这里最好有一个 /
  //       target: 'http://127.0.0.1:8090', // 后台接口域名
  //       ws: true, // 如果要代理 websockets，配置这个参数
  //       secure: false, // 如果是https接口，需要配置这个参数
  //       changeOrigin: true, // 是否跨域
  //       pathRewrite: {
  //         '^/': ''
  //       }
  //     }
  //   }
  // }
}
