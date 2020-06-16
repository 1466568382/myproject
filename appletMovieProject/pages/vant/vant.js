// pages/vant/vant.js
//导入没有更多内容弹框
import Notify from '@vant/weapp/notify/notify';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 1,
    cateList: [], //分类数据
    findList: [], //发现数据
    show: false, //遮罩层
    downData: [], //发现下拉数据
    searchData: [], //搜索数据
    showLoading: false, //加载
    showLoadingSearch: false, //加载
    hasMore: true, // 没有更多
    showmore: false, //点击获取更多是否隐藏
    showSearch: false, //显示搜索出来的数据,
    keyWord: "", //输入的内容,
    historyList:[],
    hotSearchList: ["NEWERA", "科比", "旅行", "爱情", "科普", "青春", "电影", "燃", "温情", "情怀", "五星推荐", "励志", "正能量"], //热门搜索
  },
  //把id传到play
  navigateToPlay: function(e) {
    wx.navigateTo({
      url: '/pages/play/play?postid=' + e.currentTarget.dataset.post,
    })
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
  //路由跳转 并且把id传过去
  routeToPostsList(e) {
    // console.log(e);
    // 有些分类没有id的
    // console.log('id', e.currentTarget.dataset.cateid)
    wx.navigateTo({
      url: '/pages/posts/posts?id=' + e.currentTarget.dataset.cateid,
    })
  },

  // 发现state
  //获取发现数据
  getFindlist() {
    wx: wx.request({
      url: 'https://api.kele8.cn/agent/https://app.vmovier.com/apiv3/index/index',
      success: (response) => {
        // console.log(response.data.data)
        this.setData({
          findList: response.data.data
        })
      },
      complete: (response) => {},
    })

  },
  //发现获取下拉数据
  getDowmData() {
    let url;
    // 显示加载图标
    this.setData({
      showLoading: true
    })
    if (this.data.downData.length === 0) {
      url = "https://api.kele8.cn/agent/https://app.vmovier.com" + this.data.findList.posts.next_page_url;
    } else {
      url = "https://api.kele8.cn/agent/https://app.vmovier.com" + this.data.downData[this.data.downData.length - 1].next_page_url
    }
    wx: wx.request({
      url: url,
      success: (response) => {
        // console.log(response.data.data)
        this.data.downData.push(response.data.data);
        // console.log(this.data.downData)
        this.setData({
          downData: this.data.downData
        })
      },
      complete: (response) => {
        this.setData({
          showLoading: true
        })
      },
    })

  },
  // 发现end


  //分类state
  //获取分类数据
  getCateList() {
    //获取本地数据
    var cachedCateList = wx.getStorageSync('cateList')
    // 判断是否有本地数据
    if (cachedCateList) {
      cachedCateList = JSON.parse(cachedCateList)
    }
    //如果没有过期就执行
    if (cachedCateList.expires > Date.now()) {
      this.setData({
        cateList: cachedCateList.data
      })
    } else { //过期就执行
      this.showOverlay(); //获取数据的时候显示遮罩层
      wx: wx.request({
        url: 'https://api.kele8.cn/agent/https://app.vmovier.com/apiv3/cate/getList',
        success: (response) => {
          // console.log(response.data.data)
          if (response.data.data) {
            wx.setStorage({
              data: JSON.stringify({
                expires: Date.now() + 3 * 60 * 60 * 1000,
                data: response.data.data
              }),
              key: 'cateList',
            })
          }
          this.setData({
            cateList: response.data.data
          })
        },
        //请求失败触发
        fail: (response) => {},
        // 请求完成触发
        complete: (response) => {
          this.hideOverlay(); //隐藏遮罩层
        },
      })
    }

  },

  // 分类end

  //搜索state
  //点击搜索
  getKeyWord: function(e) {
    this.executeSearch(e.detail); 
  },
  executeSearch: function(keyword) {
    // 判读数组有没有这个值 有就返回true
    let flag=this.data.historyList.includes(keyword);
    if(!flag){
      this.data.historyList.push(keyword);
    }
    this.setData({
      historyList: this.data.historyList
    })
    this.setData({
      showSearch: true
    })
    this.showOverlay(); //获取数据的时候显示遮罩层
    this.data.searchData = []; //每次搜索先清空
    wx.request({
      url: 'https://api.kele8.cn/agent/https://app.vmovier.com/apiv3/search?kw=' + keyword,
      success: (response) => {
        // console.log(response.data.data.result);
        this.data.searchData.push(response.data.data.result);
        this.setData({
          searchData: this.data.searchData
        })
      },
      complete: (response) => {
        this.hideOverlay(); //隐藏遮罩层
        this.setData({
          showmore: true
        })
      },
    })
  },
  //点击获取搜索更多数据
  getSearch: function() {
    if (this.data.searchData.length === 0) {
      return;
    }
    this.setData({
      showmore: false,
      showLoadingSearch: true
    })
    wx.request({
      url: 'https://api.kele8.cn/agent/https://app.vmovier.com' + this.data.searchData[this.data.searchData.length - 1].next_page_url,
      success: (response) => {
        // console.log(response.data.data.result)
        this.data.searchData.push(response.data.data.result)
        this.setData({
          searchData: this.data.searchData
        })
      },
      complete: (response) => {
        this.setData({
          showmore: true,
          showLoadingSearch: false
        })
      },
    })

  },
  //搜索的内容发生变化时触发
  searchChange: function(e) {
    if (e.detail == "") {
      this.setData({
        showSearch: false
      })
    }
  },
  //点击热门搜索
  hotClickSearch: function(e) {
    this.data.keyWord = e.currentTarget.dataset.item;
    this.setData({
      keyWord: this.data.keyWord
    })
    this.executeSearch(e.currentTarget.dataset.item); 

  },
  //清除搜索记录
  clear:function(){
    this.data.historyList=[];
    this.setData({
      historyList:this.data.historyList
    })
  },
  //搜索end


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getCateList();
    this.getFindlist();
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
    this.getDowmData(); //发现触底
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})