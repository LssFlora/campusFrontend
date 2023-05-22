<template>
  <div>
    <el-row :gutter="20">
      <el-col
        :span="12"
        v-for="record in task.records"
        :key="record.orderNumber"
        style="margin: 5px 0"
      >
        <div
          class="grid-content bg-purple"
          @click="goTaskDetail(record.orderNumber)"
        >
          <el-card class="box-card" :body-style="{ padding: '0px' }">
            <span style="float: left; margin-left: 10px">
              <el-avatar :src="record.avatar"></el-avatar>
            </span>
            <span style="float: left; line-height: 44px; margin-left: 15px">
              {{ record.taskName }}</span
            >
            <span style="float: right; margin-right: 10px; line-height: 44px">
              <el-tag :type="record.taskType == 1 ? 'success' : 'danger'">
                {{ record.taskType == 1 ? "跑腿任务" : "代买任务" }}&nbsp;
              </el-tag>
            </span>
            <span
              style="
                float: right;
                line-height: 44px;
                color: red;
                margin-right: 10px;
              "
              >{{ taskType }}佣金￥{{ record.taskCommission }}</span
            >
          </el-card>
        </div>
      </el-col>
    </el-row>
    <el-pagination background layout="prev, pager, next" :total="100">
    </el-pagination>
  </div>
</template>

<script>
export default {
  props: {
    taskType: String,
    task: Object,
  },
  data() {
    return {};
  },
  mounted() {
    console.log("key", this.taskType);
  },
  methods: {
    // 获取任务详情并跳转详情页
    goTaskDetail(orderNumber) {
      console.log("0000", orderNumber);
      this.$store.dispatch("getTaskDetail", orderNumber);
      if (this.$store.state.task.taskDetail) {
        // this.task = this.$store.state.task.taskDetail;
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
</style>