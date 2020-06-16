<template>
  <div>
    <!-- 头部 -->
    <headerconenter></headerconenter>
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="username"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="password"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <van-field
        v-model="password2"
        type="password"
        name="password2"
        label="验证密码"
        placeholder="验证密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { Toast } from "vant";
import headerconenter from "../public/header";
export default {
  data() {
    return {
      username: "",
      password: "",
      password2: ""
    };
  },
  methods: {
    onSubmit() {
      let _this = this;
      this.$axios
        .get("register", {
          params: {
            //传送数据
            username: this.username,
            password: this.password,
            password2: this.password2
          }
        })
        .then(res => {
          if (res.data == "200") {
            Toast({
              message: "注册成功",
              onOpened: function() {
                _this.$router.push("/login");
              }
            });
          } else {
            Toast("注册失败");
          }
        });
    }
  },
  components: {
    headerconenter //头部
  },
  created() {
    this.$store.state.isShow = false;
  },
  // 生命周期钩子，最后销毁函数
  destroyed() {
    // 当组件被销毁时候，修改导航数据
    this.$store.state.isShow = true;
  }
};
</script>

<style lang="scss" scoped>
.van-form {
  margin-top: 0.78125rem;
}
</style>