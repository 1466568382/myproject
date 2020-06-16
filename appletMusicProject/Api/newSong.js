var { url } = require("./config.js");
function newSongData(callback) {
  wx.request({
    url: `${url}personalized/newsong`,
    header: {
      'content-type': 'application/json' // 默认值
    },
    success(res) {
      callback && callback(res);//存在callback才传递数据 否则不传
    }

  })
}
//导出
module.exports.newSongData = newSongData;