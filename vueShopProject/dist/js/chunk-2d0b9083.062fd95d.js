(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0b9083"],{"30e5":function(e,t,s){"use strict";s.r(t);var a=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[s("headerconenter"),s("van-address-edit",{attrs:{"area-list":e.areaList,"show-search-result":"","address-info":e.addressInfo,"search-result":e.searchResult,"area-columns-placeholder":["请选择","请选择","请选择"],"save-button-text":"修改"},on:{save:e.onSave}})],1)},r=[],n=(s("b0c0"),s("2397")),o=s("aa63"),d={data:function(){return{areaList:n["a"],searchResult:[],addressInfo:{}}},methods:{onSave:function(e){var t=e.name,s=e.tel,a=e.province,r=e.city,n=e.county,o=e.addressDetail,d=e.areaCode,i=this.$route.query.index;this.$store.commit("address/edit",{id:i,name:t,tel:s,province:a,city:r,county:n,addressDetail:o,address:a+r+n+o,areaCode:d}),this.$router.go(-1)}},components:{headerconenter:o["a"]},created:function(){var e=this.$route.query.index;this.addressInfo=this.$store.state.address.lists[e],this.$store.state.isShow=!1},destroyed:function(){this.$store.state.isShow=!0}},i=d,c=s("2877"),u=Object(c["a"])(i,a,r,!1,null,"3f109db9",null);t["default"]=u.exports}}]);
//# sourceMappingURL=chunk-2d0b9083.062fd95d.js.map