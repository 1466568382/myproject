<template>
<!-- 在整个app跟上面绑定一个 拖动返回效果 -->
  <div id="app">
    <!-- @tanslate-song-id 获取子组件传过来的id  是songItem传到home再传到这里的-->
    <!-- keep-alive 保存存活组件创建完成之后不会的销毁 作用防止闪白 -->
    <keep-alive>
       <router-view @tanslate-song="currentSong = $event" :currentSong="currentSong" ></router-view>
    </keep-alive>
     <div v-if="currentSong" style="height:47px"></div>

    <!-- 这些东西是在所有组件都显示的  因为直接放在主组件里面的-->
    <!-- 播放器 -->
    <PlayBar v-if="currentSong" :currentSong="currentSong"  @tanslate-song="currentSong = $event"
    ></PlayBar>
   
  </div>
</template>
<script>
  import PlayBar from "@/components/PlayBar";
export default {
  components:{
    PlayBar,
  },
    data() {
      return {
        currentSong:null,
        touchstartX:0,//拖动的距离
      }
    },
   
    methods: {
     
    },
}
</script>
<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

</style>
