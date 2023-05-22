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
      <router-view :taskType="this.selectedMenu" :task="task"></router-view>
    </el-card>
  </div>
</template>

<script>
import TaskList from "@/pages/TaskList";
export default {
  components: { TaskList },
  data() {
    return {
      selectedMenu: "1",
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      this.selectedMenu = key;
      console.log("HUG", this.selectedMenu);
      switch (key) {
        case "1":
          this.$store.dispatch("getMyTaskByStatus", 2);
          break;
        case "2":
          this.$store.dispatch("getMyTaskByStatus", 3);
          break;
        case "3":
          this.$store.dispatch("getMyTaskByStatus", 4);
          break;

        default:
          break;
      }
    },
  },
  mounted() {
    this.$store.dispatch("getTaskByStatus", 2);
  },
  computed: {
    task() {
      return this.$store.state.task.task;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>