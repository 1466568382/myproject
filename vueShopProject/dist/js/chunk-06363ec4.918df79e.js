(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-06363ec4"],{"6d5a":function(s,t,a){"use strict";a.r(t);var i=function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("div",[a("van-sticky",[a("div",{staticClass:"header"},[a("span",{on:{click:function(t){return s.$router.go(-1)}}},[a("i",{staticClass:"iconfont icon-fanhui goback"}),s._v("返回 ")]),s._v(" "+s._s(s.$route.name)+" ")])]),s._l(s.classGoodsList,(function(t,i){return a("div",{key:i,staticClass:"content",on:{click:function(a){return s.goDetail(t)}}},[a("img",{directives:[{name:"lazy",rawName:"v-lazy",value:t.shop_img,expression:"item.shop_img"}],staticClass:"img",attrs:{alt:""}}),a("div",{staticClass:"right"},[a("p",{staticClass:"yh"},[s._v("大促")]),a("p",{staticClass:"title"},[s._v(s._s(t.shop_name))]),a("p",{staticClass:"brief"}),a("p",{staticClass:"price"},[a("span",{staticClass:"red"},[s._v("￥"+s._s(t.shop_price)+".00")]),a("del",[s._v("￥"+s._s(t.old_price)+".00")])])])])})),a("p",{staticClass:"load"},[s._v("全部加载完成")])],2)},e=[],o={data:function(){return{classId:"002",classGoodsList:[]}},methods:{goDetail:function(s){console.log(s),this.$router.push({path:"./detail",query:s})}},created:function(){var s=this;this.classId=this.$route.query.id,this.$store.state.isShow=!1,this.$store.state.bedFalg=!1,this.$axios({methods:"GET",url:"classifyList",params:{id:this.classId}}).then((function(t){console.log(t),s.classGoodsList=t.data.result.classifyList})).catch((function(s){console.log(s)}))},destroyed:function(){this.$store.state.bedFalg=!0}},c=o,n=(a("f998"),a("2877")),l=Object(n["a"])(c,i,e,!1,null,"2a972d35",null);t["default"]=l.exports},bb01:function(s,t,a){},f998:function(s,t,a){"use strict";var i=a("bb01"),e=a.n(i);e.a}}]);
//# sourceMappingURL=chunk-06363ec4.918df79e.js.map