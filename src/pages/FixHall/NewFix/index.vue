<template>
  <div>
    <el-card class="box-card">
      <el-form ref="form" label-width="250px">
        <el-form-item label="保修类型" style="margin: 15px auto">
          <el-col :span="11">
            <el-select
              placeholder="请选择保修类型"
              v-model="newFixForm.repairType"
            >
              <el-option label="门窗维修" value="0"></el-option>
              <el-option label="空调电器维修" value="1"></el-option>
              <el-option label="下水道维修" value="2"></el-option>
              <el-option label="桌椅维修" value="3"></el-option>
              <el-option label="其他" value="4"></el-option>
            </el-select>
          </el-col>
        </el-form-item>

        <el-form-item label="保修地点" style="margin: 15px auto">
          <el-col :span="11">
            <el-input
              placeholder="请输入保修地点（精确到门牌号）"
              v-model="newFixForm.address"
            ></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="联系方式" style="margin: 15px auto">
          <el-col :span="11">
            <el-input
              placeholder="请输入联系方式"
              v-model="newFixForm.phoneNumber"
            ></el-input>
          </el-col>
        </el-form-item>
        <el-form-item style="margin: 15px auto">
          <el-col :span="11">
            <el-button type="primary" @click="submit">立即创建</el-button>
            <el-button>取消</el-button>
          </el-col>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { reqNewFix } from "@/services/api";
import { Message } from "element-ui";

export default {
  data() {
    return {
      newFixForm: {
        address: "",
        phoneNumber: "",
        repairType: "",
        userName: "",
      },
    };
  },
  computed: {
    userInfo() {
      return this.$store.state.user.userInfo;
    },
  },
  methods: {
    async submit() {
      this.newFixForm;
      let result = await reqNewFix({
        ...this.newFixForm,
        userName: this.userInfo.userName,
      });
      if (result.code == 200) {
        Message({
          type: "success",
          message: "创建成功",
        });
        this.$router.push("/fixHall/fixHistory");
      } else {
        Message({
          type: "error",
          message: result.msg,
        });
      }
    },
  },
};
</script>

<style  scoped>
.box-card {
  width: 800px;
  display: inline-block;
  margin: 10px;
}
</style>