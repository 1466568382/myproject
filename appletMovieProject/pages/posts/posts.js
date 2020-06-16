// pages/posts/posts.js
//导入没有更多内容弹框
import Notify from '@vant/weapp/notify/notify';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cateid: 1,
    //页数
    page:1,
    posts:[],
    showLoading: false,
    // 没有更多
    hasMore: true
  },
  getPostsByCateId(id) {
    // 显示加载图标
    this.setData({
      showLoading: true
    })
    wx.request({
      url: `https://api.kele8.cn/agent/https://app.vmovier.com/apiv3/post/getPostInCate?p=${this.data.page}&size=10&cateid=${id}`,
      success: (response) => {
        console.log(response.data.data);
        this.setData({
          // posts: response.data.data
          //解构的目的就是把他们合并起来
          posts:[...this.data.posts,...response.data.data]
        })
        //如果没有内容了就触发
        if (response.data.msg !== 'OK') {
          // 没有更多内容了
          Notify('没有更多内容了');
          this.setData({
            hasMore: false
          })
        }
      },
      complete: () => {
        this.setData({
          showLoading: false
        })
      }
          
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取分类传过来的数据
    console.log(options)
    this.setData({
      cateid: options.id
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getPostsByCateId(this.data.cateid)
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
    if (this.data.hasMore) {
    //触底页数+1
      this.setData({
        page:this.data.page+1
      })
    this.getPostsByCateId(this.data.cateid);
    }else{
      Notify('没有更多内容了');
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})