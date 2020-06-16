// pages/player/player.js
var PlaySong = require("../../Api/playSong.js");
var Lyric = require("../../Api/lyric.js");
var time = require("../../utils/time.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    poster: '',
    name: '此时此刻',
    author: '许巍',
    src: '',
    play:true,
    nowId:"",
    like:false,
    lyricList:[],
    activeIndex:0,//歌词高亮
    distance:0,
    loadingShow:false
  },
  //歌曲时间
  change(e){
    var obj=time.formatMs20bj(e.detail.currentTime);
    var str=obj.m+':'+obj.s;//只获取里面的分和秒
    for(var i=this.data.activeIndex;i< this.data.lyricList.length;i++){
      if(this.data.lyricList[i].time===str){
        if (this.data.activeIndex !== i) {//值相等就不用更新  性能处理
          this.setData({
            activeIndex: i
          })
          this.data.distance-=25;
          this.setData({//控制每次向上的距离
            distance: this.data.distance
          })
          break;
        }
      }
   
    }
  },
  // 喜欢
  // myLike:function(){
  //   this.data.like=!this.data.like;
  //   if(this.data.like){
  //     // console.log(this.data.nowId);
  //     var id = this.data.nowId;
  //   }
     
  //    this.setData({
  //      like:this.data.like
  //    })
  // },

  //播放器
  audioPlay: function () {
    console.log(11);
    if(this.data.play){
      this.audioCtx.play();
      this.data.play=false;
    }else{
      this.audioCtx.pause();
      this.data.play = true;
    }
    this.setData({
      play:this.data.play
    })
  },
  audioPause: function () {
    this.audioCtx.pause()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      loadingShow:true
    })
    // var obj = wx.getStorageSync("songImg");
    // console.log(obj);
    var _this=this;
   
    let id = options.id;
    this.data.nowId=id;//获取id
    this.data.poster = wx.getStorageSync("songImg");
    this.data.name=options.name;
    this.data.author=options.author;
    console.log(this.data);
    //获取对应id的url
    PlaySong.getPalySong(id,function (res) {
        // console.log(res.data.data[0].url);
       _this.setData({
         poster: _this.data.poster,
        name:  _this.data.name,
        author:  _this.data.author,
         src: res.data.data[0].url,
         loadingShow:false
      })
    }),
    //获取歌词
      Lyric.getLyric(id, function (res) {
        var lyrics=res.data.lrc.lyric;
        var arr=[];//定义一个数组
        lyrics.split('[').forEach(r=>{
          let str = r.substr(5, 4);
          r.replace(`${str}`, '');
          var r2=r.replace(`${str}`, '');//去掉小数点后面数字的值
          arr.push(r2);//把分割好的数组放到数组里面
        })
         arr.shift();//删除第一个数组
         var obj=[]//定义一个对象
        arr.forEach(v=>{//遍历数组
          // console.log(v.split(']')[0])
          obj.push({ time: v.split(']')[0], text: v.split(']')[1]});
          // obj[v.split(']')[0]] = v.split(']')[1];//分割时间和歌词到对象里面
        })
        // console.log(obj);
        _this.setData({
          lyricList:obj
        })
      }),

    this.setData({
      // poster:this.data.poster,
      name:this.data.name,
      author:this.data.author
    })
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // 使用 wx.createAudioContext 获取 audio 上下文 context
    this.audioCtx = wx.createAudioContext('myAudio');
    this.audioCtx.play();
    this.data.play=false;
    this.setData({
      play: this.data.play
    })
   
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