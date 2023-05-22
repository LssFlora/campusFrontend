<template>
  <div>
    <el-menu
      default-active="4"
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
      <router-view :taskType="this.selectedMenu" :task="task"></router-view>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedMenu: "4",
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      switch (key) {
        case "4":
          this.$store.dispatch("getTaskByStatus", 2);
          break;
        case "5":
          this.$store.dispatch("getTaskByStatus", 0);
          break;
        case "6":
          this.$store.dispatch("getTaskByStatus", 3);
          break;
        case "7":
          this.$store.dispatch("getTaskByStatus", 4);
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
      console.log("ppp", this.$store.state.task.task);
      return this.$store.state.task.task;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>