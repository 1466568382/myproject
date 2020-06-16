var { url } = require("./config.js");
function getPalySong(id, callback) {
  wx.request({
    url: `${url}song/url?id=${id}`,
    header: {
      'content-type': 'application/json' // 默认值
    },
    success(res) {
      callback(res)
    }
  })
}

module.exports.getPalySong = getPalySong;