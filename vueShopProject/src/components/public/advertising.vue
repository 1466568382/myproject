<template>
  <div>
    <div class="background">
      <button @click="goHome">跳过</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      num: 3,
      timer: null
    };
  },
  methods: {
      goHome(){
          this.$router.push('/home');
      }
  },

  created() {
      this.timer=setInterval(()=>{
          if(this.num==0){
               this.$router.push('/home');  
          }else{
              this.num--;
          }
      },1000)
    this.$store.state.isShow = false;
  },
    beforeDestroy(){
        clearInterval(this.timer);//销毁之前清除定时器
    },
  destroyed() {
    this.$store.state.isShow = true;
  },
};
</script>

<style lang="scss" scoped>
*{
  margin: 0;
  padding: 0;
}
.background{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('../../assets/pubulic/ggy.jpg') no-repeat;
  background-size: 100% 100%;
  p{
    position: absolute;
    top: .3125rem;
    right: 1.5625rem;
    color: #b6b6b6;
    font-size: .625rem;
  }
  button{
    position: absolute;
    top: .3125rem;
    right: .3125rem;
    background: #565656;
    border-radius: 50%;
    font-size: .25rem;
    padding: .15625rem;
    color: #c5c5c5;
  }
}
</style>