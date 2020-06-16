<template>
  <li class="songitem" @click="$emit('tanslate-song',songItem)">
      <!-- v-if="order!==undefined" 这句是判断有没有传order 有就显示 没有就移除  为什么是undefined  因为这里有0 0是不等于undefined 只等于空-->
    <span class="order" v-if="options.order!==undefined">{{options.order+1}}</span>
    <!-- :style="{marginLeft:order!==undefined?'0px':'10px'}" 判读是否要设置右外边距 -->
    <div class="main" :style="{marginLeft:options.order!==undefined?'0px':'10px'}">
      <h3>
        <span class="text">{{songItem.name}}</span>
        <span class="alias" v-if="options.info!==false">{{songItem.song!=undefined?songItem.song.alias[0]:songItem.alia[0]}}</span>
      </h3>
      <div class="info" v-if="options.info!==false">
        <i class="icon icon-quality"></i>
        <span class="artists">{{joinArtists(songItem.song.artists)}}</span>
        <span class="album">--{{songItem.song.album.name}}</span>
      </div>
    </div>
    <!-- 正在播放图标 -->
    <img src="../assets/playing.svg"
    class="icon icon-play"
    style="background:none"
    v-if="currentSong&&songItem.id === currentSong.id"
     alt="">
    <!-- 播放图标 -->
    <i v-else class="icon icon-play"></i>
  </li>
</template>

<script>
export default {
  props: {
    options: Object,
    songItem: Object,
    currentSong:Object
  },
  methods: {
    //用来处理 多个作者 并且 还需要用/把他们隔开
    joinArtists(artists) {
        //map返回的是一个数组 forEach只用于遍历返回为undefined  join就是把元素拼成字符串
     
      return artists.map(artist => artist.name).join("/");
    }
  }
};
</script>

<style lang="less" scoped>
.icon {
  background-image: url("../assets/index_icon_2x.png");
  display: inline-block;
  background-size: 166px auto;
  &.icon-quality {
    width: 12px;
    height: 8px;
    margin: 0 5px 0 2px;
  }
  &.icon-play {
    width: 25px;
    height: 25px;
    background-position-x: -23px;
    margin: 0 10px;
  }
}
.songitem {
  display: flex;
  margin: 10px 0;
  align-items: center;
    color: rgb(189, 189, 189);
  .order {
    font-size: 18px;
    width: 2em;
    // background: red;
    text-align: center;
  }
  .main {
    flex: 1;
    width: 0;
    // white-space: nowrap;
    // overflow: hidden;
    // text-overflow: ellipsis;
    margin-left: 10px;

    h3 {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      .text{
        color: #333;
      }
      .alias {
      }
    }
    .info {
      font-size: 12px;
      line-height: 2em;
      color: rgb(189, 189, 189);
    }
  }
}
</style>