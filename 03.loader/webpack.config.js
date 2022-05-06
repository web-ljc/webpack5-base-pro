const path = require('path')

module.exports = {
  entry: {
    js: './src/index.js',
    css: './src/index.css',
  },
  output: {
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        loader: 'cssLoader',
        options: {
          name: 'my'
        }
      },
      {
        test: /\.js$/,
        // loader: 'loader1',
        // use: [
        //   'loader1',
        //   'loader2',
        //   {
        //     loader: 'loader3',
        //     options: {
        //       name: 'tom',
        //       age: 19
        //     }
        //   }
        // ]
        loader: 'babelLoader',
        options: {
          presets: [
            '@babel/preset-env'
          ]
        }
      }
    ]
  },
  // 配置resolve解析规则
  resolveLoader: {
    // 解析路径
    modules: [
      'node_modules',
      path.relative(__dirname, 'loaders')
    ]
  },
  mode: 'production'
}