import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

//路由
import home from "./home.js";
import classify from "./classify.js";
import shop from "./shop.js";
import personal from "./personal.js";
import search from "./search.js";
import detail from "./detail.js";
import publics from "./publics.js";
import productList from "./productList.js";
import indent from "./indent.js";
const routes = [
  {path:"/",redirect:"/advertising"},
  home,//首页
  classify,//分类
  ...shop,//购物车
  ...personal,//个人中心
  search,//搜索
  detail,//详情页
  ...publics,//公共页面
  productList,//商品列表
  indent,//订单页
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
