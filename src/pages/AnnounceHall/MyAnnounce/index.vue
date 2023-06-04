<template>
  <div style="background-color: #eceef2">
    <el-page-header @back="goBack" content="我的公告"> </el-page-header>
    <el-empty
      description="暂无公告，快点击发布公告发布吧！"
      :style="{ display: items.length == 0 ? 'inline-block' : 'none' }"
    ></el-empty>
    <el-row>
      <el-col :span="12" v-for="item in items" :key="item.id">
        <el-card class="box-card">
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
            <el-button
              style="float: right; padding: 3px 0"
              type="text"
              @click="delMyAnnounce(item.id)"
              >删除</el-button
            >
          </div>
          <div class="text item">发布内容：{{ item.content }}</div>
          <div class="text item">发布时间：{{ item.createTime }}</div>
          <div class="text item">联系人：{{ item.createUserAccount }}</div>
          <div class="text item">联系电话：{{ item.createUserPhone }}</div>
        </el-card></el-col
      >
    </el-row>
  </div>
</template>

<script>
import { reqMyNewAnnounce, reqDelAnnounce } from "@/services/api";
import { Message } from "element-ui";

export default {
  data() {
    return {
      items: [],
      isBackShow: "",
    };
  },
  methods: {
    async getMyAnnounce() {
      let result = await reqMyNewAnnounce();
      if (result.code == 200) {
        this.items = result.data;
      }
    },
    async delMyAnnounce(id) {
      let result = await reqDelAnnounce(id);
      if (result.code == 200) {
        Message({
          type: "success",
          message: "删除成功",
        });
        this.getMyAnnounce();
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
  },
  mounted() {
    this.getMyAnnounce();
  },
};
</script>

<style lang="scss" scoped>
.box-card {
  width: 80%;
  display: inline-block;
  margin: 10px;
  &:hover {
    transform: scale(1.03);
  }
}
.text {
  font-size: 14px;
}

.item {
  padding: 7px 0;
}
</style>