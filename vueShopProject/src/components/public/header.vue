<template>
  <div>
    <van-sticky>
      <div class="header">
        <span @click="$router.go(-1)"><i class="iconfont icon-fanhui goback"></i>返回</span>
        {{$route.name}}
      </div>
    </van-sticky>
  </div>
</template>

<script>
export default {};
</script>
<style lang="scss">
    .van-icon{
      vertical-align: middle;
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
  i.goback{
    width: .265625rem;
    height: .265625rem;
    font-size: 0.25rem;
  }
}
</style>