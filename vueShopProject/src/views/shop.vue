<template>
  <div>
    <!--头部 -->
    <div class="header">
      {{$route.name}}
      <span v-show="lists.length != 0" @click="edit" ref="edit">编辑</span>
    </div>
    <!-- 购物车内容 -->
    <div class="content">
      <h1 v-show="lists.length == 0">
        <div class="stroll">
          <div class="img"></div>
          <h2>购物车暂无商品</h2>
          <p>添加到购物车的商品将会显示在这里</p>
          <div class="btn">
            <div class="login" v-if="$store.state.username==''" @click="$router.push('/login')" >登录</div>
            <div :class="{'shop':true, 'shopAlign':$store.state.username!=''}" @click="$router.push('/home')">现在就购物</div>
          </div>
        </div>
      </h1>
      <ul>
        <li v-for="(item, index) in lists" :key="index">
          <div class="checkbox">
            <div class="checkboxselect" @click="inputselect(index)">
              <van-icon name="success" v-show="item.isSelect" />
            </div>
          </div>
          <img class="img" v-lazy="item.shop_img" alt="">
          <div class="right">
            <p class="yh">{{item.yh}}</p>
            <p class="title">{{item.shop_name}}</p>
            <p class="color">{{item.color}}</p>
            <p class="price" v-show="flag">
              <span class="red">￥{{item.shop_price}}.00</span>
              &nbsp;&nbsp;x&nbsp;&nbsp;{{item.num}}
              <del>￥{{item.old_price}}.00</del>
            </p>
            <p class="handel" v-show="!flag">
              <van-stepper  input-width="30px" button-size="20px" v-model="item.num"  @input="editNum"/>
              <van-button size="mini" class="delbutton" @click="del(index)">删除</van-button>
            </p>
          </div>
        </li>
      </ul>
    </div>
    <!-- 猜你喜欢 -->
    <div v-show="lists.length != 0">
      <like></like>
    </div>
    <!-- 提交订单 -->
    <van-submit-bar
      v-show="lists.length != 0"
      :price="totals * 100"
      button-text="提交订单"
      @submit="onsubmit"
    >
      <van-checkbox @click="checkAll" :value="checked">全选</van-checkbox>
    </van-submit-bar>
    <div style="height:1.333333rem;"></div>
  </div>
</template>

<script>
import like from "../components/public/like";
export default {
  data() {
    return {
      flag: true,
      lists: [], //保存 获取vuex的数据 在页面显示 处理
      totals: 0, //总价格
      checked: true //默认全选
    };
  },
  components:{
    like,
  },
  methods: {
    editNum(){
      this.sum();
    },
    onsubmit() {
      // $router.push('/order')
      // 判断有没有登录
      if (this.$store.state.username) {
        this.$router.push("/order");
      } else {
        this.$router.push({
          path: "/login",
          query: {
            path: "/order"
          }
        });
      }
    },
    // 编辑
    edit() {
      this.flag = !this.flag;

      this.flag
        ? (this.$refs.edit.innerHTML = "编辑")
        : (this.$refs.edit.innerHTML = "完成");
    },
    // 删除
    del(index) {
      this.lists.splice(index, 1);
    },
    checkAll() {
      //全选和反选
      this.lists.forEach(data => {
        data.isSelect = !this.checked;
      });
      this.checked = !this.checked;
    },
    checkboxclick() {
      //如果复选框 商品全部选中就是 全选就选 否则反之
      //第一次页面加载过程中，判断数据中isSelet状态，如果全部为true，那么返回true
      this.checked = this.lists.every(item => {
        return item.isSelect; //只有选项中全部为true，返回true。只要有一个false，返回false
      });
    },
    inputselect(index) {
      
      //点击选框 选中它相反的类型
      // 修改商品列表数据
      this.lists[index].isSelect = !this.lists[index].isSelect;
      this.checkboxclick(); //点击的触发一次是否 显示全选按钮
      this.sum(); //点击选项的时候计算一次总价
    },
    sum() {
      //计算总价
      this.totals = this.lists.reduce((total, item) => {
        //如果是false 就返回总价 继续下一轮 添加
        if (!item.isSelect) return total;
        return total + parseInt(item.shop_price) * parseInt(item.num);
      }, 0); //默认值总价
    }
  },
  created() {
    //创建的时候获取一次 vuex的数据
    this.lists = this.$store.state.shop.lists;
    this.sum(); //计算一次价格
    this.checkboxclick(); //判断是否全选
    this.$store.state.isShow = true;
  },
  watch: {
    lists:function(val){
        if(val==""){
          this.$store.state.shop.num=0;
          
        }
    }
  },
  beforeUpdate() {
    //数据更新也触发一次计算   一个是添加购物车是触发的
    this.sum();
  }
};
</script>

