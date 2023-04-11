<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="12" :offset="6"
        ><div class="grid-content">
          <el-card
            shadow="always"
            class="addressCard"
            :body-style="{ padding: '0px', height: '110px' }"
          >
            <i class="el-icon-s-promotion addressIcon" style="float: left"></i>
            <div class="addressMain">
              <el-row :gutter="20">
                <el-col :span="4"
                  ><div class="grid-content" style="font-weight: 700">
                    猫
                  </div></el-col
                >
                <el-col :span="4"
                  ><div class="grid-content">16548758361</div></el-col
                >
              </el-row>
              <el-row>
                <el-col :span="24"
                  ><div class="grid-content">
                    四川省成都市双流区学府路1段24号
                  </div></el-col
                >
              </el-row>
            </div>
            <i class="el-icon-s-tools addressIcon" style="float: right"></i>
          </el-card></div
      ></el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12" :offset="6"
        ><div class="grid-content">
          <el-card
            shadow="always"
            class="addressCard"
            :body-style="{ padding: '0px', height: '110px' }"
          >
            <i class="el-icon-s-promotion addressIcon" style="float: left"></i>
            <div class="addressMain">
              <el-row :gutter="20">
                <el-col :span="4"
                  ><div class="grid-content" style="font-weight: 700">
                    猫
                  </div></el-col
                >
                <el-col :span="4"
                  ><div class="grid-content">16548758361</div></el-col
                >
              </el-row>
              <el-row>
                <el-col :span="24"
                  ><div class="grid-content">
                    四川省成都市双流区学府路1段24号
                  </div></el-col
                >
              </el-row>
            </div>
            <i class="el-icon-s-tools addressIcon" style="float: right"></i>
          </el-card></div
      ></el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12" :offset="6"
        ><div class="grid-content">
          <el-card
            shadow="always"
            class="addressCard"
            :body-style="{ padding: '0px', height: '110px' }"
          >
            <i class="el-icon-s-promotion addressIcon" style="float: left"></i>
            <div class="addressMain">
              <el-row :gutter="20">
                <el-col :span="4"
                  ><div class="grid-content" style="font-weight: 700">
                    猫
                  </div></el-col
                >
                <el-col :span="4"
                  ><div class="grid-content">16548758361</div></el-col
                >
              </el-row>
              <el-row>
                <el-col :span="24"
                  ><div class="grid-content">
                    四川省成都市双流区学府路1段24号
                  </div></el-col
                >
              </el-row>
            </div>
            <i class="el-icon-s-tools addressIcon" style="float: right"></i>
          </el-card></div
      ></el-col>
    </el-row>
    <el-row>
      <el-col :span="24"
        ><div class="grid-content">
          <el-button type="primary" @click="goNewAddress">添加地址</el-button>
        </div></el-col
      >
    </el-row>
  </div>
</template>

<script>
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
        pass: "",
        checkPass: "",
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
    goNewAddress() {
      this.$router.push("/personal/newAddress");
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
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style  scoped>
.el-row {
  margin-bottom: 5px;
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
addressCard {
  display: flex;
}
.addressIcon {
  flex: 1 1 5%;
  font-size: 30px;
  line-height: 110px;
  color: #e6a23c;
  margin: 0 10px;
}
.addressMain {
  display: inline-block;
  width: 70%;
  height: 100%;
  flex: 1 1 70%;
  padding: 20px;
}
</style>