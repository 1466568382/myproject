// pages/play/play.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    postId: null,
    postView: null,
    show: false,
  },
  //遮罩层的显示和隐藏
  showOverlay() {
    this.setData({
      show: true
    })
  },
  hideOverlay() {
    this.setData({
      show: false
    })
  },
  // 获取更多视频的id
  navigateToPlay: function (e) {
    wx.navigateTo({
      url: '/pages/play/play?postid=' + e.currentTarget.dataset.post,
    })
  },
  getPostView:function(id){
    this.showOverlay();//获取数据的时候显示遮罩层
    wx.request({
      url: 'https://api.kele8.cn/agent/https://app.vmovier.com/apiv3/post/view?postid='+id,
      success: (response)=> {
        // console.log(response.data.data);
        
        this.setData({
          postView: response.data.data
        }) 
      },
      complete: (response)=>{
        this.hideOverlay();//获取完毕隐藏
      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //获取传过来的id
    this.setData({
      postId: options.postid
    })
    this.getPostView(this.data.postId);
    // console.log(this.data.postId);
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