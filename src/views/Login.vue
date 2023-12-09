<template>
  <el-form
    class="login-container"
    :model="form"
    :rules="ruels"
    label-width="80px"
    ref="loginForm"
  >
    <h3 class="login_title">系统登录</h3>
    <el-form-item label="用户名" prop="username">
      <el-input v-model="form.username"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="form.password" type="password"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
// import Mock from "mockjs";
import Cookie from "js-cookie";
import { getMenu } from "../api/index";
export default {
  name: "Login",
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      ruels: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    submit() {
      // mock随机数生成token值
      // const token = Mock.Random.guid();

      // 获取数据前,判断表单数据是否合法
      this.$refs.loginForm.validate((valid) => {
        // 如果表单数据合法
        if (valid) {
          // 获取token值
          getMenu(this.form).then(({ data }) => {
            console.log(data);
            // 如果数据请求成功
            if (data.code === 20000) {
              // token值存入cookie，用于不同页面的通信
              Cookie.set("token", data.data.token);
              // 根据用户权限vuex存储菜单数据
              this.$store.commit("setMenu", data.data.menu);
              // 根据用户权限vuex动态注册路由
              this.$store.commit("addMenu", this.$router);
              // 存入token值后,跳转到首页
              this.$router.push("/");
            } else {
              // 数据请求失败,提示登录失败错误弹窗
              this.$message.error(data.data.message);
            }
          });
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.login-container {
  width: 350px;
  border: 1px solid #efefef;
  margin: 10% auto;
  padding: 35px 35px 15px 35px;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 0 25px #cac6c6;
  box-sizing: border-box; //盒子模型
  .login_title {
    text-align: center;
    margin-bottom: 40px;
    color: #505458;
  }
  .el-input {
    width: 198px;
  }
  .el-button {
    margin-left: 25px;
  }
}
</style>