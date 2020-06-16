// pages/rank/rank.js
var HotSong = require("../../Api/hotSong.js");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    hotSongList:[],
    sendSong: [],
    loadingShow: false,//loading的显示和隐藏
    moreSong:true,
    getMoreText:"获取更多歌曲"
  },
  clickMore(){
    this.setData({
      moreSong: false,
      getMoreText: "全部加载完成"
    })
  },
  //跳转到播放页面
  goPalyer: function (e) {
    var id = e.currentTarget.dataset.id;//传递id
    var image = e.currentTarget.dataset.image;//传递图片
    wx.setStorageSync("songImg", image);//缓存  因为传递过去会地址会丢失
    var name = e.currentTarget.dataset.name;//名字
    var author = e.currentTarget.dataset.author;//作者
    wx.redirectTo({
      url: `/pages/player/player?id=${id}&name=${name}&author=${author}`
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      loadingShow: true
    })
    var _this = this;
    // 分类接口
    HotSong.hotSongData(function (res) {
      _this.setData({
        hotSongList: res.data.playlist.tracks,
        loadingShow: false
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})