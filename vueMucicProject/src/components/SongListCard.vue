<template>
  <li class="card" @click="routerToPlayListPage(songList.id)" >
    <div class="thumb">
      <img :src="songList.picUrl" />
      <span>
        <i class="fa fa-headphones"></i>
        {{playCountParse(songList.playCount)}}
      </span>
    </div>
    <h5>{{songList.name}}</h5>
  </li>
</template>

<script>
export default {
  props: {
    songList: {
      type: Object,
      default: () => {
        return {
          alg: "featured",
          canDislike: false,
          copywriter: "编辑推荐：恭喜华晨宇成为《歌手·当打之年》歌王！",
          highQuality: false,
          id: 3233380300,
          name: "歌手·当打之年现场及原曲合集",
          picUrl:
            "https://p2.music.126.net/GMy_E4iX4_IVWGHMw5bwZw==/109951164685568806.jpg",
          playCount: 73600528,
          trackCount: 197,
          trackNumberUpdateTime: 1587740280952,
          type: 0
        };
      }
    }
  },
  methods: {
    //处理播放次数
    playCountParse(n){
      // toFixed 保留多少位小数
        if(n>100000000) return (n/100000000).toFixed(1)+"亿";
        if(n>10000) return (n/10000).toFixed(1)+"万";
    },
    //跳转到详情页
    routerToPlayListPage(id){
      this.$router.push({
        path:"playlist",
        query:{
          id
        }
      })
    }
  },
};
</script>

<style lang="less" scoped>
.card {
  flex-basis: 30%;
  flex-grow: 1;
  margin-bottom: 5px;
  &:nth-child(3n + 2) {
    margin: 0 3px;
  }
  .thumb {
    position: relative;
    img {
      vertical-align: middle;
    }
    span {
      position: absolute;
      top: 0;
      right: 0;
      color: white;
    }
  }
  h5 {
    font-size: 14px;
    margin: 3px 0 5px 0;
    line-height: 1.2em;
    height: 2.4em; //h5字体的大小的倍数  2.4*14
    //多行溢出显示省略号
    text-overflow: ellipsis; /*省略部分为..*/
    overflow: hidden; /*溢出隐藏*/
    word-break: break-all; /*中英文自动换行*/
    display: -webkit-box;
    -webkit-line-clamp: 2; /*行数*/
    -webkit-box-orient: vertical;
  }
}
</style>