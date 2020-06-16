var { url } = require("./config.js");
function getLyric(id, callback) {
  wx.request({
    url: `${url}lyric?id=${id}`,
    header: {
      'content-type': 'application/json' // 默认值
    },
    success(res) {
      callback(res)
    }
  })
}

module.exports.getLyric = getLyric;