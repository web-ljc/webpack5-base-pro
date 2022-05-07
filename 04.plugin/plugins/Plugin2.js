const fs = require('fs')
const path = require('path')

const webpack = require('webpack')
const { RawSource } = webpack.sources

// plugin都是类
class Plugin2 {
  apply(compiler) {
    // 初始化compilation钩子
    compiler.hooks.thisCompilation.tap('Plugin2', (compilation) => {
      // debugger
      // console.log(compilation)
      // 添加资源
      compilation.hooks.additionalAssets.tapAsync('Plugin2', (cb) => {
        // debugger
        // console.log(compilation)
        const content = '9999 888'
        // 往要输出的资源中，添加一个a.txt
        compilation.assets['a.txt'] = {
          // 文件大小
          size() {
            return content.length
          },
          // 文件内容
          source() {
            return content
          }
        }

        // 读取文件，使用webpack5的source对象的方法，打包输出
        const data = fs.readFileSync(path.resolve(__dirname, './b.txt'))
        // compilation.assets['b.txt'] = new RawSource(data)
        compilation.emitAsset('c.txt', new RawSource(data))

        cb()
      })
    })
  }
}

module.exports = Plugin2