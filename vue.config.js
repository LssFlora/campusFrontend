const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // 添加此行代码
  lintOnSave: false,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://campus-help.natapp1.cc',
        // pathRewrite: { '^/api': '' },
      },
    },
  },
})