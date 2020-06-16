<template>
  <div>
    <headerconenter></headerconenter>
    <div class="content">
      <h4>商城购买的手机，激活之后是否可以“7天无理由退货”？</h4>
      <hr />
      <p>根据2017年1月6日国家工商行政管理总局令第90号公布的《网络购买商品七日无理由退货暂行办法》，手机激活后将不适用七日无理由退货规定。</p>
      <h4>产品的保修期如何计算？</h4>
      <hr />
      <p>保修期从收到产品（以下简称“收货”）之日开始计算（不会由于转售而重新计算时间），锤子商城的产品将分别按照以下不同的保修期提供保修服务：</p>
      <p>1、移动电话主机的保修期为自收货之日起12个月；</p>
      <p>
        2、电池的保修期为自收货之日起12个月；3、附件类产品保修期为自收货之日起12个月。
        单独销售的产品：
      </p>
      <p>1、后壳的保修期为在收货之日起12个月；</p>
      <p>2、充电器的保修期为在收货之日起12个月；</p>
      <p>3、数据线和绕线器的保修期为在收货之日起12个月。</p>
    </div>
  </div>
</template>

<script>
import headerconenter from "../public/header";
export default {
  components:{
    headerconenter,
  },
  created() {
    // this.$store.state.vanTabbar = false;
    this.$store.state.isShow = false;
    this.$store.state.bedFalg = false;
  },
  // 生命周期钩子，最后销毁函数
  destroyed() {
    // 当组件被销毁时候隐藏导航栏
    // this.$store.state.vanTabbar = true;
    this.$store.state.isShow = true;
    this.$store.state.bedFalg = true;
  }
};
</script>

<style lang="scss" scoped>
  .content {
  padding: 0 0.390625rem;
  h4 {
    margin: 0.15625rem;
    font-size: 0.625rem;
    color: #252525;
  }
  p {
    font-size: 0.46875rem;
    line-height: 0.9375rem;
    color: #666666;
  }
}
</style>