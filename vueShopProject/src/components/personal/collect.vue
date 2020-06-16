<template>
  <div>
    <!-- 头部 -->
    <headerconenter></headerconenter>
    <!--内容-->
    <div
      class="content"
      v-for="(item, index) in $store.state.collect.lists"
      :key="index"
      @click="goDetail(item)"
    >
      <div class="img">
        <img :src="item.shop_img" alt />
      </div>
      <div class="right">
        <p class="title">{{item.shop_name}}</p>
        <p class="brief">¥{{item.shop_price}}.00</p>
        <div class="del">
          <van-button
            type="default"
            size="small"
            @click.stop="$store.commit('collect/del',index)"
          >删除</van-button>
        </div>
      </div>
    </div>

    <!-- 没有内容时显示 -->
    <div class="stroll" v-if="$store.state.collect.lists.length==0">
      <h2>你目前还没有收藏商品</h2>
      <p>赶快去收藏吧</p>
      <div class="btn">
        <div class="login" @click="$router.push('/home')">返回首页</div>
      </div>
    </div>
  </div>
</template>

<script>
import headerconenter from "../public/header";
export default {
  methods: {
    // 跳转到详情页
    goDetail(data) {
      this.$router.push({ path: "./detail", query: data });
    }
  },
  components: {
    headerconenter //头部
  },
  created() {
    this.$store.state.isShow = false;
  },
  destroyed() {
    // this.$store.state.isShow = true;
  }
};
</script>

<style lang="scss" scoped>
//内容
.content {
  overflow: hidden;
  border-bottom: 1px solid #ececec;
  .img {
    margin-top: 0.375rem;
    margin-left: 0.46875rem;
    float: left;
    width: 30%;
    height: 2.8125rem;
    // background: url("../../assets/shop/sp1.webp") no-repeat center center;
    // background-size: contain;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .right {
    box-sizing: border-box;
    padding-top: 0.46875rem;
    float: right;
    font-size: 0.3125rem;
    width: 60%;
    position: relative;
    .title {
      font-weight: bold;
    }
    .brief {
      color: #7f7f7f;
      font-size: 0.1875rem;
    }
    .del {
      position: absolute;
      top: 100%;
      right: 0.3125rem;
    }
  }
}
.stroll {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #e3e3e3;
  text-align: center;
  background: url("../../assets/personal/bg.png") no-repeat center center;
  h2 {
    margin-top: 4.6875rem;
    color: #c9c9c9;
    font-size: 0.546875rem;
    margin-bottom: 0;
  }
  p {
    margin-top: 0.15625rem;
    font-size: 0.37rem;
    color: #c9c9c9;
    font-weight: normal;
  }
  .btn {
    width: 3.125rem;
    margin: 0.46875rem auto;
    height: 0.9375rem;
    .login {
      // float: left;
      width: 3.125rem;
      height: 0.9375rem;
      color: #ffffff;
      font-size: 0.375rem;
      line-height: 0.9375rem;
      box-shadow: inset 0 -1px 1px rgba(2, 1, 1, 0.2),
        0 0 1px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.2);
      background: #5e8bdd;
      background: linear-gradient(#6f94e8, #5178df);
      border-radius: 0.09375rem;
      text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.15);
    }
  }
}
</style>