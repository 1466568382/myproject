var { url } = require("./config.js");
function hotSongData(callback) {
  wx.request({
    url: `${url}top/list?idx=1`,
    header: {
      'content-type': 'application/json' // 默认值
    },
    success(res) {
      callback && callback(res);//存在callback才传递数据 否则不传
    }

  })
}
//导出
module.exports.hotSongData = hotSongData;