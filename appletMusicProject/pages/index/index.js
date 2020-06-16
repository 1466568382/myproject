//index.js

var NewSong = require("../../Api/newSong.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //轮播图
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 300,
    circular: true,
    loadingShow:false,//loading的显示和隐藏
    imgs: [
      "../../images/banner001.jpg",
      "../../images/banner002.jpg",
      "../../images/banner003.jpg",
      "../../images/banner004.jpg",
    ],
  
    newSongList:[],
    //发送过去的歌曲信息
    sendSong:[]

  },
  //跳转到播放页面
  goPalyer:function(e) {
    var id = e.currentTarget.dataset.id;//传递id
    var image = e.currentTarget.dataset.image;//传递图片
    wx.setStorageSync("songImg", image);//缓存  因为传递过去会地址会丢失
    var name = e.currentTarget.dataset.name;//名字
    var author = e.currentTarget.dataset.author;//作者
    wx.redirectTo({
      url: `/pages/player/player?id=${id}&name=${name}&author=${author}`
    })

  },
  bannerGoPalyer: function (e) {
    let index = e.target.dataset.index;
    let bannerData= [
      {
        author: "陈粒",
        name: "影响",
        nowId: "1318430037",
        poster: "https://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg"
      },
      {
        author: "乔欣",
        name: "想做你的疯女孩",
        nowId: "480768433",
        poster: "https://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg"
      },
      {
        author: "郁可唯",
        name: "时间煮雨",
        nowId: "26418130",
        poster: "https://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg"
      },
      {
        author: "凌希",
        name: "失宠",
        nowId: "535629871",
        poster: "https://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg"
      }
    ]
    var id = bannerData[index].nowId;//传递id
    var image = bannerData[index].poster;//传递图片
    wx.setStorageSync("songImg", image);//缓存  因为传递过去会地址会丢失
    var name = bannerData[index].name;//名字
    var author = bannerData[index].author;//作者
    wx.redirectTo({
      url: `/pages/player/player?id=${id}&name=${name}&author=${author}`
    })
  },
  // 跳到搜索页面
  goSearch:function(){
    wx.redirectTo({
      url: "/pages/search/search"
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    this.setData({
      loadingShow:true
    })
    // 分类接口
    NewSong.newSongData(function (res) {
      _this.setData({
        newSongList:res.data.result,
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
