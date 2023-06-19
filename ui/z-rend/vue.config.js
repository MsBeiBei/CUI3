const { defineConfig } = require('@vue/cli-service')
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  configureWebpack: config => {
    config.plugins.push(
      new MonacoWebpackPlugin({
        languages:["sql"],
      })
    )
  },
})
