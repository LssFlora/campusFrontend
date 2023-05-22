<template>
  <div>
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
      :style="{
        display: path.indexOf('newFix') != -1 ? 'none' : 'block',
      }"
      >发布公告</el-button
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