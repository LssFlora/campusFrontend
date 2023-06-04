<template>
  <div
    v-loading="isLoading"
    element-loading-text="拼命加载中"
    style="height: 430px"
  >
    <el-empty
      description="暂无任务，快去抢单或者发布任务吧！"
      :style="{ display: task.total == 0 ? 'inline-block' : 'none' }"
    ></el-empty>
    <el-row :gutter="20">
      <el-col
        :span="12"
        v-for="record in task.records"
        :key="record.orderNumber"
        style="margin: 5px 0"
      >
        <div @click="goTaskDetail(record.orderNumber)">
          <el-card class="box-card" :body-style="{ padding: '0px' }">
            <span style="float: left; margin-left: 10px">
              <el-avatar :src="record.avatar"></el-avatar>
            </span>
            <span style="float: left; line-height: 44px; margin-left: 15px">
              {{ record.taskName }}</span
            >
            <span
              style="float: left; line-height: 44px; margin-left: 15px"
              :style="{
                display:
                  taskType == 4 && record.orderStatus == 2
                    ? 'inline-block'
                    : 'none',
              }"
            >
              <el-tag effect="dark" size="small">已被接单</el-tag></span
            >
            <span style="float: right; margin-right: 10px; line-height: 44px">
              <el-tag :type="record.taskType == 1 ? 'success' : 'danger'">
                {{
                  record.taskType == 1
                    ? "跑腿任务"
                    : record.taskType == 2
                    ? "代买任务"
                    : "其他"
                }}&nbsp;
              </el-tag>
            </span>
            <span
              style="
                float: right;
                line-height: 44px;
                color: red;
                margin-right: 10px;
              "
              >佣金￥{{ record.taskCommission }}</span
            >
          </el-card>
        </div>
      </el-col>
    </el-row>
    <el-pagination
      background
      :hide-on-single-page="task.total == 0 ? true : false"
      layout="prev, pager, next"
      :total="task.total"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  props: {
    taskType: String,
    task: Object,
    isLoading: Boolean,
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {
    // 获取任务详情并跳转详情页
    goTaskDetail(orderNumber) {
      console.log("taskType", this.taskType);
      this.$store.dispatch("getTaskDetail", orderNumber);
      this.taskType == 2 || this.taskType == 6
        ? this.$store.dispatch("getRate", orderNumber)
        : "";
      if (this.$store.state.task.taskDetail) {
        this.$router.push({
          path: "/taskHall/taskDetail",
          query: { taskType: this.taskType },
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.box-card {
  &:hover {
    cursor: pointer;
    transform: scale(1.03);
  }
}
</style>