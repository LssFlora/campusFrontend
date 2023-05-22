<template>
  <div>
    <div class="mainBox">
      <el-main class="main">
        <el-card class="box-card" style="width: 900px">
          <div class="block">
            <el-avatar :size="60" :src="taskDetail.avatar"></el-avatar>
          </div>
          <el-descriptions title="任务信息">
            <el-descriptions-item label="发布者">{{
              taskDetail.publishUsers
            }}</el-descriptions-item>
            <el-descriptions-item label="联系人">{{
              taskDetail.liaisonMan
            }}</el-descriptions-item>
            <el-descriptions-item label="联系方式">{{
              taskDetail.phoneNumber
            }}</el-descriptions-item>
            <el-descriptions-item label="创建时间">{{
              taskDetail.createTime.split("T")[0]
            }}</el-descriptions-item>
            <el-descriptions-item label="订单号">{{
              taskDetail.orderNumber
            }}</el-descriptions-item>
            <el-descriptions-item label="位置">{{
              taskDetail.address
            }}</el-descriptions-item>
            <el-descriptions-item label="支付时间">{{
              taskDetail.payTime ? taskDetail.payTime : "未支付"
            }}</el-descriptions-item>
            <el-descriptions-item label="任务类型">
              <el-tag
                size="small"
                :type="taskDetail.taskType == 1 ? 'success' : 'danger'"
                >{{
                  taskDetail.taskType == 1 ? "跑腿任务" : "代买任务"
                }}</el-tag
              >
            </el-descriptions-item>
            <el-descriptions-item
              label="佣金"
              :contentStyle="{ 'font-weight': '500', color: 'red' }"
              :labelStyle="{ 'font-weight': '500', color: 'red' }"
              >{{ taskDetail.taskCommission }}元</el-descriptions-item
            >
          </el-descriptions>
          <el-descriptions title="接单人信息">
            <el-descriptions-item label="名字">{{
              taskDetail.receiveUserName
            }}</el-descriptions-item>
            <el-descriptions-item label="联系方式">{{
              taskDetail.receiveUserphoneNumber
            }}</el-descriptions-item>
          </el-descriptions>
          <el-descriptions title="任务详情">
            <el-descriptions-item label="内容">{{
              taskDetail.taskContent
            }}</el-descriptions-item>
          </el-descriptions>

          <div class="demo-image">
            <div style="display: inline-block; margin: 3px">
              <el-image
                style="width: 100px; height: 100px"
                src="https://img-operation.csdnimg.cn/csdn/silkroad/img/1683800902930.jpg"
                fit="fit"
                :preview-src-list="[
                  'https://img-operation.csdnimg.cn/csdn/silkroad/img/1683800902930.jpg',
                ]"
              ></el-image>
            </div>
          </div>
          <el-button
            :style="{
              display:
                taskType == 2 || taskType == 3 || taskType == 6 || taskType == 7
                  ? 'none'
                  : 'inline-block',
            }"
            :type="
              taskType == '0'
                ? 'success'
                : taskType == '1' || taskType == '4'
                ? 'danger'
                : taskType == '5'
                ? 'primary'
                : ''
            "
            @click="handleOneClick"
            >{{
              taskType == "0"
                ? "立即抢单"
                : taskType == "1" || taskType == "4"
                ? "取消订单"
                : taskType == "5"
                ? "去支付"
                : ""
            }}</el-button
          >
          <el-button
            type="success"
            :style="{
              display:
                taskType == '1' || taskType == '4' ? 'inline-block' : 'none',
            }"
            @click="handleComplete"
            >订单已完成</el-button
          >
          <el-button
            type="primary"
            :style="{
              display:
                taskType == '2' || taskType == '6' ? 'inline-block' : 'none',
            }"
            @click="handleRate"
            >订单评价</el-button
          >
          <el-button
            type="danger"
            :style="{
              display: taskType == '5' ? 'inline-block' : 'none',
            }"
            @click="handleOneClick"
            >取消订单</el-button
          >
          <el-dialog
            title="提示"
            :visible.sync="centerDialogVisible"
            width="30%"
            center
            style="text-align: center"
          >
            <span>确认取消订单？</span>
            <span slot="footer" class="dialog-footer">
              <el-button @click="centerDialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="cancleConfirmYes"
                >确 定</el-button
              >
            </span>
          </el-dialog>
          <el-dialog
            title="提示"
            :visible.sync="centerDialog2Visible"
            width="30%"
            center
            style="text-align: center"
          >
            <span style="text-align: center">确认订单已完成？</span>
            <span slot="footer" class="dialog-footer">
              <el-button @click="centerDialog2Visible = false">取 消</el-button>
              <el-button type="primary" @click="completeConfirmYes"
                >确 定</el-button
              >
            </span>
          </el-dialog>

          <el-dialog title="评价" :visible.sync="ratedialogFormVisible">
            <el-form v-model="rateForm">
              <el-form-item label="接单员满意度">
                <el-rate v-model="rateForm.value" :colors="colors" show-text>
                </el-rate>
              </el-form-item>
              <el-form-item label="评价内容">
                <el-input
                  v-model="rateForm.content"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="ratedialogFormVisible = false"
                >取 消</el-button
              >
              <el-button type="primary" @click="rateComfirmYes"
                >确 定</el-button
              >
            </div>
          </el-dialog>
        </el-card>
      </el-main>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
