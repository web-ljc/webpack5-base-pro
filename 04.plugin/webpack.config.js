// const Plugin1 = require('./plugins/Plugin1')
// const Plugin2 = require('./plugins/Plugin2')
const CopyPlugin = require('./plugins/CopyPlugin')

module.exports = {
  plugins: [
    // new Plugin1()
    // new Plugin2()
    new CopyPlugin({
      from: 'public',
      to: 'css',
      ignore: ['**/index.html']
    })
  ]
}