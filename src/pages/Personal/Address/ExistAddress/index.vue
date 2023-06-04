<template>
  <div v-loading="isLoading" element-loading-text="拼命加载中">
    <el-row :gutter="20" v-for="(address, index) in addressItem" :key="index">
      <el-col :span="12" :offset="3"
        ><div class="grid-content">
          <el-card
            shadow="always"
            class="addressCard"
            :body-style="{
              padding: '0px',
              height: '110px',
              position: 'relative',
            }"
          >
            <i class="el-icon-s-promotion addressIcon" style="float: left"></i>
            <div class="addressMain">
              <el-row :gutter="20">
                <el-col :span="6"
                  ><div class="grid-content" style="font-weight: 700">
                    {{ address.liaisonMan }}
                  </div></el-col
                >
                <el-col :span="4"
                  ><div class="grid-content">
                    {{ address.phoneNumber }}
                  </div></el-col
                >
              </el-row>
              <el-row>
                <el-col :span="24"
                  ><div class="grid-content">
                    {{ address.address }}
                  </div></el-col
                >
              </el-row>
            </div>
            <div style="display: right; position: absolute; top: 0; right: 0">
              <i
                class="el-icon-edit-outline addressIcon"
                style="float: right"
                @click="goEdit(address)"
              ></i>
              <i
                class="el-icon-s-tools addressIcon"
                style="float: right"
                :style="{
                  display: address.status == 0 ? 'inline-block' : 'none',
                }"
              ></i>
            </div>
          </el-card></div
      ></el-col>
    </el-row>
    <el-row>
      <el-col :span="17"
        ><div class="grid-content">
          <el-button type="primary" @click="goNewAddress">添加地址</el-button>
        </div></el-col
      >
    </el-row>
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible" center>
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
            v-model="selectedAddress.liaisonMan"
          ></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="phone">
          <el-input
            type="text"
            autocomplete="off"
            v-model="selectedAddress.phoneNumber"
          ></el-input>
        </el-form-item>
        <el-form-item label="详细地址" prop="detailAdd">
          <el-input
            type="text"
            autocomplete="off"
            v-model="selectedAddress.address"
          ></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="user">
          <el-radio-group v-model="selectedAddress.sex">
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
            v-model="selectedAddress.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="是"
            inactive-text="否"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="subEditedAdd">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { reqAllAddress, reqEditAddress } from "@/services/api";
import { Message } from "element-ui";

export default {
  data() {
    return {
      addressItem: [],
      isLoading: true,
      dialogFormVisible: false,
      formLabelWidth: "120px",
      addressForm: {
        address: "",
        liaisonMan: "",
        phoneNumber: "",
        sex: 0,
        status: 0,
      },
      selectedAddress: {},
    };
  },
  methods: {
    goNewAddress() {
      this.$router.push("/personal/newAddress");
    },
    async getAllAddress() {
      let result = await reqAllAddress();
      if (result.code == 200) {
        this.addressItem = result.data;
        this.isLoading = false;
      }
    },
    goEdit(address) {
      this.selectedAddress = {
        ...address,
        status: address.status == 0 ? true : false,
      };
      this.dialogFormVisible = true;
    },
    async subEditedAdd() {
      let result = await reqEditAddress({
        ...this.selectedAddress,
        status: this.selectedAddress.status ? 0 : 1,
      });
      if (result.code == 200) {
        Message({
          type: "success",
          message: "修改成功",
        });
        this.getAllAddress();
      } else {
        Message({
          type: "error",
          message: result.msg,
        });
      }
      this.dialogFormVisible = false;
    },
  },
  mounted() {
    this.getAllAddress();
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