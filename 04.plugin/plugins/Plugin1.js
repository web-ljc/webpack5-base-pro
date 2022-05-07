// plugin都是类
class Plugin1 {
  apply(compiler) {
    // 使用compiler的hooks.emit注册事件
    compiler.hooks.emit.tap('Plugin1', (compilation) => {
      console.log('emit.tap 111')
    })
    
    // 串行
    compiler.hooks.emit.tapAsync('Plugin1', (compilation, cb) => {
      setTimeout(() => {
        console.log('emit.tapAsync 2222')
        cb()
      }, 2000)
    })
    
    compiler.hooks.emit.tapPromise('Plugin1', (compilation) => {
      return new Promise(resolve => {
        setTimeout(() => {
          console.log('emit.tapPromise 2222')
          resolve()
        }, 2000)
      })
    })

    compiler.hooks.afterEmit.tap('Plugin2', (compilation) => {
      console.info('afterEmit.tap 111')
    })

    compiler.hooks.done.tap('Plugin2', (stats) => {
      console.info('done.tap 111')
    })
  }
}

module.exports = Plugin1