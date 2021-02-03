<template>
  <div class="login-wrapper">
    <el-form
      class="login-form radius-4"
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
    >
      <div class="u-center fs-22 mb-30">
        <span>后台管理系统</span>
      </div>
      <el-form-item prop="username">
        <el-input
          type="text"
          placeholder="登录账户"
          v-model.trim="ruleForm.username"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          type="passwordword"
          placeholder="登录密码"
          v-model.trim="ruleForm.password"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item class="mb-0 mt-40">
        <el-button class="u-full" type="primary" @click="submitForm('ruleForm')"
          >提交</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    return {
      ruleForm: {
        password: "manbax",
        username: "manbax"
      },
      rules: {
        password: [{ validator: validatePass, trigger: "blur" }],
        username: [{ required: true, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$store.dispatch("user/login", this.ruleForm).then(() => {
            this.$router.replace(this.$route.query.redirect || "/");
          });
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang="scss" scoped>
.login-wrapper {
  width: 100vw;
  height: 100vh;
}
.login-form {
  position: fixed;
  width: 350px;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  padding: 30px 24px;
  background: #fff;
}
</style>
