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
        <el-button type="text">类别</el-button>
        <el-button type="text">通知</el-button>
      </div>
      <div class="rightItem">
        <div style="margin-top:-7px;margin-right:23px" @click="checkLogOut">
          <el-button type="primary" icon="el-icon-switch-button" circle></el-button>
        </div>
        <div style="width: 100px" @click="goPersonal">
          <p style="font-size: 15px; width: 90px">爱吃香菜的猫</p>
        </div>
        <div style="margin-top: 7px" @click="goPersonal">
          <el-avatar
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          ></el-avatar>
        </div>
      </div>
    </el-header>
  </div>
</template>

<script>
export default {
  methods: {
    goHome() {
      this.$router.push("/home");
    },
    goPersonal() {
      this.$router.push("/personal/information");
    },
     checkLogOut() {
        this.$confirm('确认退出登录?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           this.$store.dispatch("logOut")
      this.$router.push("/login")
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消退出'
          });          
        });
      }
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