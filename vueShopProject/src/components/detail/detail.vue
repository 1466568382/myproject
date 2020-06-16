<template>
  <div>
    <van-sticky>
      <div class="header">
        <span @click="goBack">
          <i class="iconfont icon-fanhui goback"></i>返回
        </span>
        {{$route.name}}
      </div>
    </van-sticky>
    <!-- 导航 -->
    <div class="navBox">
      <div class="nav" ref="left">
        <ul>
          <li :class="{current:0==currentIndex}" @click="selectItem(0)">商品</li>
          <li :class="{current:1==currentIndex}" @click="selectItem(1)">详细</li>
          <li :class="{current:2==currentIndex}" @click="selectItem(2)">参数</li>
          <li :class="{current:3==currentIndex}" @click="selectItem(3)">推荐</li>
        </ul>
      </div>
      <div class="nav2" ref="right">
        <ul>
          <li class="right-item-hook">
            <swiper :imgs="imglists"></swiper>
            <div class="brief">
              <h1>{{getRouterData.shop_name}}</h1>
              <p>
                <span class="red">￥{{getRouterData.shop_price}}.00</span>
                <span class="right">满 99 包邮</span>
              </p>
            </div>
          </li>
          <li class="right-item-hook">
            <div class="detail">
              <h2>商品详细</h2>
              <div v-for="(item, index) in imgs[0]" :key="index">
                <img v-lazy="item" alt />
              </div>
            </div>
          </li>
          <li class="right-item-hook">
            <div class="detail">
              <h2>商品参数</h2>
              <div v-for="(item, index) in imgs[1]" :key="index">
                <img v-lazy="item" alt />
              </div>
            </div>
          </li>
          <li class="right-item-hook">
            <!-- 猜你喜欢  -->
            <like></like>
          </li>
        </ul>
      </div>
    </div>
    <!-- 导航end -->
    <!-- 购物 -->
    <van-goods-action>
      <van-goods-action-icon :info="num" icon="cart-o" text="购物车" @click="$router.push('/shop')" />
      <van-goods-action-icon
        v-show="flag"
        icon="star-o"
        text="收藏"
        color="#ff5000"
        @click="collectSuccess"
      />
      <van-goods-action-icon v-show="!flag" icon="star" text="已收藏" color="#ff5000" />
      <!-- <van-icon name="star-o" /> -->
      <van-goods-action-button color="#be99ff" type="warning" text="加入购物车" @click="add(goods)" />

      <van-goods-action-button color="#7232dd" type="danger" text="立即购买" @click="onsubmit" />
    </van-goods-action>
    <loading v-if="loadingShow"></loading>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import { Toast } from "vant";
