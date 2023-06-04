<template>
  <div style="background-color: #eceef2; height: 100%">
    <Header />
    <el-empty
      description="暂无投诉信息"
      :style="{ display: sueInfo == false ? 'inline-block' : 'none' }"
    ></el-empty>
    <el-row v-loading="isLoading" element-loading-text="拼命加载中">
      <el-col :span="12" v-for="item in sueInfo" :key="item.id">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span style="font-size: 20px; color: #e6a23c"
              >投诉内容：{{ item.complaintInformation }}
            </span>
            &nbsp;
            <el-tag
              type="danger"
              :style="{ display: item.status == 3 ? 'inline-block' : 'none' }"
              >已取消</el-tag
            >
            <el-button
              style="float: right; padding: 3px 0"
              type="text"
              @click="delSue(item.id)"
              >删除</el-button
            >
          </div>
          <div class="text item">
            投诉订单内容：{{ item.taskName + " " + item.taskContent }}
          </div>
          <div class="text item">订单号：{{ item.orderNumber }}</div>
          <div class="text item">骑手名称：{{ item.nickNane }}</div>
        </el-card></el-col
      >
    </el-row>
  </div>
</template>

<script>
import { reqSueInfo, reqDelSue } from "@/services/api";
import Header from "../../components/Header";
import { Message } from "element-ui";

export default {
  components: { Header },
  data() {
    return {
      sueInfo: {},
      isLoading: true,
    };
  },
  methods: {
    async getSueInfo() {
      let result = await reqSueInfo();
      if (result.code == 200) {
        this.sueInfo = result.data;
        this.isLoading = false;
      }
    },
    async delSue(id) {
      let result = await reqDelSue(id);
      if (result.code == 200) {
        if (result.code == 200) {
          Message({
            type: "success",
            message: "删除成功",
          });
          this.getSueInfo();
        } else {
          Message({
            type: "error",
            message: result.msg,
          });
        }
      }
    },
  },
  mounted() {
    this.getSueInfo();
  },
};
</script>

<style lang="scss" scoped>
.box-card {
  width: 480px;
  display: inline-block;
  margin: 10px;
}
</style>