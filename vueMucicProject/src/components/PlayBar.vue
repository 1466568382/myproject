<template>
  <div class="playbar">
    <div class="playbarbottom" @click="showFullscreen=true">
      <img
        class="thumb"
        :class="{active:playing}"
        :src="currentSongCL.picUrl!=undefined?currentSongCL.picUrl:currentSongCL.al.picUrl"
      />
      <div class="info">
        <h5>{{currentSongCL.name}}</h5>
        <span>{{currentSongCL.ar!=undefined?joinArtists(currentSongCL.ar):joinArtists(currentSongCL.song.artists)}}</span>
      </div>
      <div class="progress" @click.stop="playing=!playing">
        <canvas id="canvas" width="36" height="36"></canvas>
        <i v-if="playing" class="fa fa-pause"></i>
        <i v-else class="fa fa-play"></i>
      </div>
      <div class="playlist" @click.stop="showPlayList=!showPlayList">
        <i class="fa fa-bars"></i>
      </div>
    </div>

    <!-- 播放列表 -->

    <!-- 播放列表遮罩层 -->
    <div  class="palyMask" @click="showPlayList=false" v-show="showPlayList"></div>
    <transition
      name="custom-classes-transition"
      enter-active-class="animated slideInUp"
      leave-active-class="animated slideOutDown"
    >
      <ul v-show="showPlayList" class="defaultPlayList">
        <!-- @tanslate-song(接收)="$emit('tanslate-song', $event)(emit在发)" 这句属于中转  是由 SongItem发过来的  我们在发给父亲-->
        <!-- <li>地方双方都速度</li> -->
        <SongItem
          v-for="(item, index) in defaultPlayList"
          :key="index"
          :songItem="item"
          :options="{order:index,info:false}"
          @tanslate-song="$emit('tanslate-song', $event)"
          :currentSong="currentSongCL"
        ></SongItem>
      </ul>
    </transition>

    <!-- 播放器详情页 -->

    <transition
      name="custom-classes-transition"
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    >
      <div class="fullscreenplay" v-show="showFullscreen">
        <!-- currentSong.artists[0].img1v1Url -->
        <div
          class="mask"
          :style="{backgroundImage: `url(${currentSongCL.picUrl!=undefined?currentSongCL.picUrl:currentSongCL.al.picUrl})`}"
        ></div>
        <header>
          <i class="fa fa-arrow-left" @click="showFullscreen=false"></i>
          <div class="content">
            <div class="name">{{currentSongCL.name}}</div>
            <div
              class="author"
            >{{currentSongCL.ar!=undefined?joinArtists(currentSongCL.ar):joinArtists(currentSongCL.song.artists)}}</div>
          </div>
        </header>
        <div class="circle" v-show="showCircle" :class="{active:playing}" @click="showCircle=false">
          <div class="needle"></div>
          <div class="glue">
            <img
              :src="currentSongCL.picUrl!=undefined?currentSongCL.picUrl:currentSongCL.al.picUrl"
            />
          </div>
        </div>
        <div v-show="!showCircle" class="lyric-box" @click="showCircle=true">
          <!-- parsedLyric是计算属性  拿到的是处理过的歌词 -->
          <ul class="scroll" :style="{transform:`translateY(${-currentLyricIndex * 28}px)`}">
            <li
              v-for="(item, index) in parsedLyric"
              :key="index"
              :class="{active:index===currentLyricIndex}"
            >{{item.text}}</li>
          </ul>
        </div>
        <footer>
          <div class="progressBar">
            <span class="startTime">00:00</span>
            <input type="range" value="0" min="0" max="100" step="0.01" />
            <span class="totalTime">00:00</span>
          </div>
          <div class="controller">
            <i class="fa fa-step-backward" style="fontSize:25px" @click="pre"></i>
            <i v-if="playing" class="fa fa-pause-circle" @click.stop="playing=!playing"></i>
            <i v-else class="fa fa-play-circle" @click.stop="playing=!playing"></i>
            <i class="fa fa-step-forward" style="fontSize:25px" @click="next"></i>
          </div>
        </footer>
      </div>
    </transition>
    <audio :src="currentSongUrl" autoplay></audio>
  </div>
