<template>
  <div>
    <el-menu
      default-active="1"
      style="float: left; width: 20%"
      @select="handleSelect"
    >
      <el-menu-item index="1">
        <i class="el-icon-star-on"></i>
        <span slot="title">进行中</span>
      </el-menu-item>
      <el-menu-item index="2">
        <i class="el-icon-s-claim"></i>
        <span slot="title">已完成</span>
      </el-menu-item>
      <el-menu-item index="3">
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
import TaskList from "@/pages/TaskList";
import { Message } from "element-ui";
import { reqMyTaskByStatus } from "@/services/api";

export default {
  components: { TaskList },
  data() {
    return {
      selectedMenu: "1",
      task: {},
      isLoading: true,
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      this.isLoading = true;
      this.selectedMenu = key;
      switch (key) {
        case "1":
          this.getTaskByStatus(2);
          break;
        case "2":
          this.getTaskByStatus(3);
          break;
        case "3":
          this.getTaskByStatus(4);
          break;
        default:
          break;
      }
    },
    // 根据状态获取我的抢单任务
    async getTaskByStatus(status) {
      let result = await reqMyTaskByStatus(status);
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
    this.getTaskByStatus(2);
  },
};
</script>

<style lang="scss" scoped>
</style>