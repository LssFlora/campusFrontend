<template>
  <div class="container bg">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="card-header-font">注册新用户</span>
      </div>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="账号名" prop="pass" size="mini">
          <el-input
            type="text"
            v-model="ruleForm.phone"
            autocomplete="off"
            style="width: 80%; float: left"
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="pass" size="mini">
          <el-input
            type="email"
            v-model="ruleForm.phone"
            autocomplete="off"
            style="width: 80%; float: left"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass" size="mini">
          <el-input
            type="password"
            v-model="ruleForm.phone"
            autocomplete="off"
            style="width: 80%; float: left"
          ></el-input>
        </el-form-item>
        <el-form-item label="再次输入密码" prop="pass" size="mini">
          <el-input
            type="password"
            v-model="ruleForm.phone"
            autocomplete="off"
            style="width: 80%; float: left"
          ></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="checkPass" size="mini">
          <el-input
            type="text"
            v-model="ruleForm.validate"
            autocomplete="off"
            style="width: 50%; float: left"
          ></el-input>
          <el-button
            type="primary"
            @click="getValidation('ruleForm')"
            class="validateBtn"
            >发送验证码</el-button
          >
        </el-form-item>
        <el-form-item style="margin-top: 20px; margin-bottom: 5px">
          <el-button
            type="primary"
            @click="submitForm('ruleForm')"
            class="loginBtn"
            >注册</el-button
          >
        </el-form-item>
        <el-button type="text" @click="goNumberLogin">去登录</el-button></el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import "@/style/loginStyle.css";
export default {
  data() {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("年龄不能为空"));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("请输入数字值"));
        } else {
          if (value < 18) {
            callback(new Error("必须年满18岁"));
          } else {
            callback();
          }
        }
      }, 1000);
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        phone: "",
        validate: "",
        age: "",
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        age: [{ validator: checkAge, trigger: "blur" }],
      },
    };
  },
  methods: {
    getValidation() {},
    goNumberLogin() {
      this.$router.push("/numberLogin");
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style scoped>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 480px;
  margin: 0 auto;
  height: 70vh;
  margin-top: 80px;
}
.card-header-font {
  font-size: 20px;
  font-weight: 500;
}
.loginBtn {
  margin-left: -100px;
  width: 220px;
  border-radius: 15px;
}
.validateBtn {
  width: 30%;
  float: left;
  margin-left: 3px;
  border-radius: 15px;
}
</style>