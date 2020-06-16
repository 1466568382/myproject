import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);


import shop from "./shop";
import address from "./address";
import indentList from "./indentList";
import collect from "./collect";
export default new Vuex.Store({
  state: {
    isShow:true,
    username:"",//用户信息
    bedFalg:true
  },
  mutations: {},
  actions: {},
  modules: {
    shop,//购物车
    address,//我地址
    indentList,//订单
    collect,//收藏
  }
});
