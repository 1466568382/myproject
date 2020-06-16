<template>
  <div class="palylist" @touchstart="touchstart" @touchend="touchend">
    <!-- {{$route.query.id}} -->
    <!-- 判断songListDetail是否存在再执行里面显示里面的代码 因为这些代码是比获取要快的 否则会报错 -->
    <template v-if="songListDetail">
      <div class="header">
        <div class="mask" :style="{backgroundImage:`url(${songListDetail.coverImgUrl})`}"></div>
        <div class="fl">
          <img :src="songListDetail.coverImgUrl" />
          <span class="playcount">
            <i class="fa fa-headphones"></i>
            {{playCountParse(songListDetail.playCount)}}
          </span>
          <span class="icon">歌单</span>
        </div>
        <div class="fr">
          <h3>{{songListDetail.name}}</h3>
          <img :src="songListDetail.creator.avatarUrl" alt />
          <span>{{songListDetail.creator.nickname}}</span>
        </div>
      </div>

      <!-- 标签 -->
      <div class="info">
        <div class="tags">
          <span>标签：</span>
          <i v-for="(item, index) in songListDetail.tags" :key="index">{{item}}</i>
        </div>
        <div class="desc" :class="{show:showMoreDesc}">
          <span>简介：</span>
          <span>{{songListDetail.description}}</span>
        </div>
        <div class="more" @click="showMoreDesc=!showMoreDesc">
          <i v-if="showMoreDesc" class="fa fa-angle-up"></i>
          <i v-else class="fa fa-angle-down"></i>
        </div>
      </div>
      <!-- 歌曲列表 -->
      <div class="songList">
        <div class="title">歌曲列表</div>
        <ul>
           <!-- @tanslate-song="$emit('tanslate-song',$event)" -->

          <SingleSong
           v-for="(item, index) in songListDetail.tracks" 
           :songItem="item" :key="index" :options="{order:index}"
            @tanslate-song="$emit('tanslate-song', $event)"
            :currentSong="currentSong"
          ></SingleSong>
        </ul>
      </div>
    </template>
  </div>
</template>

