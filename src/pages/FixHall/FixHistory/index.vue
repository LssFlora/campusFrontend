<template>
  <div style="background-color: #eceef2">
    <el-row v-loading="isLoading" element-loading-text="拼命加载中">
      <el-col :span="12" v-for="item in items" :key="item.id">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <el-button
              style="float: left; padding: 3px 0"
              :style="{
                display:
                  !item.endTime && item.status != 3 ? 'inline-block' : 'none',
              }"
              type="text"
              @click="delMyCancle(item.repairOrderNumber)"
              >取消</el-button
            >
            <span style="font-size: 20px; color: #e6a23c">{{
              item.repairType == 0
                ? "门窗维修"
                : item.repairType == 1
                ? "空调电器维修"
                : item.repairType == 2
                ? "下水道维修"
                : item.repairType == 3
                ? "桌椅维修"
                : "其他"
            }}</span>
            &nbsp;
            <el-tag
              type="danger"
              :style="{ display: item.status == 3 ? 'inline-block' : 'none' }"
              >已取消</el-tag
            >
            <el-button
              style="float: right; padding: 3px 0"
              type="text"
              @click="delMyFix(item.repairOrderNumber)"
              >删除</el-button
            >
          </div>
          <div class="text item">
            事故原因：{{ !item.faultCause ? "未填写" : item.faultCause }}
          </div>
          <div class="text item">维修地点：{{ item.address }}</div>
          <div class="text item">联系电话：{{ item.phoneNumber }}</div>
          <div class="text item">
            开始时间：{{ item.createTime.replace("T", " ") }}
          </div>
          <div class="text item">
            结束时间：{{
              item.status == 3
                ? "已取消"
                : item.endTime == null
                ? "未结束"
                : item.endTime
            }}
          </div>
        </el-card></el-col
      >
    </el-row>
  </div>
</template>

<script>
import { reqFixedInfo, reqDelFix, reqCancleFix } from "@/services/api";
import { Message } from "element-ui";

export default {
  data() {
    return {
      items: [],
      isLoading: true,
    };
  },
  methods: {
    async getFixdInfo() {
      let result = await reqFixedInfo();
      if (result.code == 200) {
        this.items = result.data || [];
        this.isLoading = false;
      } else {
      }
    },
    async delMyFix(number) {
      let result = await reqDelFix(number);
      if (result.code == 200) {
        Message({
          type: "success",
          message: "删除成功",
        });
        this.getFixdInfo();
      } else {
        Message({
          type: "error",
          message: result.msg,
        });
      }
    },
    async delMyCancle(number) {
      let result = await reqCancleFix(number);
      if (result.code == 200) {
        Message({
          type: "success",
          message: "取消成功",
        });
        this.getFixdInfo();
      } else {
        Message({
          type: "error",
          message: result.msg,
        });
      }
    },
  },
  mounted() {
    this.getFixdInfo();
  },
};
</script>

<style  scoped>
.box-card {
  width: 480px;
  display: inline-block;
  margin: 10px;
}
</style>