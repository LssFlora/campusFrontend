<template>
  <div class="container bg">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="card-header-font">手机号登录</span>
      </div>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="手机号" prop="pass">
          <el-input
            type="text"
            v-model="ruleForm.phone"
            autocomplete="off"
            style="width: 80%; float: left"
          ></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="checkPass">
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
        <el-form-item style="margin-top: 36px; margin-bottom: 5px">
          <el-button
            type="primary"
            @click="submitForm('ruleForm')"
            class="loginBtn"
            >登录</el-button
          >
        </el-form-item>
        <el-button type="text" @click="goNumberLogin">账号密码登录</el-button>
        <el-button type="text" @click="goRegistration">去注册</el-button>
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
    goRegistration() {
      this.$router.push("/registration");
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$message("登录成功");
          this.$router.push("/home");
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
  height: 50vh;
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
  float: left;
  margin-left: 3px;
  border-radius: 15px;
}
</style>