</template>

<script>
import SongItem from "@/components/SongItem";
export default {
  data() {
    return {
      playing: true,  // 播放状态
      showFullscreen: false,
      showCircle: true,
      currentLyric: null,
      currentLyricIndex: 0,// 歌词高亮
      showPlayList: false,
      defaultPlayList: [this.currentSong],
      playIndex: 0,
      currentSongCL: null
    };
  },
  components: {
    SongItem
  },
  props: {
    currentSong: Object
  },
  computed: {
    // currentSong:function(){
    //    return this.defaultPlayList[this.playIndex];
    // },
    currentSongUrl: function() {
      // return 执行就会触发计算属性
      if (this.currentSongCL) {
        //判断有没有这个值 再给currentSongUrl值
        return `https://music.163.com/song/media/outer/url?id=${this.currentSongCL.id}.mp3`;
      } else {
        return "";
      }
    },
    //歌词02 处理歌词
    parsedLyric: function() {
      if (this.currentLyric) {
        //空的时候不执行
        return this.currentLyric.split("\n").map(item => {
          // /d数组{2}就是2两位 :就是:  i忽略大小写
          var regex = /\d{2}:\d{2}\.\d/i;
          // search 判断是否有这个字符串  返回-1
          if (item.search(regex) !== -1) {
            //这句不是必要的 只是解决后端的数据不正确的 比如不是时间+歌词格式的歌
            //判断是否为空的
            // var time = item.substr(1, 9);
            //match查找字符串中是否有对应的字符串 有就返回 要找的字符串
            var time = item.match(regex)[0]; //也是截取的作用的
            var m = time.substr(0, 2);
            var s = time.substr(3, 2);
            var n = time.substr(5);
            return {
              time: Number(m) * 60 + Number(s) + Number(n),
              text: item.substr(10).replace("]","") || "----------" //空的时候就是 ---------- 没有东西截取就算(false)空
            };
          } else {
            return {};
          }
        });
      } else {
        return null;
      }
    }
  },
  methods: {
    //修改时间
    countTime(time) {
      var n = Math.floor(time);
      var m = Math.floor(n / 60);
      var s = n % 60;
      m = m > 9 ? m : "0" + m;
      s = s > 9 ? s : "0" + s;
      return m + ":" + s;
    },
    //上一首
    pre() {
      this.playIndex--;
      if (this.playIndex < 0) {
        this.playIndex = this.defaultPlayList.length - 1;
      }
      this.currentSongCL = this.defaultPlayList[this.playIndex];
    },
    //下一首
    next() {
      this.playIndex++;
      if (this.playIndex > this.defaultPlayList.length - 1) {
        this.playIndex = 0;
      }
      this.currentSongCL = this.defaultPlayList[this.playIndex];
    },
    //用来处理 多个作者 并且 还需要用/把他们隔开
    joinArtists(artists) {
      //map返回的是一个数组 forEach只用于遍历返回为undefined  join就是把元素拼成字符串
      return artists.map(artist => artist.name).join("/");
    },
    drawProgress() {
      //获取画布
      var canvas = this.$el.querySelector("#canvas");
      //获取audio元素
      var audio = this.$el.querySelector("audio");
      //获取歌曲总的时间(毫秒单位)
      var duration;
      if (this.currentSongCL.song) {
        duration = this.currentSongCL.song.duration;
      } else {
        duration = this.currentSongCL.dt;
      }
      this.$el.querySelector(".progressBar input").onchange = function() {
        // console.log(this.value);
        audio.currentTime = (this.value * audio.duration) / 100;
      };


      //播放完就执行   顺序播放
      audio.onended=()=>{
        if(this.defaultPlayList.length>1){
            this.next();
        }else{
          this.playing=true;

        }
          
      };
      //ontimeupdate可以获取现在播放的位置  并且播放有进度就会触发
      audio.ontimeupdate = () => {
        // console.log(duration);
        // console.log(this.currentTime);//audio当前的时间
        // console.log((this.currentTime * 1000) / duration);
        //歌曲时间的变化
        this.$el.querySelector(".startTime").innerText = this.countTime(
          audio.currentTime
        );
        //进度条的改变

        this.$el.querySelector(".progressBar input").value =
          (audio.currentTime / (duration / 1000)) * 100;


        let progressBarValue=Number(this.$el.querySelector(".progressBar input").value);
        
        this.$el.querySelector(".progressBar input").style.backgroundImage = `linear-gradient(to right,  white ${progressBarValue}%, gray 0% ,gray)`;
        //这个东西 在写画布的代码就有提示
        /** @type {HTMLCanvasElement} */
        //清理画布
        // 获取canvas元素
        var context = canvas.getContext("2d");
        context.clearRect(0, 0, 36, 36);
        // 开始
        context.beginPath(); //重置  重新开始画
        context.arc(18, 18, 17, 0, 2 * Math.PI); //画一个圆
        context.closePath(); //连接起始点
        context.strokeStyle = "gray"; //画笔的颜色
        context.lineWidth = "1"; //线的宽度
        context.stroke(); //画 绘制线条

        //红色的进度条圆
        context.beginPath(); //重置  重新开始画
        //这里为什么是 -0.5 * Math.PI呢?  因为圆的开始点是在右边的  这里是负90  就是在顶部开始画
        //  -0.5 * Math.PI + 2 * Math.PI * ((this.currentTime * 1000) / duration)
        context.arc(
          18,
          18,
          17,
          -0.5 * Math.PI,
          -0.5 * Math.PI + 2 * Math.PI * ((audio.currentTime * 1000) / duration)
        ); //画一个圆

        context.strokeStyle = "rgba(255,0,0,0.7)"; //画笔的颜色
        context.lineWidth = "1"; //线的宽度
        context.stroke(); //画 绘制线条

        // 歌词03 实现滚动歌词  使用index对歌词进行滚动
        let index;
        // for (let i = 0; i < this.parsedLyric.length; i++) {
        //   if (audio.currentTime + 0.15 < this.parsedLyric[i].time) {
        //     index = i - 1;
        //   }
        // }

        // if (index === undefined) {
        //   index = this.parsedLyric.length - 1;
        // }
        // this.currentLyricIndex = index;

        if (this.parsedLyric) {
          for (let i = 0; i < this.parsedLyric.length; i++) {
            if (audio.currentTime + 0.15 < this.parsedLyric[i].time) {
              index = i - 1;
              break;
            }
          }
          if (index === undefined) {
            index = this.parsedLyric.length - 1;
          }
          this.currentLyricIndex = index;
        } else {
          return false;
        }
      };
    },
    //歌词01  获取歌词
    getLyric() {
      var cachedLyric = window.localStorage.getItem(
        "lyric" + this.currentSongCL.id
      );
      if (cachedLyric) {
        this.currentLyric = cachedLyric;
      } else {
        window.axios
          .get("lyric", {
            params: {
              id: this.currentSongCL.id
            }
          })
          .then(response => {
            // if (response.data.lrc) {
            this.currentLyric = response.data.lrc.lyric;
            // } else {
            //   return false;
            // }
            window.localStorage.setItem(
              "lyric" + this.currentSongCL.id,
              response.data.lrc.lyric
            );
          });
      }
    }
  },
  created() {
    this.currentSongCL = this.currentSong;
    this.getLyric();
  },
  mounted() {
    //这个函数只执行一次 哪为什么这里面的会根据值来 触发事件呢 因为 把这两个事件帮顶在audio里面了
    console.log("触发了挂载生命周期");
    let duration;
    if (this.currentSongCL.song) {
      duration = this.currentSongCL.song.duration;
    } else {
      duration = this.currentSongCL.dt;
    }
    this.$el.querySelector(".totalTime").innerText = this.countTime(
      duration / 1000
    );
    //有页面有元素挂载就执行
    this.drawProgress();
    var audio = this.$el.querySelector("audio");
    //   在视频播放的时候执行  而mouted是挂载时执行
    audio.onplay = () => {
      console.log("开始播放");
      this.playing = true;
    };
    //    在视频暂停的时候执行
    audio.onpause = () => {
      console.log("暂停播放");
      this.playing = false;
    };
  },
  watch: {
    //这个是根据playing执行播放还是暂停
    playing: function(value) {
      //监听playing的值 判断是否播放
      var audio = this.$el.querySelector("audio");
      if (value) {
        audio.play(); //播放
      } else {
        audio.pause(); //暂停
      }
    },
    // 第一个参数是新值 第二个才是旧值
    currentSong: function(value) {
      //currentSong改变 重新获取值
      this.currentSongCL = this.currentSong;
      this.getLyric();
      let duration;
      if (this.currentSongCL.song) {
        duration = this.currentSongCL.song.duration;
      } else {
        duration = this.currentSongCL.dt;
      }
      this.$el.querySelector(".totalTime").innerText = this.countTime(
        duration / 1000
      );
      //歌曲列表去重
      //检测是否有这个id有就true
      let isExist = this.defaultPlayList.some(item => {
        return item.id == value.id;
      });

      if (!isExist) this.defaultPlayList.push(value);
    },
    currentSongCL: function(value) {
      this.currentSongCL =value;
      this.$emit('tanslate-song',this.currentSongCL);
      this.getLyric();
      this.drawProgress();
      let duration;
      if (this.currentSongCL.song) {
        duration = this.currentSongCL.song.duration;
      } else {
        duration = this.currentSongCL.dt;
      }
      this.$el.querySelector(".totalTime").innerText = this.countTime(
        duration / 1000
      );
    }
  }
};
</script>