import { reqRobTask, reqEndOrCancleTask } from "@/services/api";
import { Message } from "element-ui";

export default {
  components: { Header },
  data() {
    return {
      centerDialogVisible: false,
      centerDialog2Visible: false,
      ratedialogFormVisible: false,
      rateForm: {
        value: "",
        content: "",
      },
      colors: ["#99A9BF", "#F7BA2A", "#FF9900"], // 等同于 { 2: '#99A9BF', 4: { value: '#F7BA2A', excluded: true }, 5: '#FF9900' }
    };
  },
  mounted() {},
  computed: {
    taskDetail() {
      console.log("taskDetail", this.$store.state.task.taskDetail);
      return this.$store.state.task.taskDetail;
    },
    taskType() {
      return this.$route.query.taskType;
    },
  },
  methods: {
    handleOneClick() {
      console.log("type", this.taskType);
      this.taskType == 1 || this.taskType == 4 || this.taskType == 5
        ? this.handleCancle()
        : this.taskType == 0
        ? this.handleRob()
        : this.handlePay();
    },
    handleCancle() {
      this.centerDialogVisible = true;
    },
    async handleRob() {
      // console.log("user", this.$store.state.user.userInfo);
      let result = await reqRobTask({
        orderNumber: this.$store.state.task.taskDetail.orderNumber,
        userId: this.$store.state.user.userInfo.id,
      });
      if (result.code == 200) {
        Message({
          type: "success",
          message: "抢单成功",
        });
      } else {
        Message({
          type: "error",
          message: result.msg,
        });
      }
    },
    handlePay() {},
    async cancleConfirmYes() {
      console.log("ddd", this.$route);
      this.centerDialogVisible = false;
      let result = await reqEndOrCancleTask({
        orderNumber: this.$store.state.task.taskDetail.orderNumber,
        status: 4,
      });
      if (result.code == 200) {
        Message({
          type: "success",
          message: "操作成功",
        });
      } else {
        Message({
          type: "error",
          message: result.msg,
        });
      }
    },
    handleComplete() {
      this.centerDialog2Visible = true;
    },
    async completeConfirmYes() {
      this.centerDialog2Visible = false;
      let result = await reqEndOrCancleTask({
        orderNumber: this.$store.state.task.taskDetail.orderNumber,
        status: 3,
      });
      if (result.code == 200) {
        Message({
          type: "success",
          message: "操作成功",
        });
      } else {
        Message({
          type: "error",
          message: result.msg,
        });
      }
    },
    handleRate() {
      this.ratedialogFormVisible = true;
    },
    rateComfirmYes() {
      this.ratedialogFormVisible = false;
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
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 480px;
}
</style>