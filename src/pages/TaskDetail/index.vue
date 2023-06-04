<template>
  <div>
    <div class="mainBox">
      <el-main class="main">
        <el-page-header
          @back="goBack"
          :style="{ display: isBackShow }"
          content="任务详情"
        >
        </el-page-header>
        <el-card class="box-card" style="width: 90%">
          <div class="block">
            <el-avatar :size="60" :src="taskDetail.avatar"></el-avatar>
          </div>
          <el-descriptions :title="taskDetail.taskName">
            <el-descriptions-item label="任务类型">
              <el-tag
                size="small"
                :type="taskDetail.taskType == 1 ? 'success' : 'danger'"
                >{{
                  taskDetail.taskType == 1
                    ? "跑腿任务"
                    : taskDetail.taskType == 2
                    ? "代买任务"
                    : "其他"
                }}</el-tag
              >
            </el-descriptions-item>
            <el-descriptions-item
              label="佣金"
              :contentStyle="{ 'font-weight': '500', color: 'red' }"
              :labelStyle="{ 'font-weight': '500', color: 'red' }"
              >{{ taskDetail.taskCommission }}元</el-descriptions-item
            >
            <el-descriptions-item label="联系人">{{
              taskDetail.liaisonMan
            }}</el-descriptions-item>
            <el-descriptions-item label="联系方式">{{
              taskDetail.phoneNumber
            }}</el-descriptions-item>
            <el-descriptions-item label="创建时间">{{
              taskDetail.createTime
            }}</el-descriptions-item>
            <el-descriptions-item label="订单号">{{
              taskDetail.orderNumber
            }}</el-descriptions-item>
            <el-descriptions-item label="位置">{{
              taskDetail.address
            }}</el-descriptions-item>
            <div :style="{ display: taskDetail.payTime ? 'block' : 'none' }">
              <el-descriptions-item
                :label="taskDetail.payTime ? '支付时间' : null"
                :colon="taskDetail.payTime ? false : true"
                >{{
                  taskDetail.payTime ? taskDetail.payTime : "未支付"
                }}</el-descriptions-item
              >
            </div>

            <el-descriptions-item label="发布者">{{
              taskDetail.publishUsers
            }}</el-descriptions-item>
          </el-descriptions>

          <el-descriptions
            title="接单人信息"
            :style="{
              display:
                !taskDetail.receiveUserName ||
                !taskDetail.receiveUserphoneNumber
                  ? 'none'
                  : 'block',
            }"
          >
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

          <div
            class="demo-image"
            :style="{
              display: taskDetail.taskPicture == false ? 'none' : 'block',
            }"
          >
            <div style="display: inline-block; margin: 3px">
              <el-image
                style="width: 100px; height: 100px"
                :src="taskDetail.taskPicture"
                fit="fit"
                :preview-src-list="[taskDetail.taskPicture]"
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
                taskType == '6' && this.rateForm.orderEvaluation == false
                  ? 'inline-block'
                  : 'none',
            }"
            @click="handleRate"
            >订单评价</el-button
          >

          <el-button
            type="info"
            icon="el-icon-service"
            circle
            :style="{
              display: taskType == '6' ? 'inline-block' : 'none',
            }"
            @click="handleComplaint"
            >投诉</el-button
          >
          <el-button
            type="danger"
            :style="{
              display: taskType == '5' ? 'inline-block' : 'none',
            }"
            @click="handleCancle"
            >取消订单</el-button
          >
          <div
            :style="{
              display:
                (taskType == 6 || taskType == 2) &&
                this.rateForm.orderEvaluation != false
                  ? 'block'
                  : 'none',
            }"
          >
            <el-descriptions title="评价"> </el-descriptions>

            <el-card class="box-card">
              <div class="rateContentStyle">
                <el-button
                  type="text"
                  style="float: right; padding-top: 0"
                  @click="deleteRate"
                  :style="{
                    display:
                      taskType == 6 && rateForm.orderEvaluation != false
                        ? 'inline-block'
                        : 'none',
                  }"
                  >删除</el-button
                >
                <el-rate
                  v-model="rateForm.receiverRating"
                  disabled
                  show-score
                  text-color="#ff9900"
                  score-template="{value}"
                >
                </el-rate>
                <span>商家评价：{{ rateForm.orderEvaluation }}</span>
                <el-button
                  type="text"
                  style="margin-left: 5px"
                  @click="reply"
                  :style="{
                    display:
                      taskType == 2 &&
                      rateForm.orderEvaluation != false &&
                      rateForm.content == null
                        ? 'inline-block'
                        : 'none',
                  }"
                  >回复</el-button
                >
              </div>
              <div
                class="driverRateContent"
                :style="{ display: isReplyShow ? 'block' : 'none' }"
              >
                <el-input v-model="driverReplyContent" clearable>
                  <el-button
                    slot="append"
                    icon="el-icon-s-promotion"
                    @click="submitReply"
                  ></el-button>
                </el-input>
              </div>
              <div
                class="driverRateContent"
                :style="{
                  display: rateForm.content != null ? 'block' : 'none',
                }"
              >
                <span>骑手回复：{{ rateForm.content }}</span>
              </div>
            </el-card>
          </div>
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
            <el-form v-model="newRate">
              <el-form-item label="接单员满意度">
                <el-rate
                  v-model="newRate.value"
                  :colors="colors"
                  show-text
                  allow-half
                  style="
                    text-align: left;
                    height: 40px;
                    line-height: 40px;
                    margin-top: 3px;
                  "
                >
                </el-rate>
              </el-form-item>
              <el-form-item label="评价内容" style="text-align: left">
                <el-input
                  v-model="newRate.content"
                  autocomplete="off"
                  style="width: 80%"
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
          <el-dialog title="投诉" :visible.sync="suedialogFormVisible">
            <el-form>
              <el-form-item label="投诉内容" style="text-align: left">
                <el-input
                  v-model="sueContent"
                  autocomplete="off"
                  style="width: 80%"
                ></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="suedialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="complaintYes">确 定</el-button>
            </div>
          </el-dialog>
        </el-card>
      </el-main>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
