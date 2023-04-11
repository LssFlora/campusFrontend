<template>
  <div>
    <Header></Header>
    <div class="mainBox">
      <el-aside class="aside">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item index="2" @click="goinformation">
            <i class="el-icon-s-custom"></i>
            <span slot="title">个人资料</span>
          </el-menu-item>
          <el-menu-item index="3" @click="goAddress">
            <i class="el-icon-s-promotion"></i>
            <span slot="title">地址设置</span>
          </el-menu-item>
          <el-menu-item index="4" @click="goAuthentication">
            <i class="el-icon-warning"></i>
            <span slot="title">身份认证</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
export default {
  components: {
    Header,
  },
  methods: {
    goinformation() {
      this.$router.push("/personal/information");
    },
    goAddress() {
      this.$router.push("/personal/existAddress");
    },
    goAuthentication() {
      this.$router.push("/personal/authentication");
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
.aside {
  flex: 1 1 20%;
  height: 509px;
}
.main {
  flex: 1 1 75%;
}
</style>