<template>
  <div>
    <!-- 头部 -->
    <headerconenter></headerconenter>
    <van-popup v-model="showList" round position="bottom" style="height: 100%; padding-top: 4px;">
      <van-coupon-list
        :coupons="coupons"
        :show-close-button="false"
        :chosen-coupon="chosenCoupon"
        :disabled-coupons="disabledCoupons"
        @change="onChange"
        @exchange="onExchange"
      />
    </van-popup>
  </div>
</template>

<script>
import headerconenter from "../public/header";
const coupon = {
  available: 1,
  condition: "无使用门槛\n最多优惠12元",
  reason: "",
  value: 2000,
  name: "优惠券名称",
  startAt: 1489104000,
  endAt: 1914592000,
  valueDesc: "20",
  unitDesc: "元"
};
export default {
  data() {
    return {
      chosenCoupon: -1,
      coupons: [coupon],
      disabledCoupons: [coupon],
      showList: true
    };
  },
  methods: {
    onChange(index) {
      this.chosenCoupon = index;
    },
    onExchange(code) {
      console.log(code);

      this.coupons.push(coupon);
    }
  },
  components: {
    headerconenter //头部
  },
  created() {
    this.$store.state.vanTabbar = false;
  },
  // 生命周期钩子，最后销毁函数
  destroyed() {
    // 当组件被销毁时候，修改导航数据
    this.$store.state.vanTabbar = true;
  }
};
</script>
<style lang="scss">
.van-checkbox__icon {
  display: none;
}
.van-tabs.van-tabs--line.van-coupon-list__tab{
  height: 100vh;
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
}
.van-checkbox {
  display: none !important;
  background: red;
}
</style>