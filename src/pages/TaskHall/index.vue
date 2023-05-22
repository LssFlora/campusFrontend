<template>
  <div>
    <Header />
    <div class="mainBox">
      <el-aside class="aside"
        ><el-image
          src="https://img-operation.csdnimg.cn/csdn/silkroad/img/1683800902930.jpg"
          fit="fit"
        ></el-image
      ></el-aside>
      <el-main class="main">
        <el-row :gutter="20">
          <el-page-header @back="goBack" :style="{ display: isBackShow }">
          </el-page-header>
          <el-button
            type="primary"
            @click="goMyTask"
            style="
              position: fixed;
              right: 15px;
              top: 200px;
              width: 80px;
              height: 80px;
            "
            circle
            size="medium"
            >我的任务</el-button
          >
          <el-button
            type="primary"
            @click="goLachTask"
            style="
              position: fixed;
              right: 15px;
              top: 300px;
              width: 80px;
              height: 80px;
            "
            circle
            size="medium"
            :style="{
              display: path.indexOf('lachTask') != -1 ? 'none' : 'block',
            }"
            >发布任务</el-button
          >
        </el-row>
        <router-view :taskType="0 + ''" :task="task"></router-view>
      </el-main>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
export default {
  components: { Header },
  data() {
    return {
      isBackShow: "",
    };
  },
  watch: {
    path(newValue, oldValue) {
      if (newValue.indexOf("taskDetail") !== -1) {
        this.isBackShow = "block";
      } else {
        this.isBackShow = "none";
      }
    },
  },
  methods: {
    goMyTask() {
      this.$router.push("/mine/myTask");
    },
    goLachTask() {
      this.$router.push("/taskHall/lachTask");
    },
    // 获取任务
    getTask(page) {
      this.$store.dispatch("getTaskHall", page);
    },
    // 获取任务详情并跳转详情页
    goTaskDetail(orderNumber, avatar) {
      this.$store.dispatch("getTaskDetail", orderNumber);
      if (this.$store.state.task.taskDetail) {
        this.task = this.$store.state.task.taskDetail;
        this.$router.push({ path: "/taskDetail", query: { avatar: avatar } });
      }
    },
    goBack() {
      this.$router.push("/taskHall/taskList");
    },
  },
  mounted() {
    this.$store.dispatch("getTaskHall", 1);
    this.isBackShow = "none";
  },
  computed: {
    task() {
      return this.$store.state.task.task;
    },
    path() {
      return this.$route.path;
    },
  },
};
</script>

<style  scoped>
/* mainBox */
.mainBox {
  width: 100%;
  height: calc(100% - 60px);
  display: flex;
}
/* aside */
.aside {
  height: 509px;
  flex: 1 1 25%;
}
/* main */
.main {
  flex: 1 1 75%;
  display: inline-block;
}
.el-row {
  margin-bottom: 20px;
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
.box-card {
  width: 444px;
}
</style>