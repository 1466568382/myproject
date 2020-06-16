<template>
  <div>
  <!-- 头部 -->
     <headerconenter></headerconenter>
    <van-address-list
      v-model="chosenAddressId"
      :list="list"
      @add="onAdd"
      @edit="onEdit"
      @select="onSelect"
    />
  </div>
</template>

<script>
import headerconenter from "../public/header";
export default {
  
  data() {
    return {
      chosenAddressId: null, //默认选项 //用来接收公共的默认id
      list: [] //双向绑定必须定义变量来接收公共的变量
    };
  },
  methods: {
    onAdd() {
      //新增地址
      // Toast("新增地址");
      console.log("新增地址");
      this.$router.push("/addressAdd");
    },
    onEdit(item, index) {
      //编辑地址
      // Toast("编辑地址:" + index);
    

      this.$router.push({
        path: "/addressEdit",
        query:{index}
      });
    },
    onSelect(item, index) {
      this.$store.state.address.defaultId = index+1;
      this.$router.go(-1);
    }
  },
    components:{
    headerconenter,//头部
  },
  created() {
    this.list = this.$store.state.address.lists;//获取vuex的数组
    this.chosenAddressId = this.$store.state.address.defaultId;//获取对应默认联系人
    this.$store.state.isShow = false;
  },
  destroyed() {
    this.$store.state.isShow = true;
  }
};
</script>

<style lang="scss" scoped>
.header {
  background-color: #1b1b1b;
  color: #ffffff;
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  font-weight: bold;
  height: 1.066667rem;
  line-height: 1.066667rem;
  width: 100%;
  text-align: center;
  font-size: 0.4rem;
  position: relative;
  span {
    position: absolute;
    top: 50%;
    left: 20px;
    font-weight: normal;
    margin-top: -0.266667rem;
    font-size: 0.25rem;
    width: 1.09375rem;
    height: 0.533333rem;
    line-height: 0.533333rem;
    background: linear-gradient(#2a2a29, #151515);
    box-shadow: inset 0 0.013333rem 0.013333rem hsla(0, 0%, 100%, 0.1),
      inset 0 0 0.013333rem rgba(0, 0, 0, 0.5);
    border-radius: 0.08rem;
  }
}
</style>