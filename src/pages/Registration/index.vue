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
            >注册</el-button
          >
        </el-form-item>
        <el-button type="text" @click="goNumberLogin">账号登录</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { reqRegi } from "@/services/api";
import "@/style/loginStyle.css";
import { Message } from "element-ui";
import { serviceAdd } from "@/services/servceAdd";

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
    goPhoneLogin() {
      this.$router.push("/phoneLogin");
    },
    async submitForm() {
      let result = await reqRegi(this.ruleForm);
      if (result.code == 200) {
        Message({
          type: "success",
          message: "注册成功，请登录！",
        });
        this.$router.push("/numberLogin");
      } else {
        Message({
          type: "error",
          message: result.msg,
        });
      }
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
  height: 70vh;
  margin-top: 80px;
}
.card-header-font {
  font-size: 20px;
  font-weight: 500;
  color: #e6a23c;
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