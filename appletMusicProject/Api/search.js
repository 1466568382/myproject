var { url } = require("./config.js");
function searchSong(keyWord, callback) {
  wx.request({
    url: `${url}search?keywords=${keyWord}`,
    header: {
      'content-type': 'application/json' // 默认值
    },
    success(res) {
      callback(res)
    }
  })
}

module.exports.searchSong = searchSong;