<style lang="less" scoped>
//图片动画
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.playbarbottom {
  padding: 5px 0;
  background: white;
  border-top: 1px solid rgba(128, 128, 128, 0.2);
  display: flex;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  align-items: center;
  z-index: 10;
  .margin() {
    margin: 0 10px;
  }
  .thumb {
    .margin;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    animation: rotate 6s linear infinite;
    animation-play-state: paused;
    &.active {
      animation-play-state: running;
    }
  }
  .info {
    flex: 1;
    font-size: 12px;
    line-height: 18px;
    h5 {
      overflow: hidden;
      width: 150px;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    span {
      color: gray;
    }
  }
  .progress {
    .margin;
    width: 28px;
    height: 28px;
    position: relative;
    #canvas {
      width: 100%;
    }
    i {
      position: absolute;
      top: 50%;
      left: 50%;
      color: gray;
      font-size: 12px;
      display: block;
      margin-top: -6px;
      margin-left: -6px;
      line-height: 1em;
      width: 12px;
      height: 12px;
      text-align: center;
    }
  }
  .playlist {
    .margin;
    width: 28px;
    height: 28px;
    position: relative;
    i {
      position: absolute;
      top: 50%;
      left: 50%;
      color: gray;
      font-size: 16px;
      display: block;
      margin-top: -8px;
      margin-left: -8px;
      line-height: 1em;
      width: 16px;
      height: 16px;
      text-align: center;
    }
  }
}
.fullscreenplay {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  .mask {
    filter: blur(30px) brightness(0.5);
    transform: scale(2); //放大就看不到边上的特别模糊的地方
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    background-color: lightblue; //默认颜色
    position: absolute;
    z-index: -1;
  }
  header {
    height: 50px;
    display: flex;
    align-items: center;
    padding-left: 10px;
    padding-top: 10px;
    i {
      width: 30px;
      font-size: 20px;
      color: #fff;
      margin-right: 15px;
    }
    .name {
      color: #fff;
      font-size: 18px;
      overflow: hidden;
      width: 200px;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .author {
      color: #ccc;
      font-size: 14px;
    }
  }
  .circle {
    flex: 1;
    text-align: center;
    position: relative;
    .glue {
      padding: 54px;
      background-image: url("../assets/disc_light-ip6.png"),
        url("../assets/disc.png"); //两张图叠起来  第一位在上面
      background-size: 100%;
      border-radius: 50%;
      display: inline-block;
      margin-top: 84px;
      animation: rotate 6s linear infinite;
      animation-play-state: paused;
    }
    img {
      width: 180px;
      height: 180px;
      border-radius: 50%;
      vertical-align: middle;
    }
    .needle {
      width: 96px;
      height: 137px;
      background-image: url("../assets/needle-ip6.png");
      background-size: 100%;
      position: absolute;
      top: 0;
      left: 50%;
      z-index: 1;
      margin-left: -16px;
      transform: rotate(-12deg);
      transform-origin: 16px 0; //默认值 50% 50% 就是在中间  这里就是x轴16 y轴0

      transition: all 0.3s;
    }
    &.active {
      .needle {
        transform: rotate(0deg);
      }
      .glue {
        animation-play-state: running;
      }
    }
  }
  .lyric-box {
    flex: 1;
    overflow: hidden;
    position: relative;
    .scroll {
      text-align: center;
      position: absolute;
      width: 100%;
      height: 100%;
      top: 50%;
      margin-top: -1em;
      transition: transform 0.3s;
    }
    li {
      line-height: 2em;
      font-size: 14px;
      height: 2em;
      color: gray;
      &.active {
        color: white;
      }
    }
  }
  footer {
    height: 100px;
    // background: lightblue;
    .progressBar {
      margin-top: 20px;
      display: flex;
      align-items: center;
      span {
        color: #fff;
        font-size: 13px;
        width: 45px;
        text-align: center;
      }
      input {
        flex: 1;
        height: 5px; /*横条的高度*/
        background-color: #a1a0a0;
      }
       input[type=range] {
        border-radius: 10px;
        width: 100%;
        -webkit-appearance: none;
        background:gray;
        /* 关键 */
        background-image: linear-gradient(to right,  white 0%, gray 0% ,gray);
        cursor: pointer
      }

      input[type=range]:focus {
          outline: none
      }

      input[type=range]::-webkit-slider-runnable-track {
          height: 5px;
          border-radius: 10px;
          box-shadow: 0 1px 1px #def3f8, inset 0 .125em .125em #0d1112
      }

      input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: 10px;
          width: 10px;
          margin-top: -1px;
          background: #ffffff;
          border-radius: 50%;
          border: solid .125em rgba(205, 224, 230, 0.5);
          box-shadow: 0 .125em .125em #3b4547
      }
    }
    .controller {
      padding: 0 30px;
      display: flex;
      margin-top: 10px;
    }
    i {
      flex: 1;
      text-align: center;
      font-size: 35px;
      color: #fff;
      line-height: 40px;
    }
  }
}
//动画进入的时间
.fadeIn {
  animation-duration: 0.3s;
}
//播放列表
.defaultPlayList {
  position: fixed;
  bottom: 50px;
  left: 2.5%;
  width: 95%;
  max-height: 300px;
  overflow-x: scroll;
  background: white;
  border-radius: 15px;
  box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.3);
  z-index: 9;
}
.palyMask{
  z-index:8;
  position:fixed;
  top:0;
  left:0;
  width:100%;
  height:100vh;
  background: rgba(0,0,0,0.5);
}
</style>