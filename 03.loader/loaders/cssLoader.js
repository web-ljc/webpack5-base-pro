// loader本质是一个函数

// 同步loader
module.exports = function(content, map, meta) {
  console.info(content, this.query, 'css')
  let con = JSON.stringify(content)
  con = con.replace(/el-/g, this.query.name+'-')
  console.info(con)
  // 第一个参数是否错误，非错误传null
    return `const styleTag = document.createElement('style');
        styleTag.innerHTML = ${con};
        document.head.appendChild(styleTag);
    `
}
