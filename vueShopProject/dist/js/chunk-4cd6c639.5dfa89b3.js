(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4cd6c639"],{"8ec1":function(t,e,n){"use strict";var o=n("fdd5"),s=n.n(o);s.a},c8c2:function(t,e,n){"use strict";n.r(e);var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("div",{staticClass:"background"},[n("button",{on:{click:t.goHome}},[t._v("跳过")])])])},s=[],c={data:function(){return{num:3,timer:null}},methods:{goHome:function(){this.$router.push("/home")}},created:function(){var t=this;this.timer=setInterval((function(){0==t.num?t.$router.push("/home"):t.num--}),1e3),this.$store.state.isShow=!1},beforeDestroy:function(){clearInterval(this.timer)},destroyed:function(){this.$store.state.isShow=!0}},i=c,r=(n("8ec1"),n("2877")),u=Object(r["a"])(i,o,s,!1,null,"231650d4",null);e["default"]=u.exports},fdd5:function(t,e,n){}}]);
//# sourceMappingURL=chunk-4cd6c639.5dfa89b3.js.map