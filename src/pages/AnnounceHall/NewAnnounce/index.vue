<template>
  <div style="background-color: #eceef2; height: 100vh">
    <el-card class="box-card">
      <el-page-header
        @back="goBack"
        :style="{ display: isBackShow }"
        content="发布公告"
      >
      </el-page-header>
      <el-form ref="form" label-width="250px">
        <el-form-item label="公告类型" style="margin: 15px auto">
          <el-col :span="11">
            <el-select
              placeholder="请选择公告类型"
              v-model="newAnnounce.noticeType"
            >
              <el-option label="失物招领" value="0"></el-option>
              <el-option label="寻物启事" value="1"></el-option>
              <el-option label="求助" value="2"></el-option>
              <el-option label="学校公告" value="3"></el-option>
              <el-option label="其他" value="4"></el-option>
            </el-select>
          </el-col>
        </el-form-item>

        <el-form-item label="公告内容" style="margin: 15px auto">
          <el-col :span="11">
            <el-input
              placeholder="请输入公告内容"
              type="textarea"
              v-model="newAnnounce.content"
            ></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="联系人" style="margin: 15px auto">
          <el-col :span="11">
            <el-input
              placeholder="请输入联系人"
              v-model="newAnnounce.createUserAccount"
            ></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="联系电话" style="margin: 15px auto">
          <el-col :span="11">
            <el-input
              placeholder="请输入联系电话"
              v-model="newAnnounce.createUserPhone"
            ></el-input>
          </el-col>
        </el-form-item>
        <el-form-item style="margin: 15px auto">
          <el-col :span="11">
            <el-button type="primary" @click="submit">立即创建</el-button>
            <el-button>取消</el-button>
          </el-col>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { reqNewAnnounce } from "@/services/api";
import { Message } from "element-ui";

export default {
  data() {
    return {
      newAnnounce: {
        noticeType: "",
        content: "",
        createUserAccount: "",
        createUserPhone: "",
      },
      isBackShow: "",
    };
  },
  methods: {
    async submit() {
      let result = await reqNewAnnounce(this.newAnnounce);
      if (result.code == 200) {
        Message({
          type: "success",
          message: "发布成功",
        });
        this.$router.push("/announceHall/allAnnounce");
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
};
</script>

<style  scoped>
.box-card {
  width: 800px;
  display: inline-block;
  margin: 10px;
}
</style>