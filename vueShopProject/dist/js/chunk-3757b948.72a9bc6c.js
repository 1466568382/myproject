(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3757b948"],{8220:function(t,i,s){"use strict";var n=s("b561"),a=s.n(n);a.a},b561:function(t,i,s){},df78:function(t,i,s){"use strict";s.r(i);var n=function(){var t=this,i=t.$createElement,s=t._self._c||i;return s("div",[s("div",{staticClass:"header"},[t._v(t._s(t.$route.name))]),s("div",{staticClass:"content"},[s("div",{staticClass:"login"},[t.$store.state.username?s("div",{staticClass:"head"},[t._v(" "+t._s(t.$store.state.username)+" "),s("i",{staticClass:"user"}),s("span",{on:{click:function(i){t.$store.state.username=""}}},[t._v("退出")])]):s("div",{staticClass:"head",on:{click:function(i){return t.$router.push("/login")}}},[t._v(" 登录/注册 "),s("i",{staticClass:"user"}),s("i",{staticClass:"right"},[s("van-icon",{attrs:{name:"arrow"}})],1)]),s("div",{staticClass:"nav"},[s("ul",[s("li",{on:{click:function(i){return t.goRouter("/indentList/indentAll")}}},[s("div",{staticClass:"img"}),s("p",[t._v("全部订单")])]),s("li",{on:{click:function(i){return t.goRouter("/indentList/indentAll?id=2")}}},[s("div",{staticClass:"img"}),s("p",[t._v("待付款")])]),s("li",{on:{click:function(i){return t.goRouter("/indentList/indentAll?id=3")}}},[s("div",{staticClass:"img"}),s("p",[t._v("待收货")])]),s("li",{on:{click:function(i){return t.goRouter("/indentList/indentAll?id=4")}}},[s("div",{staticClass:"img"}),s("p",[t._v("已完成")])])])])]),s("div",{staticClass:"item"},[s("ul",[s("li",{on:{click:function(i){return t.goRouter("/address")}}},[t._v(" 地址管理 "),s("i",{staticClass:"right"},[s("van-icon",{attrs:{name:"arrow"}})],1)])])]),s("div",{staticClass:"item"},[s("ul",[s("li",{on:{click:function(i){return t.goRouter("/collect")}}},[t._v(" 我的收藏 "),s("i",{staticClass:"right"},[s("van-icon",{attrs:{name:"arrow"}})],1)])])]),s("div",{staticClass:"item"},[s("ul",[s("li",{on:{click:function(i){return t.goRouter("/coupon")}}},[t._v(" 我的优惠劵 "),s("i",{staticClass:"right"},[s("van-icon",{attrs:{name:"arrow"}})],1)])])]),s("div",{staticClass:"item"},[s("ul",[s("li",{on:{click:function(i){return t.goRouter("/faq")}}},[t._v(" 常见问题 "),s("i",{staticClass:"right"},[s("van-icon",{attrs:{name:"arrow"}})],1)])])])])])},a=[],e=s("d399"),c={created:function(){this.$store.state.isShow=!0},methods:{goRouter:function(t){this.$store.state.username?this.$router.push(t):Object(e["a"])("请先登录")}}},r=c,o=(s("8220"),s("2877")),l=Object(o["a"])(r,n,a,!1,null,"3e5702bd",null);i["default"]=l.exports}}]);
//# sourceMappingURL=chunk-3757b948.72a9bc6c.js.map