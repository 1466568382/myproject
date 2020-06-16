<template>
  <div>
    <div class="home">
      <!-- 头部 -->
      <div class="header">
        <img src="../assets/home/logo.png" alt />
      </div>
      <!-- 搜索框 -->
      <van-sticky>
        <router-link to="/search" tag="div" class="search">
          <div class="content">
            <div class="csearch">
              <i class="searchIcon"></i>
              <div class="text">请输入搜索关键字</div>
            </div>
          </div>
        </router-link>
      </van-sticky>
      <!-- 轮播图 -->
      <div class="bannerBox">
        <div class="banner">
          <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
            <van-swipe-item v-for="(item, index) in slideshow" :key="index"  @click="$router.push({path:'./productList',query:{id:item.id}})">
              <img v-lazy="item.img" alt="">
            </van-swipe-item>
          </van-swipe>
          <div class="line">
            <span></span>
          </div>
        </div>
      </div>
      <!-- 商品 -->
      <div class="product">
        <div class="productItem" v-for="(item, index) in centerGoodlist" :key="index">
          <div class="content">
            <img class="bg" v-lazy="item.top.top_img" alt />
            <div class="huokuai">
              <div class="slide-box">
                <div
                  class="slide-item"
                  v-for="(val, id) in item.shop"
                  :key="id"
                  @click="goDetail(val)"
                >
                  <img v-lazy="val.shop_img" alt />
                  <h1>{{val.shop_name}}</h1>
                  <p>
                    <span class="red">￥{{val.shop_price}}</span>
                    <del>￥{{val.old_price}}</del>
                  </p>
                </div>
              </div>
            </div>
            <div class="line">
              <span></span>
            </div>
          </div>
        </div>
      </div>
      <!--猜你喜欢 -->
      <like></like>
    </div>
  </div>
</template>

<script>
import like from "../components/public/like";
export default {
  data() {
    return {
      centerGoodlist: [],
      slideshow:[
        {
          id:"002",
          img:require("../assets/home/b1.webp"),
        },
        {
          id:"001",
          img:require("../assets/home/b2.webp"),
        },
        {
          id:"013",
          img:require("../assets/home/b3.webp"),
        },
        {
          id:"012",
         img:require("../assets/home/b4.webp"),
        },
        {
          id:"008",
          img:require("../assets/home/b5.webp"),
        },
      ]
    };
  },
  components: {
    like
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
    this.$store.state.isShow = true;

    // 获取localStorage   作用是不用每次切换页面都要重新获取数据
    var centerListData = JSON.parse(
      window.localStorage.getItem("centerListData")
    );
    if (centerListData && centerListData.expires > Date.now()) {
      this.centerGoodlist = centerListData.data;
    } else {
      this.$axios
        .get("centerList")
        .then(result => {
          if (result.data.code == 200) {
            window.localStorage.setItem(
              "centerListData",
              JSON.stringify({
                expires: Date.now() + 10 * 60 * 1000,
                data: result.data.result
              })
            );
            this.centerGoodlist = result.data.result;
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
* {
  padding: 0;
  margin: 0;
}
ul {
  list-style: none;
}
//头部
.header {
  height: 0.9375rem;
  position: relative;
  img {
    width: 0.46875rem;
    height: 0.46875rem;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
  }
}
//搜索框
.search {
  height: 1.25rem;
  border-bottom: 0.015625rem solid #f1f1f1;
  background: #fff;
  cursor: pointer;
  // 24
  .content {
    height: 0.84375rem;
    padding: 0.203125rem;
    .csearch {
      height: 0.8125rem;
      background: #f5f5f5;
      border-radius: 0.421875rem;
      border: 1px solid #e8e8e8;
      position: relative;
      .searchIcon {
        position: absolute;
        top: 0;
        left: 0.203125rem;
        bottom: 0;
        margin: auto 0;
        display: block;
        width: 0.46875rem;
        height: 0.46875rem;
        background: url("../assets/home/search.png") no-repeat;
        background-size: contain;
        //cover覆盖是不显示整张图片
      }
      .text {
        font-size: 0.34375rem;
        color: #b3b3b3;
        margin-top: 0.15625rem;
        margin-left: 0.859375rem;
      }
    }
  }
}
//轮播图
.bannerBox {
  height: 5.359375rem;
  .banner {
    margin-top: 0.234375rem;
    margin-bottom: 0.46875rem;
    .line {
      margin-top: 0.46875rem;
      padding: 0 0.3125rem;
      span {
        display: block;
        height: 0.015625rem;
        background: #f1f1f1;
      }
    }
    .my-swipe {
      height: 4.53125rem;
    }
    .van-swipe-item {
      padding: 0 0.3125rem;
      box-sizing: border-box;
      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
  }
}
//商品展示
.product {
  .productItem {
    height: 7.375rem;
    overflow: hidden;
    padding: 0 0.359375rem;
    .content {
      margin-top: 0.46875rem;
      height: 6.90625rem;
      overflow: hidden;
      position: relative;
      .line {
        span {
          display: block;
          height: 0.015625rem;
          background: #f1f1f1;
        }
      }
      .bg {
        position: absolute;
        z-index: -1;
        top: 0;
        left: 0;
        width: 100%;
        height: 2.734375rem;
        background: url("../assets/home/sp1.webp") no-repeat;
        background-size: 100% 100%;
      }
      .huokuai {
        margin-top: 2.1875rem;
        .slide-box {
          display: -webkit-box;
          overflow-x: scroll;
          -webkit-overflow-scrolling: touch;
        }
        /*去掉滚动条*/
        .slide-box::-webkit-scrollbar {
          width: 0;
          height: 0;
          display: none;
        }
        .slide-item {
          width: 27%;
          height: 4.6875rem;
          // border:1px solid #ccc;
          margin-right: 0.15625rem;
          img {
            width: 100%;
            height: 2.65625rem;
            box-sizing: border-box;
            background-size: contain;
            border: 1px solid rgba(0, 0, 0, 0.05);
            background-color: #fcfcfc;
            box-shadow: 0 0.02rem 0.2rem rgba(0, 0, 0, 0.06);
            border-radius: 0.234375rem;
          }
          h1 {
            height: 0.78125rem;
            line-height: 0.78125rem;
            font-size: 0.3125rem;
            color: #4c4c4c;
            text-indent: 0.15625rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          p {
            margin-top: 0.15625rem;
            color: #c5c5c5;
            text-indent: 0.15625rem;
            font-size: 0.21875rem;
            .red {
              color: #d44d44;
              font-size: 0.28125rem;
              margin-right: 0.078125rem;
            }
          }
        }
      }
    }
  }
}
</style>