<style lang="scss" scoped>
.van-submit-bar {
  bottom: 1.333333rem;
}
.van-button--danger {
  background-color: #5b81df;
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
  span {
    position: absolute;
    top: 50%;
    right: 20px;
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
}
.content {
  overflow: hidden;
  margin-top: 1.066667rem;
  background: #e3e3e3;
  ul {
    margin-bottom: 0.3125rem;
    li {
      overflow: hidden;
      margin-top: 0.3125rem;
      height: 3.59375rem;
      background-color: #fff;
      position: relative;
      .checkbox {
        position: absolute;
        top: 50%;
        left: 0.375rem;
        margin-top: -0.3125rem;
        .van-icon {
          width: 0.625rem;
          height: 0.625rem;
        }
      }
      .img {
        display: block;
        margin-top: 0.375rem;
        margin-left: 10%;
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
        width: 55%;
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
        .color {
          margin-top: 0.15625rem;
          color: #7f7f7f;
        }
        .price {
          margin-top: 0.234375rem;
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
  }
}
// 喜欢
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
  .likecontent {
    margin-top: 0.15625rem;
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
              font-size: 0.266667rem;
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
}
//编辑
.handel {
  height: 30px;
  line-height: 30px;
  overflow: hidden;
  .van-stepper {
    float: left;
    margin-right: 0.78125rem;
    display: block;
  }
  .van-button--small {
    display: block;
    float: left;

  }
  .van-button__text {
    display: inline-block;
  }
}
//复选框
.checkboxselect {
  position: absolute;
  top: 50%;
  left: 6px;
  margin-top: -10px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid #c8c9cc;
  i {
    display: block;
    width: 20px !important;
    height: 20px !important;
    background: #1989fa;
    border-radius: 50%;
    text-align: center;
    line-height: 22px;
    font-size: 16px;
    color: #fff;
  }
}
//没登录状态
.stroll {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #e3e3e3;
  text-align: center;
  .img {
    overflow: hidden;
    width: 3.125rem;
    height: 3.125rem;
    margin:2.8125rem auto 0;
    background: url("../assets/shop/shop.png") no-repeat center center;
    background-size: contain;
  }
  h2 {
    margin-top: 0.3125rem;
    color: #c9c9c9;
    font-size: 0.546875rem;
    margin-bottom: 0;
  }
  p {
    margin: 0;
    font-size: 0.3125rem;
    color: #c9c9c9;
    font-weight: normal;
  }
  .btn {
    width: 6.71875rem;
    margin: .46875rem auto;
    height: 0.9375rem;
    .login {
      float: left;
      width: 3.125rem;
      height: 0.9375rem;
      color: #ffffff;
      font-size: 0.375rem;
      line-height: 0.9375rem;
      box-shadow: inset 0 -1px 1px rgba(2, 1, 1, 0.2),
        0 0 1px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.2);
      background: #5e8bdd;
      background: linear-gradient(#6f94e8, #5178df);
      border-radius: .09375rem;
      text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.15);
    }
    .shop{
      float: right;
      margin: 0 auto;
      width: 3.125rem;
      height: 0.9375rem;
      color: #5e5e5e;
      font-size: 0.375rem;
      line-height: 0.9375rem;
      box-shadow: inset 0 -1px 1px rgba(2, 1, 1, 0.2),
        0 0 1px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.2);
      border-radius: .09375rem;
      text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.15);
    }
    .shopAlign{
      float: none;
    }
  }
}
</style>