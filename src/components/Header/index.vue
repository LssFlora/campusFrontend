<template>
  <div>
    <el-header class="header">
      <div class="leftItem" style="width: 27px" @click="goHome">
        <i class="el-icon-thumb"></i>
      </div>
      <span class="leftItem" style="font-size: 25px" @click="goHome"
        >校园帮</span
      >
      <div class="centerItem">
        <el-button type="text" @click="goHome">首页</el-button>
        <el-button type="text" @click="goMine">我的</el-button>
        <el-button type="text" @click="goAnnounce">公告</el-button>
      </div>
      <div class="rightItem">
        <div style="margin-top: -7px; margin-right: 23px" @click="checkLogOut">
          <el-button
            type="primary"
            icon="el-icon-switch-button"
            circle
          ></el-button>
        </div>
        <div style="width: 100px" @click="goPersonal">
          <p style="font-size: 15px; width: 90px">
            {{ this.$store.state.user.userInfo.nickName }}
          </p>
        </div>
        <div style="margin-top: 7px" @click="goPersonal">
          <el-avatar :src="avaUrl"></el-avatar>
        </div>
      </div>
    </el-header>
  </div>
</template>

<script>
export default {
  computed: {
    nickName() {
      return this.$store.state.user.userInfo.nickName;
    },
    avaUrl() {
      return this.$store.state.user.userInfo.avatar;
    },
  },
  methods: {
    goHome() {
      this.$router.push("/home");
    },
    goPersonal() {
      this.$router.push("/personal/information");
    },
    checkLogOut() {
      this.$confirm("确认退出登录?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$store.dispatch("logOut");
          this.$router.push("/login");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消退出",
          });
        });
    },
    goMine() {
      this.$router.push("/mine/myTask/taskList");
    },
    goAnnounce() {
      this.$router.push("/announceHall/allAnnounce");
    },
  },
  mounted() {
    console.log("11", this.$store.state.user);
  },
};
</script>

<style  scoped>
.header {
  background-color: #eceef2;
  position: relative;
}
.leftItem {
  font-size: 32px;
  line-height: 60px;
  width: 100px;
  float: left;
  color: #e6a23c;
}
.leftItem:hover {
  cursor: pointer;
}
.centerItem {
  width: 40%;
  margin: 0 auto;
  line-height: 60px;
}
.centerItem button {
  font-size: 18px;
  margin: 0 10px;
  color: #606266;
}
.centerItem button:hover {
  color: #e6a23c;
}
.rightItem {
  position: absolute;
  top: 0;
  right: 0;
  font-size: 32px;
  line-height: 60px;
  width: 272px;
  float: right;
  color: #e6a23c;
}
.rightItem div {
  width: 45px;
  float: right;
  margin: 0 5px;
  line-height: 60px;
  cursor: pointer;
}
</style>