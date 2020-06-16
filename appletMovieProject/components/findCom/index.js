// components/findCom/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    findItem: Object,
    special:String
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    //把id传到play
    navigateToPlay: function (e) {
      wx.navigateTo({
        url: '/pages/play/play?postid=' + e.currentTarget.dataset.post,
      })
    },
  }
})
