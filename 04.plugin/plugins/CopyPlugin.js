const path = require('path')
const fs = require('fs')

const {validate} = require('schema-utils')
const globby = require('globby')
const webpack = require('webpack')

const schema = require('./schema.json')

const {RawSource} = webpack.sources

class CopyPlugin {
  constructor(options = {}) {
    // 验证optiosn是否符合规范
    validate(schema, options, {
      name: 'CopyPlugin'
    })
    this.options = options
  }
  apply(compiler) {
    // 初始化compilation
    compiler.hooks.thisCompilation.tap('CopyPlugin', (compilation) => {
      // 添加资源的hooks
      compilation.hooks.additionalAssets.tapAsync('CopyPlugin', async (cb) => {
        // 将from中的资源复制到to中，输出出去
        const {from, ignore} = this.options
        const to = this.options.to ? this.options.to : '.'

        // context就是webpack配置，运行指令的目录
        const context = compiler.options.context
        // 将输入路径变成绝对路径
        const absoluteFrom = path.isAbsolute(from) ? from : path.resolve(context, from)
        // 1，过滤掉ignore的文件
        // globby(要处理文件夹，options)
        const paths = await globby(absoluteFrom, { ignore })
        console.info(paths, 999) // 所有要加载的文件路径数组

        // 2，读取from中所有资源
        const files = await Promise.all(
          paths.map(async (absolutePath) => {
            // 读取文件
            const data = await fs.readFileSync(absolutePath)
            // 获取文件名称
            const relativePath = path.basename(absolutePath)
            // 文件路径和to结合
            // 有to  --> css/index.css
            // 没有to  --> index.css
            const fileName = path.join(to, relativePath)
            return {
              // 文件数据
              data,
              // 文件名称
              fileName
            }
          })
        )
        // 3，生成webpack格式的资源
        const assets = files.map(file => {
          const source = new RawSource(file.data)
          return {
            source,
            filename: file.fileName
          }
        })
        // 4，添加compilation中，输出出去
        assets.forEach(asset => {
          compilation.emitAsset(asset.filename, asset.source)
        })

        cb()
      })
    })
  }
}

module.exports = CopyPlugin