<template>
  <div class="home">
    <!-- 跳转的加载遮罩层 -->
    <div class="loading" v-if="showLoading">
      <img src="../assets/loading.svg" alt />
    </div>
    <HomeLink></HomeLink>
    <div class="personalized" style="margin-top:55px">
      <CardTitle>推荐歌单</CardTitle>
      <ul class="songlist">
        <SongListCard v-for="(item, index) in randomPersonalizeds()" :key="index" :songList="item" 
        ></SongListCard>
      </ul>
    </div>
    <div class="newsong">
      <CardTitle>最新音乐</CardTitle>
      <ul>
        <!-- <SongItem v-for="(item, index) in newsong" :key="index" :songItem="item" :order="index"></SongItem> -->
        <SongItem
          v-for="(item, index) in newsong"
          :key="index"
          :songItem="item"
          :options="{info:true}"
          @tanslate-song="$emit('tanslate-song', $event)"
          :currentSong="currentSong"
        ></SongItem>
      </ul>
    </div>
  </div>
</template>

<script>
//@无论前面的是什么路径都能访问到
import CardTitle from "@/components/CardTitle";
import SongListCard from "@/components/SongListCard";
import HomeLink from "@/components/HomeLink";
import SongItem from "@/components/SongItem";
export default {
  name: "Home",
  components: {
    CardTitle,
    SongListCard,
    HomeLink,
    SongItem
  },
  data() {
    return {
      personalized: [],
      newsong: [],
      showLoading: false
    };
  },
  props:{
    currentSong:Object
  },
  methods: {
    getPersonalized: function() {
      // 前面的url在axios.js里面设置了
      this.axios
        .get("/personalized")
        .then(response => {
          this.personalized = response.data.result;
          //获取到的数据放入本地存储  并转成JSON字符串

          window.localStorage.setItem(
            "personalizeds",
            //过去时间1小时
            JSON.stringify({
              //expire 设置过去时间   Date.now()为当前时间的时间戳  1*60*60*1000 1个小时的毫秒数
              expire: Date.now() + 1 * 60 * 60 * 1000,
              //数据
              result: response.data.result
            })
          );
        })
        .catch(error => {
          console.log(error);
        });
    },
    getNewSong: function() {
      // 前面的url在axios.js里面设置了
      this.axios
        .get("/personalized/newsong")
        .then(response => {
          this.newsong = response.data.result;
          //获取到的数据放入本地存储  并转成JSON字符串

          window.localStorage.setItem(
            "newsongs",
            //过去时间1小时
            JSON.stringify({
              //expire 设置过去时间   Date.now()为当前时间的时间戳  1*60*60*1000 1个小时的毫秒数
              expire: Date.now() + 1 * 60 * 60 * 1000,
              //数据
              result: response.data.result
            })
          );
        })
        .catch(error => {
          console.log(error);
        });
    },
    //随机区六个歌单
    randomPersonalizeds: function() {
      //深拷贝数组  目的不修改本来的数组
      return  [...this.personalized].slice(0,6);
      // var arr = [...this.personalized];

      // var newArr = [];
      // for (let i = 0; i < 6; i++) {
      //   var r = Math.floor(Math.random() * arr.length); //0-30的随机一个
      //   //...解构的作用
      //   newArr.push(...arr.splice(r, 1)); //splice会改变数组
      // }
      // return newArr;
    }
  },
  created() {
    //如果每次创建组件都拿数据  太频繁 本地存储
    //获取localStorage的数据 并把JSON字符串 转为
    const cachePersonalizeds = JSON.parse(
      window.localStorage.getItem("personalizeds")
    );
    //判断cachePersonalizeds是否为空 并且判断localStorage里面的时间是否过期了
    if (cachePersonalizeds && cachePersonalizeds.expire > Date.now()) {
      //存在就使用localStorage的数据
      this.personalized = cachePersonalizeds.result;
    } else {
      this.getPersonalized();
    }

    // 最新歌曲的
    const cacheNewsongs = JSON.parse(window.localStorage.getItem("newsongs"));
    //判断cachePersonalizeds是否为空 并且判断localStorage里面的时间是否过期了
    if (cacheNewsongs && cacheNewsongs.expire > Date.now()) {
      //存在就使用localStorage的数据
      this.newsong = cacheNewsongs.result;
    } else {
      this.getNewSong();
    }
  },

  //路由守卫  跳到这个页面前隐藏遮罩层  
  beforeRouteEnter (to, from, next) {
    next(vm=>{
      vm.showLoading=false;
    })
  },
  //离开组件是调用 
  beforeRouteLeave (to, from, next) {
    this.showLoading=true;
    next();
  }
};
</script>

<style lang="less">
.songlist {
  display: flex;
  flex-wrap: wrap; //撑满换行
}
.home {
  position: relative;
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
</style>