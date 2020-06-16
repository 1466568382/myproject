<template>
  <div>
    <van-sticky>
      <div class="header">
        <span @click="orderpay">
          <i class="iconfont icon-fanhui goback"></i>返回
        </span>
        {{$route.name}}
      </div>
      <!-- 地址 -->
      <van-contact-card type="edit" :name="name" :tel="tel" @click="add" />
    </van-sticky>
    <!-- 商品列表 -->
    <div class="content" v-for="(item,index) in lists" :key="index">
      <img class="img" :src="item.shop_img" alt />
      <div class="right">
        <p class="title">{{item.shop_name}}</p>
        <!-- <p class="brief">（净化空气  守护健康）畅呼吸 限时大促</p> -->
        <p class="price">
          <span class="red">￥{{item.shop_price}}.00</span>
          x{{item.num}}
        </p>
      </div>
    </div>
    <!-- 优惠券单元格 -->
    <van-coupon-cell :coupons="coupons" :chosen-coupon="chosenCoupon" @click="showList = true" />
    <!-- 优惠券列表 -->
    <van-popup v-model="showList" round position="bottom" style="height: 90%; padding-top: 4px;">
      <van-coupon-list
        :coupons="coupons"
        :chosen-coupon="chosenCoupon"
        :disabled-coupons="disabledCoupons"
        @change="onChange"
        @exchange="onExchange"
      />
    </van-popup>
    <!-- 提交订单 -->
    <van-submit-bar :price="sum * 100" button-text="提交订单" @submit="onsubmit" />
  </div>
</template>

<script>
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
      name: "",
      tel: "",
      totals: 0,
      //订单参数
      chosenCoupon: -1,
      coupons: [coupon],
      disabledCoupons: [coupon],
      showList: false
    };
  },
  methods: {
    onChange(index) {
      this.showList = false;
      this.chosenCoupon = index;
    },
    onExchange() {
      this.coupons.push(coupon);
    },
    add() {
      this.$router.push("/address");
    },
    onsubmit() {
      //保存订单数据

      // this.lists[0].price=parseInt(this.lists[0].price)-this.coupons[this.chosenCoupon].valueDesc;

      let order = {
        orderId: new Date().getTime(), //订单号
        address: this.address,
        goodsList: this.lists,
        type: 2 //已支付
      };
      this.$store.commit("indentList/add", order);
      //清除购物车数据
      this.$store.state.shop.lists = [];
      this.$store.state.shop.num = 0;
      this.$router.push("/indentList/indentAll");
    },
    // 未支付处理
    orderpay() {
      // 未支付订单处理
      let order = {
        orderId: new Date().getTime(), //1584064700947验证
        address: this.address,
        goodsList: this.lists,
        type: 1 //未支付
      };
      this.$store.commit("indentList/add", order);
      //清除购物车数据
      this.$store.state.shop.lists = [];
      this.$store.state.shop.num = 0;

      // 跳转路由
      this.$router.push("/shop");
    }
  },
  created() {
    //显示的是默认的地址信息
    let defaultId = this.$store.state.address.defaultId; //获取默认的id
    let data = this.$store.state.address.lists; //获取公共的数组
    // .find() 返回满足条件的数组的对象
    //解构里面的函数
    this.address = data.find(item => item.id == defaultId); //返回id等于默认id的数组
    this.name = this.address.name;
    this.tel = this.address.tel;
    this.lists = this.$store.state.shop.lists;
    this.$store.state.isShow = false;
  },
  destroyed() {
    // this.$store.state.isShow = true;
  },
  computed: {
    // 总价格计算
    sum() {
      // 总价格计算
      // reduce()返回计算总价格
      // total 总价格累加
      // item 数据中对象
      return this.lists.reduce((total, item) => {
        // 判断选项
        if (!item.isSelect) return total; //false不让计算总价格
        if (this.chosenCoupon != -1) {
          return (
            total +
            parseInt(item.shop_price) * parseInt(item.num) -
            this.coupons[this.chosenCoupon].valueDesc
           
          ); //总价格
        } else {
          
          return total + parseInt(item.shop_price) * parseInt(item.num) //总价格
        }
      }, 0); //总价格默认参数值为0
    }
  }
};
</script>

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

.content {
  overflow: hidden;
  border-bottom: 1px solid #f9f9f9;
  .img {
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
    .title {
      font-weight: bold;
    }
    .brief {
      color: #7f7f7f;
      font-size: 0.1875rem;
      margin-top: 0.3125rem;
    }
    .price {
      margin-top: 0.78125rem;
      font-weight: bold;
      color: #999999;
      .red {
        color: #d44d44;
        font-weight: bold;
        margin-right: 0.78125rem;
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
</style>