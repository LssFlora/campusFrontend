<template>
  <div>
    <el-row :gutter="24">
      <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11"
        ><div class="grid-content bg-purple-light">
          <el-card class="box-card">
            <el-page-header
              @back="goBack"
              :style="{ display: isBackShow }"
              style="margin-bottom: 10px"
              content="新建地址"
            >
            </el-page-header>
            <el-form
              status-icon
              ref="ruleForm"
              label-width="100px"
              class="demo-ruleForm"
            >
              <el-form-item label="联系人" prop="user">
                <el-input
                  type="text"
                  autocomplete="off"
                  v-model="addressForm.liaisonMan"
                ></el-input>
              </el-form-item>
              <el-form-item label="手机号码" prop="phone">
                <el-input
                  type="text"
                  autocomplete="off"
                  v-model="addressForm.phoneNumber"
                ></el-input>
              </el-form-item>
              <el-form-item label="详细地址" prop="detailAdd">
                <el-input
                  type="text"
                  autocomplete="off"
                  v-model="addressForm.address"
                ></el-input>
              </el-form-item>
              <el-form-item label="性别" prop="user">
                <el-radio-group v-model="addressForm.sex">
                  <el-radio :label="0">男</el-radio>
                  <el-radio :label="1">女</el-radio>
                  <el-radio :label="2">其他</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item
                label="设为默认地址？"
                prop="detailAdd"
                label-width="110px"
              >
                <el-switch
                  style="display: block"
                  v-model="addressForm.status"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  active-text="是"
                  inactive-text="否"
                >
                </el-switch>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="putNewAdd">保存</el-button>
              </el-form-item>
            </el-form>
          </el-card>
        </div></el-col
      >
    </el-row>
  </div>
</template>

<script>
import { reqNewAddress } from "@/services/api";
import { Message } from "element-ui";

export default {
  data() {
    return {
      addressForm: {
        address: "",
        liaisonMan: "",
        phoneNumber: "",
        sex: 0,
        status: "",
      },
      isBackShow: "",
    };
  },
  methods: {
    async putNewAdd() {
      this.addressForm = {
        ...this.addressForm,
        status: !this.addressForm.status ? 1 : 0,
      };
      let result = await reqNewAddress(this.addressForm);
      if (result.code == 200) {
        Message({
          type: "success",
          message: "创建成功",
        });
        this.$router.push("/personal/existAddress");
      } else {
        Message({
          type: "error",
          message: result.msg,
        });
      }
    },
    goBack() {
      // this.$router.go(-1);
      this.$router.back();
    },
  },
};
</script>

<style  scoped>
.el-row {
  margin-bottom: 20px;
}
.el-col {
  border-radius: 4px;
}

.bg-purple {
  background: #d3dce6;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
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
}
</style>