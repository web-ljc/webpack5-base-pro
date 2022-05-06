// loader本质是一个函数

// loader从右向左执行
// 同步loader
module.exports = function(content, map, meta) {
  console.info('111111', map, meta )
  return content
}

// loader提前处理，写pitch方法，会从左到右先执行
module.exports.pitch = function() {
  console.info('pitch1')  
}
