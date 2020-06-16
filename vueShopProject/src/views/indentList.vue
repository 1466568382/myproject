<template>
  <div>
    <van-sticky>
      <div class="header">
        <span @click="$router.push('/personal')">
          <i class="iconfont icon-fanhui goback"></i>返回
        </span>
        我的订单
      </div>
    </van-sticky>
    <van-tabs v-model="active" @change="onadd">
      <van-tab title="全部订单"></van-tab>
      <van-tab title="待支付"></van-tab>
      <van-tab title="待收货"></van-tab>
      <van-tab title="已完成"></van-tab>
    </van-tabs>
    <!-- 三级路由 -->
    <div style="margin-top:1.3375rem">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0
    };
  },

  methods: {
    onadd(index) {
      if (index == 0) {
        this.$router.push("/indentList/indentAll");
      } else if (index == 1) {
        this.$router.push("/indentList/indentPay");
      } else if (index == 2) {
        this.$router.push("/indentList/indentGoods");
      } else if (index == 3) {
        this.$router.push("/indentList/indentEnd");
      }
    }
  },
  created() {
    if ("id" in this.$route.query) {
      if (this.$route.query.id == "2") {
        this.active = 1;
        this.$router.push("/indentList/indentPay");
      } else if (this.$route.query.id == "3") {
        this.active = 2;
        this.$router.push("/indentList/indentGoods");
      }
      if (this.$route.query.id == "4") {
        this.active = 3;
        this.$router.push("/indentList/indentEnd");
      }
    }

    this.$store.state.isShow = false;
    this.$store.state.bedFalg = false;
  },
  destroyed() {
    // this.$store.state.isShow = true;
    this.$store.state.bedFalg = true;
  }
};
</script>
<style lang="scss">
.van-tabs.van-tabs--line {
  position: fixed;
  left: 0;
  right: 0;
  padding: 0.2rem 0.2rem;
  background: #fff;
  -webkit-box-shadow: 0 5.33px 13.33px rgba(0, 0, 0, 0.08);
  box-shadow: 0 5.33px 13.33px rgba(0, 0, 0, 0.08);
  z-index: 50;
}
.van-tab.van-ellipsis {
  color: #666666;
  font-weight: bold;
  font-size: .3125rem;
}
.van-tabs__line {
  background-color: transparent;
}
.van-tab {
  line-height: 0.9375rem;
}
.van-tabs--line .van-tabs__wrap {
  height: 0.9375rem;
}
.van-tab.van-tab--active.van-ellipsis {
  background-color: #afafaf;
  color: #fff;
}
.van-tab.van-ellipsis:nth-child(1) {
  border-radius: 0.3rem 0 0 0.3rem;
  border: 1px solid #dfdfdf;
}
.van-tab.van-ellipsis:nth-child(2) {
  border-top: 1px solid #dfdfdf;
  border-bottom: 1px solid #dfdfdf;
  border-right: 1px solid #dfdfdf;
}
.van-tab.van-ellipsis:nth-child(3) {
  border-top: 1px solid #dfdfdf;
  border-bottom: 1px solid #dfdfdf;
}
.van-tab.van-ellipsis:nth-child(4) {
  border-radius: 0 0.3rem 0.3rem 0;
  border: 1px solid #dfdfdf;
}
</style>
<style lang="scss" scoped>
.header {
  background-color: #1b1b1b;
  color: #ffffff;
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  font-weight: bold;
  height: 1.066667rem;
  line-height: 1.066667rem;
  width: 100%;
  text-align: center;
  font-size: 0.4rem;
  position: relative;
  span {
    position: absolute;
    top: 50%;
    left: 20px;
    font-weight: normal;
    margin-top: -0.266667rem;
    font-size: 0.25rem;
    width: 1.09375rem;
    height: 0.533333rem;
    line-height: 0.533333rem;
    background: linear-gradient(#2a2a29, #151515);
    box-shadow: inset 0 0.013333rem 0.013333rem hsla(0, 0%, 100%, 0.1),
      inset 0 0 0.013333rem rgba(0, 0, 0, 0.5);
    border-radius: 0.08rem;
  }
  i.goback {
    width: 0.265625rem;
    height: 0.265625rem;
    font-size: 0.25rem;
  }
}
</style>