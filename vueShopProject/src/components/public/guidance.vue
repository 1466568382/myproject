<template>
  <div>
    <!-- Swiper -->
    <div class="swiper-container containerguidepage">
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <div >
             <img  class="animated fadeInUpBig" src="../../assets/pubulic/ydy3.jpg" alt />
          </div>
        </div>
        <div class="swiper-slide">
          <div >
          <img class="animated fadeInUpBig" src="../../assets/pubulic/ydy1.jpg" alt />
           <div class="shop" @click="$router.push('/home')">现在就购物</div>
          </div>
        </div>
      </div>
      <!-- Add Pagination -->
      <div class="swiper-pagination paginationguidepage"></div>
    </div>
  </div>
</template>

<script>
import Swiper from "swiper";
export default {
  data() {
    return {
      flag: true
    };
  },
  created() {
    this.$store.state.isShow = false;
  },
  mounted() {
    new Swiper(".containerguidepage", {
      pagination: {
        el: ".paginationguidepage"
      },
      on: {
      }
    });
  },
  // 生命周期钩子，最后销毁函数
  destroyed() {
    // 当组件被销毁时候，修改导航数据
    this.$store.state.isShow = true;
  }
};
</script>

<style lang="scss" scoped>
.swiper-container {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
}
.swiper-slide {
  text-align: center;

  button{
    position: absolute;
    top: .15625rem;
    right: .15625rem;
    transform: translateX(-50%); 
  }
  h3{
      position: absolute;
    top: 50%;
    left: 0;
    bottom: 0;
    right: 0;
     color: #ffffff;
  }
}
.swiper-container {
      img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
    }
     .shop{
       position: absolute;
       top: 82%;
       left: 50%;
       transform: translate(-50%);
       cursor: pointer;
      float: right;
      width: 3.125rem;
      height: 0.9375rem;
      color: #5e5e5e;
      background-color: #a19c9c;
      font-size: 0.375rem;
      line-height: 0.9375rem;
      box-shadow: inset 0 -1px 1px rgba(2, 1, 1, 0.2),
        0 0 1px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.2);
      border-radius: .09375rem;
      text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.15);
    }
}

</style>