import {
  reqRobTask,
  reqEndOrCancleTask,
  reqRate,
  reqReplyRate,
  reqDelRate,
  reqPay,
  reqSue,
} from "@/services/api";
import { Message } from "element-ui";

export default {
  components: { Header },
  data() {
    return {
      centerDialogVisible: false,
      centerDialog2Visible: false,
      ratedialogFormVisible: false,
      suedialogFormVisible: false,
      colors: ["#99A9BF", "#F7BA2A", "#FF9900"], // 等同于 { 2: '#99A9BF', 4: { value: '#F7BA2A', excluded: true }, 5: '#FF9900' }
      isBackShow: "",
      isRated: true,
      gettedRateInfo: [],
      driverReplyContent: "",
      isReplyShow: false,
      newRate: { content: "", value: 0 },
      sueContent: "",
    };
  },
  mounted() {
    // this.$store.dispatch("getRate", this.taskDetail.orderNumber);
  },
  computed: {
    taskDetail() {
      return this.$store.state.task.taskDetail || [];
    },
    taskType() {
      return this.$route.query.taskType || [];
    },
    rateForm() {
      return (
        this.$store.state.task.rate || {
          orderEvaluation: "",
          receiverRating: 0,
          content: null,
        }
      );
    },
  },
  methods: {
    handleOneClick() {
      this.taskType == 1 || this.taskType == 4
        ? this.handleCancle()
        : this.taskType == 0
        ? this.handleRob()
        : this.handlePay();
    },
    handleComplaint() {
      this.suedialogFormVisible = true;
    },
    async complaintYes() {
      this.suedialogFormVisible = false;
      let result = await reqSue(
        this.sueContent,
        this.$store.state.task.taskDetail.id,
        this.$store.state.task.taskDetail.receiverId
      );
      if (result.code == 200) {
        Message({
          type: "success",
          message: "投诉成功",
        });
        this.$router.back();
      } else {
        Message({
          type: "error",
          message: result.msg,
        });
      }
    },
    handleCancle() {
      this.centerDialogVisible = true;
    },
    async handleRob() {
      let result = await reqRobTask({
        orderNumber: this.$store.state.task.taskDetail.orderNumber,
        userId: this.$store.state.task.taskDetail.userId,
      });
      if (result.code == 200) {
        Message({
          type: "success",
          message: "抢单成功",
        });
        this.$router.push("/mine/myTask/taskList");
      } else {
        Message({
          type: "error",
          message: result.msg,
        });
      }
    },
    handlePay() {
      this.Pay();
    },
    async Pay() {
      let result = await reqPay(
        this.$store.state.task.taskDetail.taskCommission,
        this.$store.state.task.taskDetail.id
      );
      if (result.code == 200) {
        Message({
          type: "success",
          message: "支付成功",
        });
        this.$router.push("/mine/myLach/taskList");
      } else {
        Message({
          type: "error",
          message: result.msg,
        });
      }
    },
    async cancleConfirmYes() {
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
        this.$router.back();
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
        // this.$router.push(-1);
        this.$router.back();
      } else {
        Message({
          type: "error",
          message: result.msg,
        });
      }
    },
    handleRate() {
      this.ratedialogFormVisible = true;
      console.log("rate", this.rateForm);
    },
    async rateComfirmYes() {
      let result = await reqRate({
        orderEvaluation: this.newRate.content,
        orderNumber: this.taskDetail.orderNumber,
        receiverId: this.taskDetail.receiverId,
        receiverRating: this.newRate.value,
      });
      if (result.code == 200) {
        Message({
          type: "success",
          message: "评价成功",
        });
        this.isRated = false;
        this.ratedialogFormVisible = false;
        // this.getRate();
        this.$store.dispatch("getRate", this.taskDetail.orderNumber);
      } else {
        Message({
          type: "error",
          message: result.msg,
        });
      }
    },
    goBack() {
      // this.$router.go(-1);
      this.$router.back();
    },
    reply() {
      this.isReplyShow = true;
    },
    async submitReply() {
      let result = await reqReplyRate(
        this.driverReplyContent,
        this.taskDetail.orderNumber
      );
      if (result.code == 200) {
        Message({
          type: "success",
          message: "回复成功",
        });
        this.$store.dispatch("getRate", this.taskDetail.orderNumber);
        this.isReplyShow = false;
      } else {
        Message({
          type: "error",
          message: result.msg,
        });
      }
    },
    async deleteRate() {
      let result = await reqDelRate(this.rateForm.id);
      if (result.code == 200) {
        Message({
          type: "success",
          message: "删除成功",
        });
        this.$store.dispatch("getRate", this.taskDetail.orderNumber);
      } else {
        Message({
          type: "error",
          message: result.msg,
        });
      }
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
.dialog-footer {
  text-align: center;
}
.rateContentStyle {
  text-align: left;
  font-size: 14px;
}
.driverRateContent {
  text-align: left;
  font-size: 14px;
  background-color: #e0e0e0;
  padding: 8px;
  margin-top: 10px;
  border-radius: 5px;
  padding-left: 4px;
  line-height: 32px;
}
</style>