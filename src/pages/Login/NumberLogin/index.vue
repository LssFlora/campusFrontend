<template>
  <div class="container bg">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="card-header-font">账号密码登录</span>
      </div>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="pass" size="small">
          <el-input
            type="text"
            v-model="ruleForm.userName"
            autocomplete="off"
            style="width: 80%; float: left"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass" size="small">
          <el-input
            type="password"
            v-model="ruleForm.password"
            autocomplete="off"
            style="width: 80%; float: left"
          ></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="checkPass" size="small">
          <el-input
            type="text"
            v-model="ruleForm.code"
            autocomplete="off"
            style="width: 50%; float: left"
          ></el-input>
          <el-image
            src="https://campus-help-picture.oss-cn-beijing.aliyuncs.com/Login/Code/clickGetCode.png"
            class="validateBtn"
            fit="cover"
            @click.native="refresh"
            id="codeImg"
          ></el-image>
        </el-form-item>
        <el-form-item style="margin-top: 20px; margin-bottom: 5px">
          <el-button type="primary" @click="submitForm" class="loginBtn"
            >登录</el-button
          >
        </el-form-item>
        <el-button type="text" @click="goPhoneLogin">手机号登录</el-button>
        <el-button type="text" @click="goRegistration">去注册</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import "@/style/loginStyle.css";
import { serviceAdd } from "@/services/servceAdd";
import { Form } from "element-ui";
export default {
  data() {
    var checkCode = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("验证码不能为空"));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("请输入数字值"));
        } else {
          callback();
        }
      }, 1000);
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    var validateUserName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        userName: "",
        code: "",
        codePic: "",
        password: "",
      },
      rules: {
        password: [{ validator: validatePass, trigger: "blur" }],
        userName: [{ validator: validateUserName, trigger: "blur" }],
        code: [{ validator: checkCode, trigger: "blur" }],
      },
      serviceAdd,
    };
  },
  methods: {
    getValidation() {},
    goPhoneLogin() {
      this.$router.push("/phoneLogin");
    },
    goRegistration() {
      this.$router.push("/registration");
    },
    async submitForm() {
      const { userName, password, code } = this.ruleForm;
      try {
        this.$store.dispatch("token","")
        await this.$store.dispatch("login", { userName, password, code });
        if (localStorage.getItem("token")) {
          this.$router.push("/home");
        }
      } catch (error) {}
    },
    refresh() {
      this.ruleForm.userName
        ? (document.getElementById(
            "codeImg"
          ).src = `${serviceAdd}/user/login/getCode/${
            this.ruleForm.userName
          }?time=${new Date().getTime()}`)
        : this.$message("请输入账号密码");
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
  height: 60vh;
  margin-top: 100px;
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
  height: 33px;
  float: left;
  margin-left: 3px;
  border-radius: 15px;
  cursor: pointer;
  /* border: 1px solid red; */
}
</style>