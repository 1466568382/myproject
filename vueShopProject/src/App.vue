<template>
  <div>
    <router-view v-if="isRouterAlive"></router-view>
    <div class="bed" v-if="$store.state.bedFalg"></div>
    <van-tabbar
      :route="true"
      v-show="$store.state.isShow"
      v-model="active"
      active-color="#d44d44"
      inactive-color="#9a9a9a"
    >
      <!-- 首页 -->
      <van-tabbar-item to="/home" tag="div" class="van-tabbar-item">
        <span>首页</span>
        <img slot="icon" slot-scope="props" :src="props.active ? icon.active : icon.inactive" />
      </van-tabbar-item>

      <!-- 分类 -->
      <van-tabbar-item to="/classify" tag="div" class="van-tabbar-item">
        <span>分类</span>
        <img slot="icon" slot-scope="props" :src="props.active ? icon.active2 : icon.inactive2" />
      </van-tabbar-item>

      <!-- 购物车 -->
      <van-tabbar-item to="/shop" tag="div" class="van-tabbar-item">
        <span>购物车</span>
        <img slot="icon" slot-scope="props" :src="props.active ? icon.active3 : icon.inactive3" />
      </van-tabbar-item>

      <!-- 个人中心 -->
      <van-tabbar-item to="/personal" tag="div" class="van-tabbar-item">
        <span>个人中心</span>
        <img slot="icon" slot-scope="props" :src="props.active ? icon.active4 : icon.inactive4" />
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      icon: {
        active: require("./assets/img/index1.png"),
        inactive: require("./assets/img/index0.png"),
        active2: require("./assets/img/classify1.png"),
        inactive2: require("./assets/img/classify0.png"),
        active3: require("./assets/img/shop1.png"),
        inactive3: require("./assets/img/shop0.png"),
        active4: require("./assets/img/my1.png"),
        inactive4: require("./assets/img/my0.png")
      },
      isRouterAlive: true
    };
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function() {
        this.isRouterAlive = true;
      });
    }
  },
  provide() {
    return {
      reload: this.reload
    };
  }
};
</script>
<style lang="scss" scoped>
.van-tabbar {
  padding-bottom: 0.3125rem;
  height: 1.25rem;
}
.van-tabbar-item {
  width: 100%;
  span {
    font-weight: bold;
    font-size: 0.21875rem;
  }
  img {
    height: 0.375rem;
    width: 0.375rem;
  }
}
.bed {
  height: 1.5625rem;
}
a {
  display: block;
}
</style>