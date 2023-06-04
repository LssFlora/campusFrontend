<template>
  <div style="background-color: #eceef2">
    <Header />
    <router-view></router-view>
    <el-button
      type="primary"
      @click="goNewFix"
      style="
        position: fixed;
        right: 15px;
        top: 150px;
        width: 80px;
        height: 80px;
      "
      circle
      size="medium"
      :style="{ display: path.indexOf('newAnnounce') != -1 ? 'none' : 'block' }"
      >发布公告</el-button
    >
    <el-button
      type="primary"
      @click="goMyAnnounce"
      style="
        position: fixed;
        right: 15px;
        top: 250px;
        width: 80px;
        height: 80px;
      "
      circle
      size="medium"
      :style="{ display: path.indexOf('myAnnounce') != -1 ? 'none' : 'block' }"
      >我的公告</el-button
    >
    <el-button
      type="primary"
      @click="goAnnounceHall"
      style="
        position: fixed;
        right: 15px;
        top: 350px;
        width: 80px;
        height: 80px;
      "
      circle
      size="medium"
      :style="{ display: path.indexOf('allAnnounce') != -1 ? 'none' : 'block' }"
      >公告大厅</el-button
    >
  </div>
</template>

<script>
import Header from "@/components/Header";

export default {
  components: { Header },
  methods: {
    goNewFix() {
      this.$router.push("/announceHall/newAnnounce");
    },
    goMyAnnounce() {
      this.$router.push("/announceHall/myAnnounce");
    },
    goAnnounceHall() {
      this.$router.push("/announceHall/allAnnounce");
    },
  },
  computed: {
    path() {
      return this.$route.path;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>