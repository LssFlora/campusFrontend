<template>
  <div>
    <el-menu
      :default-active="selectedMenu"
      style="float: left; width: 20%"
      @select="handleSelect"
    >
      <el-menu-item index="4">
        <i class="el-icon-star-on"></i>
        <span slot="title">进行中</span>
      </el-menu-item>
      <el-menu-item index="5">
        <i class="el-icon-warning"></i>
        <span slot="title">未支付</span>
      </el-menu-item>
      <el-menu-item index="6">
        <i class="el-icon-s-claim"></i>
        <span slot="title">已完成</span>
      </el-menu-item>
      <el-menu-item index="7">
        <i class="el-icon-error"></i>
        <span slot="title">已取消</span>
      </el-menu-item>
    </el-menu>
    <el-card class="box-card">
      <router-view
        :taskType="this.selectedMenu"
        :task="task"
        :isLoading="isLoading"
      ></router-view>
    </el-card>
  </div>
</template>

<script>
import { Message } from "element-ui";
import { reqTaskByStatus } from "@/services/api";
export default {
  data() {
    return {
      selectedMenu: "4",
      task: {},
      isLoading: true,
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      this.isLoading = true;
      this.selectedMenu = key;
      switch (key) {
        case "4":
          this.getTaskByStatus("1,2");
          break;
        case "5":
          this.getTaskByStatus(0);
          break;
        case "6":
          this.getTaskByStatus(3);
          break;
        case "7":
          this.getTaskByStatus(4);
          break;
        default:
          break;
      }
    },
    // 根据状态获取我的发布任务
    async getTaskByStatus(status) {
      let result = await reqTaskByStatus(status);
      if (result.code == 200) {
        this.task = result.data;
        this.isLoading = false;
      } else {
        Message({
          type: "error",
          message: "获取失败",
        });
      }
    },
  },
  mounted() {
    this.getTaskByStatus("1,2");
  },
};
</script>

<style lang="scss" scoped>
</style>