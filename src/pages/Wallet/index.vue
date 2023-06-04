<template>
  <div style="background-color: #eceef2; height: 100vh">
    <Header></Header>
    <div class="mainBox">
      <el-aside class="aside">
        <el-card class="box-card">
          <div slot="header">
            <div>
              <el-avatar :src="userInfo.avatar"></el-avatar>
            </div>
            <span>{{ userInfo.nickName }}</span>
          </div>
        </el-card>
      </el-aside>
      <el-main class="main">
        <el-card class="box-card">
          <div slot="header" class="clearfix">账户余额：{{ count }}元</div>
          <el-row :gutter="20">
            <el-radio-group style="width: 100%" v-model="value" fill="#e6a23c">
              <el-col :span="6"
                ><el-radio-button
                  label="5"
                  border
                  style="padding-bottom: 20px"
                  fill="#e6a23c"
                  >5</el-radio-button
                ></el-col
              >
              <el-col :span="6"
                ><el-radio-button label="10" border style="padding-bottom: 20px"
                  >10</el-radio-button
                ></el-col
              >
              <el-col :span="6"
                ><el-radio-button label="30" border style="padding-bottom: 20px"
                  >30</el-radio-button
                ></el-col
              >
              <el-col :span="6"
                ><el-radio-button label="50" border style="padding-bottom: 20px"
                  >50</el-radio-button
                ></el-col
              >
              <br />
              <el-col :span="6"
                ><el-radio-button
                  label="100"
                  border
                  style="padding-bottom: 20px"
                  >100</el-radio-button
                ></el-col
              >
              <el-col :span="6"
                ><el-radio-button
                  label="200"
                  border
                  style="padding-bottom: 20px"
                  >200</el-radio-button
                ></el-col
              >
              <el-col :span="6"
                ><el-radio-button
                  label="500"
                  border
                  style="padding-bottom: 20px"
                  >500</el-radio-button
                ></el-col
              >
              <el-col :span="6"
                ><el-radio-button
                  label="1000"
                  border
                  style="padding-bottom: 20px"
                  >1000</el-radio-button
                ></el-col
              >
            </el-radio-group>
          </el-row>
          <br />
          <br />

          <el-row>
            <el-col :span="24"
              ><el-button type="primary" @click="addCount"
                >充值</el-button
              ></el-col
            >
          </el-row>
        </el-card>
      </el-main>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
import { reqGetCount, reqAddCount } from "@/services/api";
import { Message } from "element-ui";

export default {
  data() {
    return {
      value: 5,
      count: 0,
    };
  },
  components: { Header },
  computed: {
    userInfo() {
      return this.$store.state.user.userInfo;
    },
  },
  methods: {
    async getCount() {
      let result = await reqGetCount();
      if (result.code == 200) {
        this.count = result.money || 0;
      }
    },
    async addCount() {
      let result = await reqAddCount(this.value);
      if (result.code == 200) {
        Message({
          type: "success",
          message: "充值成功",
        });
        this.getCount();
      } else {
        Message({
          type: "error",
          message: result.msg,
        });
      }
    },
  },
  mounted() {
    this.getCount();
  },
};
</script>

<style lang="scss" scoped>
/* mainBox */
.mainBox {
  width: 100%;
  height: calc(100% - 60px);
  display: flex;
  margin-top: 5px;
}
/* aside */
.aside {
  height: 509px;
  flex: 1 1 25%;
}
/* main */
.main {
  flex: 1 1 100%;
  display: inline-block;
  padding-top: 0;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}
.clearfix {
  font-size: 27px;
  padding: 30px 30px 30px 0;
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
  width: 100%;
  height: 100%;
}
</style>