<template>
  <div>
    <div class="stroll">
      <h2>你目前还没有此类订单</h2>
      <p>感谢您在CROWN商城购物</p>
      <div class="btn">
        <div class="login" @click="$router.push('/home')">返回首页</div>
      </div>
    </div>
  </div>
</template>

<script>

export default {};
</script>

<style lang="scss" scoped>
// 没订单显示内容
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