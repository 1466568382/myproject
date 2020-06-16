<template>
  <div>
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
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
    <div style="margin: 16px;">
      <van-button round block type="danger" @click.stop="$router.push('/register')">没有账号,立即账号</van-button>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import headerconenter from "../public/header";
export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    onSubmit() {
      // 请求登陆接口
      let _this = this;
      let path = "/personal";
      if ("path" in _this.$route.query) {
        //判断有没有传值过来
        path = _this.$route.query.path;
      }
      this.$axios
        .get("login", {
          params: {
            username: this.username,
            password: this.password
          }
        })
        .then(res => {
          console.log(res.data);

          if (res.data == "200") {
            Toast({
              message: "登录成功",
              onOpened: function() {
                _this.$store.state.username = _this.username;
                _this.$router.push(path);
              }
            });
          } else {
            Toast("登陆失败");
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