<template>
  <div>
    <!-- 头部搜索 -->
    <van-sticky>
      <div class="searchBox">
        <div class="search">
          <i>
            <van-icon name="search" />
          </i>
          <span class="del" v-show="delShow" @click="del"></span>
          <input type="text" placeholder="请输入搜索关键字" v-model="keywords" @keypress.enter="search" />
        </div>
        <div class="cancel" @click="$router.go('-1')">取消</div>
      </div>
    </van-sticky>
    <!-- 热门搜索 -->
    <div class="hot" v-show="isShow">
      <div class="title">热门搜索</div>
      <span
        v-for="(item, i) in hotSearch"
        :key="i"
        :class="{more:i=='0'}"
        @click="hotSearchClick(item)"
      >{{item}}</span>
      <div class="title" v-if="searchHistory.length>0">搜索记录</div>
      <!-- 这里key值不能相同  +"-only  就解决了"  相同可能是上面的影响或者push-->
      <span v-for="(val, i) in searchHistory" :key="i+'-only'" @click="hotSearchClick(val)">{{val}}</span>
    </div>
    <!-- 没有内容是显示 -->
    <div class="error" v-show="flag">
      <div class="img"></div>
      <p>抱歉,没有搜索到相关的商品</p>
    </div>

    <!-- 搜索显示内容 -->
    <div v-if="searchData">
      <div
        v-for="(item, index) in searchContent"
        :key="index"
        class="content"
        @click="goDetail(item)"
      >
        <div class="img2">
          <img v-lazy="item.shop_img" alt />
        </div>
        <div class="right">
          <p class="yh">直降</p>
          <p class="title">{{item.shop_name}}</p>
          <p class="brief">&nbsp;</p>
          <p class="price">
            <span class="red">￥{{item.shop_price}}.00</span>
            <del>￥{{item.old_price}}.00</del>
          </p>
        </div>
      </div>
    </div>

    <!-- 猜你喜欢 -->
    <div v-show="likeShow">
      <like></like>
    </div>
    <!-- 加载 -->
    <loading v-if="loading"></loading>
  </div>
</template>

