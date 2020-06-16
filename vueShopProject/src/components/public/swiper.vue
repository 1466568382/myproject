<template>
  <div>
    <!-- 轮播图 -->
    <div class="swiper-container swiperRecommend">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item,index) in imgs" :key="index">
          <img :src="item.img" alt />
        </div>
      </div>
      <!-- Add Pagination -->
      <div class="swiper-pagination paginationRecommend"></div>
    </div>
    <!-- 轮播图 end -->
  </div>
</template>

<script>
import Swiper from "swiper";
export default {
  data: function() {
    return {};
  },
  props: ["imgs"], //接收图片数据

  mounted() {
    new Swiper(".swiperRecommend", {
      pagination: {
        el: ".paginationRecommend"
      }
    });
  }
};
</script>

<style lang="scss" scoped>
img{
    width: 100%;
    height: 100%;
}
.swiperRecommend{
    height: 8.125rem;
}
.swiper-container {
  width: 100%;
//   height: 100%;
}
.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;

  /* Center slide text vertically */
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
}
</style>