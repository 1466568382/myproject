<template>
  <div>
    <HomeLink></HomeLink>
    <div class="hotHeader" style="margin-top:40px">
      <img src="../assets/hot_music_bg_2x.jpg" alt />
      <div class="bg"></div>
      <div class="content">
        <div class="hotList"></div>
        <div class="date">更新日期: 04月30日</div>
      </div>
    </div>
    <div class="songList" :class="{show:loadingMore}">
      <SingSong
        v-for="(item, index) in hotSongList"
        :key="index"
        :songItem="item"
        :options="{order:index,zero:true}"
        @tanslate-song="$emit('tanslate-song',$event)"
        :currentSong="currentSong"
      ></SingSong>
    </div>
    <!-- 点击加载更多 -->
    <div class="loadingMore" @click="more">{{loadingText}}</div>
    <!-- 跳转的加载遮罩层 -->
    <div class="loading" v-if="showLoading">
      <img src="../assets/loading.svg" alt />
    </div>
  </div>
</template>

<script>
import HomeLink from "@/components/HomeLink";
import SingSong from "@/components/SingleSong";
export default {
  data() {
    return {
      hotSongList: [],
      showLoading:true,
      loadingMore:false,
      loadingText:"加载更多"
    };
  },
  props: {
    currentSong: Object
  },
  components: {
    HomeLink,
    SingSong
  },
  methods: {
    more(){
      this.loadingMore=true
      this.loadingText="全部加载完成"
    },
    getHotSongList() {
      this.axios
        .get("/top/list?idx=1")
        .then(response => {
          console.log(response.data.playlist.tracks);

          this.hotSongList = response.data.playlist.tracks;
          //获取到的数据放入本地存储  并转成JSON字符串
          this.showLoading=false;
          window.localStorage.setItem(
            "hotSongList",
            //过去时间1小时
            JSON.stringify({
              //expire 设置过去时间   Date.now()为当前时间的时间戳  1*60*60*1000 1个小时的毫秒数
              expire: Date.now() + 1 * 60 * 60 * 1000,
              //数据
              result: response.data.playlist.tracks
            })
          );
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  created() {
    const hotSongLists = JSON.parse(window.localStorage.getItem("hotSongList"));
    if (hotSongLists) {
      this.hotSongList = hotSongLists.result;
      this.showLoading=false;
    } else {
      this.getHotSongList();
    }
  }
};
</script>

<style lang="less" scoped>
.hotHeader {
  width: 100%;
  height: 140px;
  position: relative;
  img {
    width: 100%;
    height: 100%;
    display: block;
  }
  .bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.2);
  }
  .content {
    padding-left: 20px;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    .hotList {
      margin-top: 20px;
      background-image: url("../assets/index_icon_2x.png");
      width: 142px;
      height: 67px;
      background-position: -24px -30px;
      background-size: 166px 97px;
    }
    .date {
      font-size: 10px;
      color: white;
      margin-top: 10px;
    }
  }
}
.songList{
  height:566px;
  overflow:hidden;
 
}
 .show{
    height:auto;
  }
.loading {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh; //就是看到的百分百 不能滑动页面
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  z-index: 999;
  justify-content: center; //主轴居中
  align-items: center; //交叉轴居中
  img {
    width: 50px;
  }
}
.loadingMore{
    text-align:center;
    height:25px;
    line-height:25px;
    font-size:14px;
    color:gray;
}
</style>