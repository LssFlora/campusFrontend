<template>
  <div>
    <div v-loading="isLoading" element-loading-text="拼命加载中"></div>
    <el-card
      class="box-card"
      v-for="item in items"
      :key="item.id"
      :body-style="{ 'padding-top': 0 }"
      v-loading="isLoading"
      element-loading-text="拼命加载中"
    >
      <div slot="header" class="clearfix">
        <span style="font-size: 20px; color: #e6a23c">{{
          item.noticeType == 0
            ? "失物招领"
            : item.notice_type == 1
            ? "寻物启事"
            : item.notice_type == 2
            ? "求助"
            : item.notice_type == 3
            ? "学校公告"
            : "其他"
        }}</span>
      </div>
      <div class="text item">内容：{{ item.content }}</div>
      <div class="text item">联系人：{{ item.createUserAccount }}</div>
      <div class="text item">联系电话：{{ item.createUserPhone }}</div>
      <div class="text item">发布时间：{{ item.createTime }}</div>
    </el-card>
  </div>
</template>

<script>
import { reqAnnounce } from "@/services/api";
export default {
  data() {
    return {
      items: [],
      isLoading: true,
    };
  },
  methods: {
    async getAnnounce() {
      let result = await reqAnnounce();
      if (result.code == 200) {
        this.items = result.data;
        this.isLoading = false;
      }
    },
  },
  mounted() {
    this.getAnnounce();
  },
};
</script>

<style  scoped>
.box-card {
  width: 400px;
  display: inline-block;
  margin: 10px;
}
.text {
  font-size: 14px;
}

.item {
  padding: 7px 0;
}
</style>