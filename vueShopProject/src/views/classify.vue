<template>
  <div>
    <div class="classify">
      <!-- 搜索框 -->
      <router-link to="/search" tag="div" class="search">
        <div class="content">
          <div class="csearch">
            <i class="searchIcon"></i>
            <div class="text">请输入搜索关键字</div>
          </div>
        </div>
      </router-link>
      <!-- 分类 -->
      <van-tree-select height="100%" :items="items" :main-active-index.sync="active" ref="right">
        <template slot="content">
          <template></template>
          <div v-for="(item, index) in classifyList" :key="index">
            <div v-if="active === index">
              <div class="mycontent" v-for="(val, i) in item" :key="i">
                <h1>{{val.className}}</h1>
                <ul>
                  <li v-for="(value, idx) in val.goodsList" :key="idx" @click="goProductList(value.classId)">
                    <img class="img" v-lazy="value.img" alt />
                    <div class="text">{{value.name}}</div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </template>
      </van-tree-select>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      items: [
        { text: "手机数码" },
        { text: "汽车用品" },
        { text: "鞋包服饰" },
        { text: "宠物生活" },
        { text: "家用电器" },
        { text: "电脑办公" }
      ],
      classifyList: []
    };
  },
  methods: {
    goProductList(id) {
      this.$router.push({path:"./productList",query:{id}});
    }
  },
  created() {
    this.$store.state.isShow = true;
    // var centerListData = JSON.parse(
    //   window.localStorage.getItem("centerListData")
    // );
    // if (centerListData && centerListData.expires > Date.now()) {
    //   this.centerGoodlist = centerListData.data;
    // } else {
    this.$axios
      .get("classify")
      .then(result => {
        console.log(result);
        this.classifyList = result.data.result;
        // if (result.data.code == 200) {
        //   window.localStorage.setItem(
        //     "centerListData",
        //     JSON.stringify({
        //       expires: Date.now() + 10 * 60 * 1000,
        //       data: result.data.result
        //     })
        //   );
        //   this.centerGoodlist = result.data.result;
        // }
      })
      .catch(err => {
        console.log(err);
      });
    // }
  }
};
</script>

<style lang="scss">
.van-sidebar-item {
  background-color: #ffffff;
}
.van-tree-select__nav {
  min-height: 7.8125rem;
  flex: 2;
  border: 1px solid #efefef;
  text-align: center;
  background: #ffffff;
  font-size: 0.34375rem;
}
.van-tree-select__content {
  min-height: 7.8125rem;
  flex: 8;
  border: 1px solid #f8f8f8;
}
.van-sidebar-item {
  height: 1.25rem;
  line-height: 0.625rem;
  padding: 0;
  border: 0;
}
.van-sidebar-item__text {
  height: 0.625rem;
  width: 1.875rem;
  margin-top: 0.625rem;
  border-radius: 0.15625rem;
}
.van-sidebar-item__text {
  font-size: 0.3125rem;
  font-weight: bold;
}
.van-sidebar-item--select {
  border: 0;
  background: #fff;
}
.van-sidebar-item--select .van-sidebar-item__text {
  border: 0;
  background: #f6ebea;
  color: #d44d44;
}
//分类内容
.van-tree-select {
  position: fixed;
  top: 1.25rem;
  right: 0;
  bottom: 1.5625rem;
  width: 100%;
  overflow: hidden;
}
//分类右边
.van-tree-select__content::after {
  content: "";
  display: block;
  height: 2.8125rem;
}
</style>
<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
}
//搜索框
.search {
  height: 1.25rem;
  border-bottom: 0.015625rem solid #f1f1f1;
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
//分类
.signboard {
  height: 2.65625rem;
  padding: 0.546875rem 0.3125rem;
  border: 1px solid #f8f8f8;
  .img {
    display: block;
    height: 2.65625rem;
    background-size: 100% 100%;
    border-radius: 0.3125rem;
  }
}
.mycontent {
  padding: 0 0.3125rem;
  margin-bottom: 0.3125rem;
  h1 {
    height: 1.5625rem;
    line-height: 1.5625rem;
    font-size: 0.4375rem;
    color: #333333;
    text-indent: 0.234375rem;
  }
  ul {
    overflow: hidden;
    li {
      width: 31%;
      float: left;
      margin-right: 3.5%;
      .img {
        width: 100%;
        height: 2.65625rem;
        box-sizing: border-box;
        background-size: contain;
        border: 1px solid rgba(0, 0, 0, 0.05);
        background-color: #fcfcfc;
        box-shadow: 0 0.02rem 0.2rem rgba(0, 0, 0, 0.06);
        border-radius: 0.234375rem;
      }
      .text {
        height: 0.625rem;
        line-height: 0.625rem;
        text-align: center;
        font-size: 0.28125rem;
        color: #333333;
      }
      &:nth-child(3n) {
        margin-right: 0;
      }
    }
  }
}
</style>