<script>
import like from "../components/public/like";
import loading  from "../components/public/loading";
export default {
  data() {
    return {
      delShow: false,
      keywords: "",
      //热门搜索的显示隐藏
      isShow: true,
      flag: false,
      //猜你喜欢的显示隐藏
      likeShow: true,
      // 搜索数据的显示隐藏
      searchData: true,
      goodsList: [],
      // 热门搜索
      hotSearch: ["坚果 Pro 3", "卫衣", "帆布鞋", "保护套", "T恤"],
      searchContent: [],
      searchHistory: [],
      loading:false
    };
  },
  methods: {
    // 跳转到详情页
    goDetail(data) {
      this.$router.push({ path: "./detail", query: data });
    },
    // 热门搜索
    hotSearchClick(item) {
      this.keywords = item;
      this.search();
    },
    //清除输入框
    del() {
      this.keywords = "";
    },
    //搜索
    search() {
      this.loading=true;
      setTimeout(()=>{
        this.loading=false;
      },1000)

      // 添加搜索记录
      let isInclude = this.searchHistory.includes(this.keywords);
      if (!isInclude) {
        this.searchHistory.push(this.keywords);
      }

      this.searchData = true;
      if (this.keywords) {
        this.isShow = false;
        var newList = [];
        this.goodsList.forEach(item => {
          if (item.shop_name.indexOf(this.keywords) != -1) {
            newList.push(item);
          }
        });
        if (newList.length > 0) {
          //判断是否找到
          this.flag = false;
          this.likeShow = false;
          this.searchContent = newList;
        } else {
          this.likeShow = true;
          this.flag = true;
        }
      } else {
        this.isShow = true;
        return false;
      }
    }
  },
  watch: {
    keywords: function(val) {
      if (val == "") {
        this.searchContent = [];
        this.searchData = false;
        this.likeShow = true;
        this.flag = false;
        this.isShow = true;
        this.delShow = false;
      } else {
        this.delShow = true;
      }
    }
  },
  components: {
    like, //猜你喜欢
    loading,//加载
  },
  created() {
    this.$store.state.isShow = false; //不显示底部导航
    this.$store.state.bedFalg = false; //去除底部填充

    // 获取localStorage   作用是不用每次切换页面都要重新获取数据
    var searchData = JSON.parse(window.localStorage.getItem("searchData"));
    if (searchData && searchData.expires > Date.now()) {
      this.goodsList = searchData.data;
    } else {
      this.$axios
        .get("searchData")
        .then(result => {
          if (result.data.code == 200) {
            window.localStorage.setItem(
              "searchData",
              JSON.stringify({
                expires: Date.now() + 10 * 60 * 1000,
                data: result.data.result
              })
            );
          }
          this.goodsList = result.data.result;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  destroyed() {
    // this.$store.state.isShow = true;
    this.$store.state.bedFalg = true; //去除底部填充
  }
};
</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
}
.searchBox {
  overflow: hidden;
  background: #f5f5f5;
  height: 1.40625rem;
  box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid #dddddd;
  .search {
    float: left;
    position: relative;
    width: 7.8125rem;
    height: 0.9375rem;
    border-radius: 30px;
    margin: 0.234375rem 0.15625rem;
    i {
      position: absolute;
      top: 0.140625rem;
      left: 0.125rem;
      color: #c9c9c9;
      font-size: 0.46875rem;
    }
    .del {
      position: absolute;
      top: 50%;
      right: 0.234375rem;
      -webkit-transform: translateY(-50%);
      transform: translateY(-50%);
      width: 0.46875rem;
      height: 0.46875rem;
      background: url("../assets/search/del.png") no-repeat;
      background-size: 0.46875rem;
    }
    input {
      width: 100%;
      height: 100%;
      outline: none;
      box-shadow: inset 0 0.05rem 3px rgba(0, 0, 0, 0.02),
        inset 0 2px 4px rgba(0, 0, 0, 0.15),
        inset 0 0 0 0.05rem rgba(0, 0, 0, 0.1),
        0 0.05rem 0.05rem 0 hsla(0, 0%, 100%, 0.1);
      border: 0;
      display: block;
      border-radius: 30px;
      text-indent: 0.78125rem;
      font-size: 0.3125rem;
      &::placeholder {
        color: #9e9e9e;
      }
    }
  }
  .cancel {
    float: right;
    height: 0.9375rem;
    width: 1.5625rem;
    line-height: 0.9375rem;
    text-align: center;
    font-size: 0.375rem;
    color: #626262;
    font-weight: bold;
    border: 1px solid #d7d7d7;
    box-sizing: border-box;
    border-radius: 0.234375rem;
    margin: 0.234375rem 0.15625rem;
  }
}
.hot {
  margin-top: 0.15625rem;
  padding: 0 0.234375rem;
  .title {
    height: 1.09375rem;
    line-height: 1.09375rem;
    font-size: 0.46875rem;
    color: #8e8e8e;
    text-indent: 0.3125rem;
  }
  span {
    display: inline-block;
    background: #fff7e4;
    text-align: center;
    font-size: 0.390625rem;
    font-weight: bold;
    height: 0.75rem;
    line-height: 0.75rem;
    padding: 0 0.390625rem;
    color: #e78612;
    border: 1px solid #ffdfa5;
    border-radius: 0.46875rem;
    margin-right: 0.125rem;
    margin-bottom: 0.3125rem;
    &.more {
      color: #cd3f36;
      background: #ffe7e5;
      border: 1px solid #f8bcb6;
    }
  }
}

//猜你喜欢
.like {
  overflow: hidden;
  padding: 0 0.359375rem;
  h1 {
    color: #333333;
    height: 1.25rem;
    line-height: 1.25rem;
    font-size: 0.46875rem;
    text-indent: 0.25rem;
    display: flex;
  }
  ul {
    li {
      float: left;
      width: 49%;
      margin-right: 2%;
      &:nth-child(2n) {
        margin-right: 0;
      }
      .img {
        width: 100%;
        height: 4.6875rem;
        box-sizing: border-box;
        background: url("../assets/home/like1.webp") no-repeat;
        background-size: contain;
        border: 1px solid rgba(0, 0, 0, 0.05);
        background-color: #fcfcfc;
        box-shadow: 0 0.02rem 0.2rem rgba(0, 0, 0, 0.06);
        border-radius: 0.234375rem;
      }
      .text {
        padding: 0 0.15625rem;
        h2 {
          color: #4c4c4c;
          font-size: 0.375rem;
          height: 0.78125rem;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
        p {
          .red {
            font-size: 0.375rem;
            color: #d44d44;
            .rmb {
              font-size: 0.28125rem;
            }
          }
          del {
            font-size: 0.213333rem;
            color: #c2c2c2;
          }
          .yh {
            padding: 0 0.234375rem;
            height: 0.46875rem;
            line-height: 0.46875rem;
            background-color: #f6ebea;
            color: #d56159;
            font-size: 0.3125rem;
            font-weight: bold;
            border-radius: 0.234375rem;
            float: right;
            vertical-align: top;
          }
        }
      }
    }
  }
}
// 搜索内容
//内容
.content {
  overflow: hidden;
  border-bottom: 1px solid #f9f9f9;
  .img2 {
    margin-top: 0.375rem;
    margin-left: 0.46875rem;
    float: left;
    width: 30%;
    height: 2.8125rem;
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
    .yh {
      font-size: 0.213333rem;
      display: inline-block;
      padding: 0.0625rem 0.15625rem;
      background-color: #ffe7e5;
      border: 1px solid #f0968f;
      border-radius: 0.46875rem;
      color: #cc3e39;
      font-weight: bold;
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
//错误搜索
.error {
  background: #ededed;
  height: 3.125rem;
  overflow: hidden;
  text-align: center;
  .img {
    background: url("../assets/search/error.png") no-repeat;
    background-size: contain;
    width: 0.65625rem;
    height: 0.65625rem;
    display: block;
    margin: 0.625rem auto;
  }
  p {
    color: #666666;
    font-size: 0.46875rem;
    font-weight: bold;
  }
}
</style>