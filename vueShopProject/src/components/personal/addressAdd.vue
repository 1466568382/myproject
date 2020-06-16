<template>
  <div>
    <!-- 头部 -->
    <headerconenter></headerconenter>
    <van-address-edit
      :area-list="areaList"
      show-search-result
      :search-result="searchResult"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
    />
  </div>
</template>

<script>
import areaList from "./erea";
import headerconenter from "../public/header";
export default {
  data() {
    return {
      areaList,
      searchResult: []
    };
  },
  methods: {
    onSave({ name, tel, province, city, county, addressDetail, areaCode }) {
      this.$store.commit("address/add", {
        //把数据传到commit里面处理(添加数据)
        name,
        tel,
        province,
        city,
        county,
        addressDetail,
        address: province + city + county + addressDetail,
        areaCode
      });
      this.$router.go(-1); //回到上一级列表页
    }
  },
  components: {
    headerconenter //头部
  },
  created() {
    this.$store.state.isShow = false;
  },
  destroyed() {
    this.$store.state.isShow = true;
  }
};
</script>

<style lang="scss" scoped>

</style>