import Vue from "vue";
import Vant from "vant";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// 懒加载
import { Lazyload } from 'vant';
Vue.use(Lazyload, {
  lazyComponent: true,
});

Vue.config.productionTip = false;
//字体图标
import "./assets/font/iconfont.css";
//css默认样式
import "./assets/css/base.css"
//vant ui框架
import 'vant/lib/index.css';
Vue.use(Vant);
// swiper插件
import "swiper/css/swiper.min.css";
// rem布局
import Flexible from "amfe-flexible";
Vue.use(Flexible);
//动画
import "animate.css"
//axios配置
import axios from "axios";
// 路径默认配置
axios.defaults.baseURL = 'http://127.0.0.1:3000/';
Vue.prototype.$axios = axios;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
