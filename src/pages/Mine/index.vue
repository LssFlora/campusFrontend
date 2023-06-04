<template>
  <div>
    <Header />
    <el-row>
      <el-col :span="24">
        <el-menu
          :default-active="path.indexOf('myTask') == -1 ? '2' : '1'"
          class="el-menu-demo"
          mode="horizontal"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item index="1" style="font-size: 18px" @click="goMyTask"
            >我的任务</el-menu-item
          >
          <el-menu-item index="2" style="font-size: 18px" @click="goMyLach"
            >我的发布</el-menu-item
          >
        </el-menu>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <router-view></router-view>
    </el-row>
  </div>
</template>

<script>
import Header from "@/components/Header";
export default {
  components: { Header },
  data() {
    return {
      activeIndex: "1",
    };
  },
  methods: {
    goMyTask() {
      this.$router.push("/mine/myTask/taskList");
    },
    goMyLach() {
      this.$router.push("/mine/myLach/taskList");
    },
  },
  computed: {
    path() {
      return this.$route.path;
    },
  },
};
</script>

<style  scoped>
</style>