<script>
import SingleSong from '@/components/SingleSong';
export default {
  props:{
    currentSong:Object
    
  },
  data() {
    return {
      songListId: this.$route.query.id,
      songListDetail: null, //用来接收服务器返回的数据
      showMoreDesc: false
    };
  },
  components:{
    SingleSong,
  },
  methods: {
     touchstart(event){
        this.touchstartX=event.changedTouches[0].clientX;
        
      },
      touchend(event){
        //如果拖动的距离大于50  就返回上一页
          if(event.changedTouches[0].clientX-this.touchstartX>60){
                //  console.log("从左到右");
                //  把this.touchstartX请0  方便下一次获取值
                //返回上一步
                 this.routerBack();
          }
      },
      routerBack(){
        // 和  this.$router.go(-1);是一样的效果
        this.$router.back();
      },
    // getSongListDetail() {
    //   // 前面的url在axios.js里面设置了
    //   this.axios
    //     .get("/playlist/detail", {
    //       params: {
    //         //参数 相当于在?后面添加
    //         id: this.songListId
    //       }
    //     })
    //     .then(response => {
    //       this.songListDetail = response.data.playlist;
    //       //获取到的数据放入本地存储  并转成JSON字符串

    //       console.log(this.songListDetail);

    //       window.localStorage.setItem(
    //         //存储的名字
    //         "sl-" + this.$route.query.id,
    //         //设置过期时间3小时 和 保存数据
    //         JSON.stringify({
    //           expire: Date.new() + 3 * 60 * 60 * 1000,
    //           result: response.data.result
    //         })
    //       );
    //     })
    //     .catch(error => {
    //       console.log(error);
    //     });
    // },
    //处理播放次数
    playCountParse: function(n) {
      if (n > 100000000) return (n / 100000000).toFixed(1) + "亿";
      if (n > 10000) return (n / 10000).toFixed(1) + "万";
    }
  },
  //使用了keep-alive  created第二次开始就不会继续获取数据了
  //所有我们 要在页面跳转之前 获取数据
  // 注意着个路由不能使用this

  beforeRouteEnter(to, from, next) {
    const cacheSongListDetail = JSON.parse(
      window.localStorage.getItem("sl-" + to.query.id)
    );
    if (cacheSongListDetail && cacheSongListDetail.expire > Date.now()) {
      next(vm => {
        // 通过 `vm` 访问组件实例
        // vm就是 vue对象 代替了this给页面赋值
        vm.songListId = Number(to.query.id);
        vm.songListDetail = cacheSongListDetail.result;
      });
    } else {
      // axios window和this都可以获取
      window.axios
        .get("/playlist/detail", {
          params: {
            //参数 相当于在?后面添加
            id: to.query.id //获取传过来的id 这个是上一个路由的数据
          }
        })
        .then(response => {
          let playlist = response.data.playlist;
          //获取到的数据放入本地存储  并转成JSON字符串
          //next的里面的回调函数就是跳转后执行的
          next(vm => {
            // 通过 `vm` 访问组件实例
            // vm就是 vue对象 代替了this给页面赋值
            vm.songListId = Number(to.query.id);
            vm.songListDetail = playlist;
          });
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  // created() {
  //   const cacheSongListDetail = JSON.parse(
  //     window.localStorage.getItem("sl-" + this.songListId)
  //   );
  //   if (cacheSongListDetail && cacheSongListDetail.expire > Date.now()) {
  //     //存在并且还没有过期
  //     this.songListDetail = cacheSongListDetail.result;
  //   } else {
  //     //过期就执行或不存在也执行
  //     this.getSongListDetail();
  //   }
  // },
  //路由更新守卫  进入路由之前 拦截路由  作用是直接在路由修改id值是依旧能获取它的值
  // beforeRouteUpdate(to, from, next) {
  //   from;
  //   //获取传过来的id
  //   this.songListId = Number(to.query.id);
  //   next();
  // },
  // watch: {
  //   //监听songListId 变化了就触发
  //   songListId: function() {
  //     console.log("变化了");
  //   }
  // }
};
</script>

<style lang="less" scoped>
img {
  max-width: 100%;
}
.header {
  display: flex;
  padding: 30px 15px;
  position: relative;
  overflow: hidden;
  color: white;
  // 遮罩层
  .mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    //filter 过滤 blur模糊 brightness亮度
    filter: blur(30px) brightness(0.8);
    //放大的作用是让周围没有那么白边
    transform: scale(1.5);
    background-position: center;
  }
  .fl {
    flex: 4;
    position: relative;
    font-size: 12px;
    line-height: 18px;
    .xxx() {
      position: absolute;
      top: 0;
      left: 0;
    }
    .playcount {
      .xxx();
      width: 100%;
      text-align: right;
      padding: 0 5px;
      background: rgba(0, 0, 0, 0.3);
    }
    .icon {
      .xxx();
      top: 15px;
      background: #bb3b3f;
      padding: 0 10px;
      border-top-right-radius: 1em;
      border-bottom-right-radius: 1em;
    }
  }
  .fr {
    flex: 6;
    padding-left: 15px;
    h3 {
      padding: 5px 0 20px 0;
    }
    img {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      vertical-align: middle;
    }
    span {
      font-size: 14px;
      padding-left: 15px;
    }
  }
}

// 简介
.info {
  padding: 0 10px;
  line-height: 1.5em;
  font-size: 14px;
  .tags {
    margin: 10px 0;
    span {
      // vertical-align: middle;
    }
    i {
      font-size: 12px;
      margin-right: 5px;
      font-style: normal;
      border: 1px solid lightgray;
      border-radius: 12px;
      padding: 2px 5px;
    }
  }
  .desc {
    height: 4.5em;
    overflow: hidden;
    text-overflow: ellipsis;
    // background: red;
    &.show {
      height: auto;
    }
    span {
      //这个应该是换行
      white-space: pre-wrap;
    }
  }
  .more {
    overflow: hidden;
    i {
      float: right;
      font-size: 16px;
    }
  }
}
.songList{
  .title{
    padding-left: 15px;
    font-size: 12px;
    color: #666666;
    background-color:#eeeff0 ;
    line-height: 2em;
  }
}
</style>