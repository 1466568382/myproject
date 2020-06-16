// pages/search/search.js
var Search = require("../../Api/search.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyword: "",
    songs: [],
    isShow: true,
    hotSearch: ["歌手","起风了","深情水河","岚","山河无恙在我胸","朋友请听好","流星","王嘉尔100ways","我的乐队","李荣浩新歌"],
    loadingShow: false,//loading的显示和隐藏
  },
  //跳转到播放页面
  goPalyer: function(e) {
    var id = e.currentTarget.dataset.id; //传递id
    var image = e.currentTarget.dataset.image; //传递图片
    wx.setStorageSync("songImg", image); //缓存  因为传递过去会地址会丢失
    var name = e.currentTarget.dataset.name; //名字
    var author = e.currentTarget.dataset.author; //作者
    wx.redirectTo({
      url: `/pages/player/player?id=${id}&name=${name}&author=${author}`
    })

  },
  clickHotSearch(e){
    console.log(e.target.dataset.item);
    let keyword = e.target.dataset.item
    this.search(keyword)
  },
  //根据关键词搜索
  getKeyword: function(e) {
    var keyword = e.detail.value;
    this.search(keyword);
  },
  search(keyword){
    this.setData({
      loadingShow:true
    })
    var _this = this;
    if (keyword) { //判断是否有值
      Search.searchSong(keyword, function (res) {
        var data = res.data.result.songs;
        // console.log(data[0].artists[0].img1v1Url);
        _this.data.isShow = false;
        _this.setData({
          songs: data,
          isShow: _this.data.isShow,
          loadingShow: false
        })
      })
    } else {
      this.data.isShow = true;
      this.setData({
        isShow: this.data.isShow
      })
      return;
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})