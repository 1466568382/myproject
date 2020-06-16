<template>
  <div>
    <!-- 头部 -->
    <van-sticky>
      <div class="header">
        <span @click="$router.go(-1)">
          <i class="iconfont icon-fanhui goback"></i>返回
        </span>
        {{$route.name}}
      </div>
    </van-sticky>
    <!-- 列表内容 -->
      <div
        class="content"
        v-for="(item, index) in classGoodsList"
        :key="index"
        @click="goDetail(item)"
       
      >
        <img class="img"  v-lazy="item.shop_img" alt />
        <div class="right">
          <p class="yh">大促</p>
          <p class="title">{{item.shop_name}}</p>
          <p class="brief">&nbsp;</p>
          <p class="price">
            <span class="red">￥{{item.shop_price}}.00</span>
            <del>￥{{item.old_price}}.00</del>
          </p>
        </div>
      </div>
    <p class="load">全部加载完成</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      classId: "002",
      classGoodsList: []
    };
  },
  methods: {
    goDetail(data) {
      console.log(data);
      this.$router.push({
        path: "./detail",
        query: data
      });
    }
  },
  created() {
    this.classId = this.$route.query.id;
    this.$store.state.isShow = false;
    this.$store.state.bedFalg = false;
    this.$axios({
      methods: "GET",
      url: "classifyList",
      params: {
        id: this.classId
      }
    })
      .then(result => {
        console.log(result);
        this.classGoodsList = result.data.result.classifyList;
      })
      .catch(err => {
        console.log(err);
      });
  },
  destroyed() {
    // this.$store.state.isShow = true;
    this.$store.state.bedFalg = true;
  }
};
</script>

<style lang="scss" scoped>
* {
  padding: 0;
  margin: 0;
}
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

//内容
.content {
  overflow: hidden;
  border-bottom: 1px solid #f9f9f9;
  .img {
    display: block;
    margin-top: 0.375rem;
    margin-left: 0.46875rem;
    float: left;
    width: 30%;
    height: 2.8125rem;
    background-size: contain;
  }
  .right {
    box-sizing: border-box;
    padding-top: 0.46875rem;
    float: right;
    font-size: 0.3125rem;
    width: 60%;
    padding-right: 0.46875rem;
    .yh {
      font-size: 0.213333rem;
      display: inline-block;
      padding: 0.0025rem 0.09625rem;
      background-color: #ffe7e5;
      border: 1px solid #fffdf0;
      border-radius: 0.46875rem;
      color: #e6b217;
      font-weight: bold;
      margin-bottom: 0.15625rem;
    }
    .title {
      font-weight: bold;
    }
    .brief {
      color: #7f7f7f;
      font-size: 0.1875rem;
    }
    .price {
      margin-top: 0.3125rem;
      font-weight: bold;
      color: #999999;
      .red {
        color: #d44d44;
        font-weight: bold;
      }
      del {
        color: #888888;
        font-weight: normal;
        font-size: 0.25rem;
        margin-left: 0.625rem;
      }
    }
  }
}
.load {
  color: #969696;
  text-align: center;
  font-size: 0.28125rem;
  height: 0.625rem;
  line-height: 0.625rem;
}
.bed {
  height: 0;
}
</style>