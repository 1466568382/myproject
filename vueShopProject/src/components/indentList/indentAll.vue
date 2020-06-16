<template>
  <div>
    <!-- 订单遍历 -->
    <div v-for="(item, index) in lists" :key="index">
      <van-panel :title="'订单：'+item.orderId" :status="typeList[item.type]">
        <div class="content" v-for="(value, key) in item.goodsList" :key="key">
          <!-- <div class="img"></div> -->
          <img class="img" :src="value.shop_img" alt />
          <div class="right">
            <p class="title">{{value.shop_name}}</p>
            <!-- <p class="brief">（净化空气 守护健康）畅呼吸 限时大促</p> -->
            <p class="price">
              <span class="red">￥{{value.shop_price}}.00</span>
              x{{value.num}}
            </p>
          </div>
        </div>

        <!-- 待支付 -->
        <div v-if="item.type == 1" slot="footer" class="van-panel-footer">
          <van-button size="small" type="danger" @click="del(index)">删除订单</van-button>
          <van-button size="small" type="primary" @click="onPay(item.orderId)">支付订单</van-button>
        </div>
        <!-- 待收货 -->
        <div v-else-if="item.type == 2" slot="footer" class="van-panel-footer">
          <van-button size="small">退款申请</van-button>
          <van-button size="small" @click="onGoods(item.orderId)">已收货</van-button>
        </div>
        <!-- 评价商品 -->
        <div v-else-if="item.type == 3" slot="footer" class="van-panel-footer">
          <van-button size="small">商品评价</van-button>
        </div>
      </van-panel>
    </div>
    <!-- 没有订单时显示 -->
    <div v-show="lists.length==0">
        <noIndent></noIndent>
    </div>
  </div>
</template>

<script>
import noIndent from '../personal/noIndent';
export default {
  data() {
    return {
      lists: [],
      typeList: [] //订单状态
    };
  },
  methods: {
    del(index) {
      console.log(index);
      console.log(this.lists);

      this.lists.splice(index, 1);
    },
    onPay(orderId) {
      let index = this.lists.findIndex(item => item.orderId == orderId);
      this.lists[index].type = 2; //切换支付后待收货。调用支付接口
    },
    onGoods(orderId) {
      let index = this.lists.findIndex(item => item.orderId == orderId);
      this.lists[index].type = 3; //切换待收货改已完成。
    }
  },
  components:{
    noIndent
  },
  created() {
    this.lists = this.$store.state.indentList.lists;
    this.typeList = this.$store.state.indentList.typeList;
  },
  beforeDestroy() {
    if (this.lists.length) {
      this.$store.commit("indentList/edit", this.lists);
    }
  }
};
</script>
<style lang="scss">
.van-cell__title {
  font-size: 12px;
}
</style>
<style lang="scss" scoped>
.content {
  overflow: hidden;
  border-bottom: 1px solid #f9f9f9;
  .img {
    margin-top: 0.375rem;
    margin-left: 0.46875rem;
    float: left;
    width: 30%;
    height: 2.8125rem;
    background: url("../../assets/shop/sp1.webp") no-repeat center center;
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
.van-panel-footer {
  text-align: right;
}
</style>