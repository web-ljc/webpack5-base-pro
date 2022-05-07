const {SyncHook, SyncBailHook, AsyncParallelHook, AsyncSeriesHook} = require('tapable')

class Lesson {
  constructor() {
    // 初始化hooks容器
    this.hooks = {
      // 同步hooks，任务依次执行
      // go: new SyncHook(['address'])
      // SyncBailHook：一旦有返回值就会退出
      go: new SyncBailHook(['address']),

      // 异步hooks
      // AsyncParallelHook 异步并行，一起执行
      // leave: new AsyncParallelHook(['name', 'age']),
      // AsyncParallelHook 异步串行，按顺序执行
      leave: new AsyncSeriesHook(['name', 'age'])
    }
  }
  tap() {
    // 往hooks容器中注册事件/添加回调函数
    this.hooks.go.tap('class0318', (address) => {
      console.info('class0318', address)
      return 2222
    })
    this.hooks.go.tap('class0410', (address) => {
      console.info('class0410', address)
    })

    this.hooks.leave.tapAsync('class0511', (name, age, cb) => {
      setTimeout(() => {
        console.info('class0511', name, age)
        cb()
      }, 2000)
    })
    this.hooks.leave.tapPromise('class0610', (name, age) => {
      return new Promise(resolve => {
        setTimeout(() => {
          console.info('class0610', name, age)
          resolve()
        }, 1000)
      })
    })
  }
  start() {
    // 触发hooks
    this.hooks.go.call('c318')
    this.hooks.leave.callAsync('jack', 18, function() {
      // 代表所有leave容器中的函数触发完了，才触发
      console.info('所有结束了')
    })
  }
}

const l = new Lesson()
l.tap()
l.start()