import like from "../public/like";
const { mapMutations, mapState } = createNamespacedHelpers("shop");
import BScroll from "@better-scroll/core";
import swiper from "../public/swiper";
import loading from "../../components/public/loading";
export default {
  data() {
    return {
      getRouterData: {},
      flag: true,
      goods: {},
      //商品详细
      imgs: [
        [
          require("../../assets/img/xq1.webp"),
          require("../../assets/img/xq2.webp"),
          require("../../assets/img/xq3.webp"),
          require("../../assets/img/xq4.webp"),
          require("../../assets/img/xq5.webp")
        ],
        [
          require("../../assets/img/xq6.webp"),
          require("../../assets/img/xq7.webp"),
          require("../../assets/img/xq8.webp"),
          require("../../assets/img/xq9.webp"),
          require("../../assets/img/xq10.webp"),
          require("../../assets/img/xq11.webp")
        ]
      ],
      //收藏
      collect: {},
      //轮播图
      imglists: [
        {
          img:
            "https://resource.smartisan.com/resource/3bdfee2a8681c05708ea35b794ed33c4.png?x-oss-process=image/format,webp"
        },
        {
          img:
            "https://resource.smartisan.com/resource/1d5705f78be557549c23e7ad53ab1986.png?x-oss-process=image/format,webp"
        },
        {
          img:
            "https://resource.smartisan.com/resource/ae81bf77e959cd9b050d4831be3e374a.png?x-oss-process=image/format,webp"
        },
        {
          img:
            "https://resource.smartisan.com/resource/0c4d91fa627496a4e4cf60f97264120e.png?x-oss-process=image/format,webp"
        },
        {
          img:
            "https://resource.smartisan.com/resource/22d1d5b29e2821dc08d348282d13eb99.png?x-oss-process=image/format,webp"
        }
      ],
      scrollY: 0,
      listHeight: [], //存储右边每一项li高度
      loadingShow: true
    };
  },
  methods: {
    goBack() {
      this.$router.push("/home");
    },
    //立即购买
    onsubmit() {
      if (this.$store.state.username) {
        this.add(this.getRouterData);
        this.$router.push("/order");
      } else {
        this.add(this.getRouterData);
        this.$router.push({
          path: "/login",
          query: {
            path: "/order"
          }
        });
      }
    },
    // 收藏
    collectSuccess() {
      if (this.$store.state.username != "") {//判断有没有登录
          this.flag = !this.flag;
          Toast("收藏成功");
      }else{
        Toast("你还没登录先去登录");
      }
    },
    //点击购买  添加数据
    ...mapMutations(["add"]),
    _initScroll() {
      // 联动实例化插件对象
      this.lefts = new BScroll(this.$refs.left, {
        click: true, //拥有触发事件，
        probeType: 3 //探针的效果，时时获取滚动高度
      });
      this.rights = new BScroll(this.$refs.right, {
        click: true,
        probeType: 3 //探针的效果，时时获取滚动高度
      });

      // right这个对象监听滚动事件，
      this.rights.on("scroll", pos => {
        this.scrollY = Math.abs(Math.round(pos.y));
      });
    },

    _getHeight() {
      let rightItems = this.$refs.right.getElementsByClassName(
        "right-item-hook"
      );
      let height = 0; //默认高度
      this.listHeight.push(height); //添加高度数组中
      // 循环对象
      for (let i = 0; i < rightItems.length; i++) {
        let item = rightItems[i];
        height += item.clientHeight; // 对象高度
        this.listHeight.push(height);
      }
    },
    // 左侧点击效果
    // index 下标
    // event 点击对象事件
    selectItem(index) {
      // 在better-scroll指派事件的event和普通浏览器的点击事件event有个属性区别_constructed
      // 浏览器原生点击事件没有_constructed所以当时浏览器监听到该属性时候return掉
      // 联动效果
      let rightItems = this.$refs.right.getElementsByClassName(
        "right-item-hook"
      );
      let el = rightItems[index];
      // scrollToElement()//滚动到指定的目标元素
      this.rights.scrollToElement(el);
      // 左边联动
      let leftItems = this.$refs.left.getElementsByTagName("li");
      let elLi = leftItems[index];
      this.lefts.scrollToElement(elLi);
    }
  },
  created() {
    // 收藏
    this.collect = this.$route.query;
    // 500毫米后隐藏loading
    setTimeout(() => {
      this.loadingShow = false;
    }, 500);
    this.$store.state.isShow = false;
    if (this.$route.query) {
      this.getRouterData = this.$route.query;
      this.goods = this.$route.query;
      this.goods.yh = "满99包邮";
      this.goods.num = 1;
      this.imglists[0].img = this.getRouterData.shop_img;
    }
  },
  updated() {
    if (!this.flag) {
      this.$store.commit("collect/add", this.collect);
    }
  },
  destroyed() {
    // this.$store.state.isShow = true;
  },

  // 生命周期函数
  mounted() {
    //页面渲染到浏览器时候
    // 生命周期函数执行代码速度比页面渲染浏览器执行速度快。html代码没有渲染成功？
    // 保证页面代码浏览器正常执行后，在执行当前生命周期函数代码段
    // $nextTick() 让所有DOM执行完后，回调执行方法
    this.$nextTick(() => {
      this._initScroll(); //调用初始化联动效果
      this._getHeight(); //获取右边每一项高度
    });
  },
  components: {
    swiper, //轮播图
    like, //猜你喜欢组件
    loading //加载页面
  },
  // 计算属性
  computed: {
    ...mapState({
      num: state => state.num
    }),
    currentIndex() {
      for (let i = 0; i < this.listHeight.length; i++) {
        let height = this.listHeight[i];
        let height2 = this.listHeight[i + 1];
        // height2不存在时候，或落在height和height2之间时候，直接放回索引值
        if (!height2 || (this.scrollY >= height && this.scrollY < height2)) {
          // 左边联动
          let leftItems = this.$refs.left.getElementsByTagName("li");
          let elLi = leftItems[i];
          this.lefts.scrollToElement(elLi);
          return i;
        }
      }
      // 如果this.listHeight没有值，返回0
      return 0;
    }
  }
};
</script>

<style lang="scss">
.van-icon {
  vertical-align: middle;
}
</style>
<style lang="scss" scoped>
// 头部样式
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
body {
  width: 100%;
}
//导航
.nav {
  z-index: 999;
  height: 1.2rem;
  top: 1.066667rem;
  ul {
    overflow: hidden;
    height: 98%;
    padding: 0 2%;
    // box-shadow: 0 5px 13px rgba(0,0,0,.12);
    li {
      margin-top: 5px;
      margin-bottom: 5px;
      height: 90%;
      background: #f2f2f2;
      width: 25%;
      float: left;
      font-size: 0.34375rem;
      font-weight: bold;
      border: 1px solid #e3e3e3;
      box-sizing: border-box;
      line-height: 1.1rem;
      text-align: center;
      color: #606060;
      &.current {
        color: #ffffff;
        background: #afafaf;
      }
    }
  }
}
.nav2 {
  position: absolute;
  top: 2.266667rem;
  bottom: 50px;
  overflow: hidden;
  width: 100%;
  ul {
    width: 100%;
    li {
      width: 100%;
      // height: 1000px;
      background-color: #e3e3e3;
    }
  }
}
//商品简介
.brief {
  overflow: hidden;
  margin-top: 0.15625rem;
  background-color: #fff;
  height: 2.8125rem;
  padding: 0 0.46875rem;
  h1 {
    height: 1.25rem;
    line-height: 1.25rem;
    font-size: 0.4375rem;
    color: #383838;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  p {
    height: 0.9375rem;
    line-height: 0.9375rem;
    .red {
      color: #d44d44;
      font-size: 0.375rem;
    }
    .right {
      margin-top: 0.078125rem;
      float: right;
      font-size: 0.3125rem;
      color: #7f7f7f;
    }
  }
}
//详细
.detail {
  overflow: hidden;
  background: #fff;
  h2 {
    border-top: 0.15625rem solid #e3e3e3;
    border-bottom: 0.015625rem solid #fafafa;
    color: #666666;
    text-indent: 0.46875rem;
    font-size: 26px;
  }
  img {
    display: block;
    width: 100%;
    min-height: 14.90625rem;
  }
}
</style>