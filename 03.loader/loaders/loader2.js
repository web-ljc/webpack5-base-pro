// loader本质是一个函数
// 异步loader
module.exports = function(content, map, meta) {
  console.info('22222222')

  const callback = this.async()

  // 过1秒再继续向下执行loader1
  setTimeout(() => {
    callback(null, content)
  }, 1000)
}
module.exports.pitch = function() {
  console.info('pitch2')  
  
}