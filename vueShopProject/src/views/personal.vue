<template>
  <div>
    <!-- 头部 -->
    <div class="header">{{$route.name}}</div>
    <!--  -->
    <div class="content">
      <!-- 登录 -->
      <div class="login">
        <div class="head" v-if="$store.state.username">
          {{$store.state.username}}
          <i class="user"></i>
          <span @click="$store.state.username=''">退出</span>
        </div>
        <div class="head" v-else @click="$router.push('/login')">
          登录/注册
          <i class="user"></i>
          <i class="right">
            <van-icon name="arrow" />
          </i>
        </div>
        <!-- 订单 -->
        <div class="nav">
          <ul>
            <li @click="goRouter('/indentList/indentAll')">
              <div class="img"></div>
              <p>全部订单</p>
            </li>
            <li @click="goRouter('/indentList/indentAll?id=2')">
              <div class="img"></div>
              <p>待付款</p>
            </li>
            <li @click="goRouter('/indentList/indentAll?id=3')">
              <div class="img"></div>
              <p>待收货</p>
            </li>
            <li @click="goRouter('/indentList/indentAll?id=4')">
              <div class="img"></div>
              <p>已完成</p>
            </li>
          </ul>
        </div>
      </div>
      <!-- 功能列表 -->
      <div class="item">
        <ul>
          <li @click="goRouter('/address')">
            地址管理
            <i class="right">
              <van-icon name="arrow" />
            </i>
          </li>
        </ul>
      </div>
      <div class="item">
        <ul>
          <li @click="goRouter('/collect')">
            我的收藏
            <i class="right">
              <van-icon name="arrow" />
            </i>
          </li>
        </ul>
      </div>
      <div class="item">
        <ul>
          <li @click="goRouter('/coupon')">
            我的优惠劵
            <i class="right">
              <van-icon name="arrow" />
            </i>
          </li>
        </ul>
      </div>
      <div class="item">
        <ul>
          <li @click="goRouter('/faq')">
            常见问题
            <i class="right">
              <van-icon name="arrow" />
            </i>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  created() {
    this.$store.state.isShow = true;
  },
  methods: {
    goRouter(router){
      if(this.$store.state.username){
        this.$router.push(router);
      }else{
         Toast("请先登录");
      }

    }
  },
};
</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
}
//头部
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
}
.content {
  position: fixed;;
  top: 0;
  left: 0;
  margin-top: 1.066667rem;
  background-image: url("../assets/grzx/bg.png");
  background-color: #ebebeb;
  height: 100%;
  width: 93.8%;
  padding: 0 0.3125rem;
  .login {
    overflow: hidden;
    margin-top: 0.390625rem;
    height: 4.0625rem;
    background: #fff;
    border-radius: 0.1875rem;
    box-shadow: 0 0.015625rem 0.03125rem rgba(0, 0, 0, 0.1),
      0 0.28125rem 0.3125rem -0.15625rem rgba(0, 0, 0, 0.03),
      0 0.28125rem 0.3125rem -0.15625rem rgba(0, 0, 0, 0.03),
      0 0.15625rem 0.3125rem -0.15625rem rgba(0, 0, 0, 0.03);
    .head {
      position: relative;
      height: 2.34375rem;
      font-size: 0.4375rem;
      line-height: 2.34375rem;
      text-indent: 2.421875rem;
      border-bottom: 0.015625rem solid #f6f6f6;
      &:active{
            background: #f5f5f5;
      }
      span {
        font-size: 0.3125rem;
        text-decoration: underline;
      }
      .user {
        position: absolute;
        top: 0.46875rem;
        left: 0.46875rem;
        display: block;
        width: 1.484375rem;
        height: 1.484375rem;
        border-radius: 50%;
        background: url("../assets/grzx/user.png") no-repeat;
        background-size: 100% 100%;
        box-shadow: inset 0 0.015625rem 0.03125rem 0.015625rem #9a9fac;
      }
      .right {
        position: absolute;
        top: 0rem;
        right: 0.3125rem;
        color: #9a9a9a;
        font-weight: bolder;
        font-size: 0.375rem;
      }
    }
    .nav {
      height: 4.0625rem - 151;
      ul {
        overflow: hidden;
        li {
          text-align: center;
          width: 25%;
          float: left;
          height: 4.0625rem - 150;
          border-right: 0.015625rem solid #f6f6f6 !important;
          box-sizing: border-box;
          &:active {
            color: #fff;
            background: linear-gradient(#779ef1, #4771e6);
          }
          &:last-child {
            border-right: 0 !important;
            .img {
              background: url("../assets/grzx/n4.png") no-repeat center center;
              background-size: contain;
            }
          }
          &:nth-child(2) {
            .img {
              background: url("../assets/grzx/n2.png") no-repeat center center;
              background-size: contain;
            }
          }
          &:nth-child(3) {
            .img {
              background: url("../assets/grzx/n3.png") no-repeat center center;
              background-size: contain;
            }
          }
          .img {
            margin: 0.390625rem auto 0;
            width: 0.5rem;
            height: 0.46875rem;
            background: url("../assets/grzx/n1.png") no-repeat center center;
            background-size: contain;
          }
          p {
            height: 0.703125rem;
            line-height: 0.703125rem;
            font-size: 0.25rem;
            color: #333333;
          }
        }
      }
    }
  }
  .item {
    overflow: hidden;
    margin-top: 0.390625rem;
    background: #fff;
    border-radius: 0.1875rem;
    box-shadow: 0 0.015625rem 0.03125rem rgba(0, 0, 0, 0.1),
      0 0.28125rem 0.3125rem -0.15625rem rgba(0, 0, 0, 0.03),
      0 0.28125rem 0.3125rem -0.15625rem rgba(0, 0, 0, 0.03),
      0 0.15625rem 0.3125rem -0.15625rem rgba(0, 0, 0, 0.03);
    ul {
      li {
        height: 1.640625rem;
        color: #333333;
        position: relative;
        font-size: 0.46875rem;
        line-height: 1.640625rem;
        text-indent: 0.546875rem;
        box-sizing: border-box;
        border-bottom: 0.015625rem solid #f6f6f6;
        &:last-child {
          border-bottom: 0;
        }
        &:active {
          color: #fff;
          background: linear-gradient(#779ef1, #4771e6);
        }
        .right {
          top: 0rem;
          right: 0.34375rem;
          position: absolute;
          color: #9a9a9a;
          font-weight: bolder;
          font-size: 0.375rem;
        }
      }
    }
  }
}
</style>