<template>
  <div>
  <!-- 头部 -->
     <headerconenter></headerconenter>
    <van-address-edit
      :area-list="areaList"
      show-search-result
      :address-info="addressInfo"
      :search-result="searchResult"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      save-button-text="修改"
    />
  </div>
</template>

<script>
import areaList from './erea';
import headerconenter from "../public/header";
export default {
      data() {
    return {
      areaList,
      searchResult: [],
      addressInfo:{}//用于设置它的初始值
    }
  },
  methods: {
    onSave({name,tel,province,city,county,addressDetail,areaCode}) {
          let id=this.$route.query.index;//修改id
          this.$store.commit('address/edit',{//把数据传到commit里面处理(添加数据)
              id,name,tel,province,city,county,addressDetail,
              address: province+city+county+addressDetail,
              areaCode
          })
          this.$router.go(-1);//回到上一级列表页
    },
  },
  
  components:{
    headerconenter,//头部
  },
  created() {
     let id=this.$route.query.index;
     this.addressInfo=this.$store.state.address.lists[id];
    this.$store.state.isShow = false;
  },
  destroyed() {
    this.$store.state.isShow = true;
  }
};
</script>

<style lang="scss" scoped>

</style>