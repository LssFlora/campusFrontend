<template>
  <div style="width: 100%">
    <el-form ref="form" :model="form" label-width="80px" class="formStyle">
      <el-form-item>
        <div class="block">
          <el-avatar :size="70" :src="form.avatar"></el-avatar>
          <input
            type="file"
            ref="imageInput"
            :style="{ display: isShow ? 'inline-block' : 'none' }"
          />
          <button
            v-on:click="upload()"
            :style="{ display: isShow ? 'inline-block' : 'none' }"
          >
            提交
          </button>
        </div>
      </el-form-item>
      <el-form-item label="评分" size="small">
        <el-rate :value="form.rate" :colors="colors" disabled> </el-rate>
      </el-form-item>
      <el-form-item label="昵称" size="small">
        <el-input
          type="text"
          v-model="form.nickName"
          :disabled="!isShow"
        ></el-input>
      </el-form-item>
      <el-form-item label="性别" size="small">
        <el-radio-group v-model="form.sex" :disabled="!isShow">
          <el-radio :label="0">男</el-radio>
          <el-radio :label="1">女</el-radio>
          <el-radio :label="2">其他</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="手机号" size="small">
        <el-input
          type="text"
          v-model="form.phoneNumber"
          :disabled="!isShow"
        ></el-input>
      </el-form-item>
      <el-form-item label="邮箱" size="small">
        <el-input
          type="email"
          v-model="form.email"
          :disabled="!isShow"
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button
          type="primary"
          @click="setIsShow"
          :style="{ display: isShow ? 'none' : 'inline-block' }"
          >编辑</el-button
        >
      </el-form-item>
      <el-form-item :style="{ display: isShow ? 'block' : 'none' }">
        <el-button type="primary" @click="onSubmit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { serviceAdd } from "@/services/servceAdd";
const OSS = require("ali-oss");
export default {
  data() {
    return {
      form: {
        email: "",
        phoneNumber: "",
        sex: "男",
        nickName: "",
      },
      fileList: [],
      serviceAdd,
      isShow: false,
      // 不支持多选
      multiple: false,
      colors: ["#99A9BF", "#F7BA2A", "#FF9900"], // 等同于 { 2: '#99A9BF', 4: { value: '#F7BA2A', excluded: true }, 5: '#FF9900' }
    };
  },
  mounted() {
    this.form = this.$store.state.user.userInfo;
    console.log("form", this.form);
  },
  computed: {
    token() {
      return localStorage.getItem("token");
    },
    avaUrl() {
      return this.$store.state.user.userInfo.avatar;
    },
    headPortraitSrc() {
      return this.form.avatar;
    },
  },
  methods: {
    // 更新信息
    async onSubmit() {
      // console.log("submit!");
      await this.$store.dispatch("submitInfo", this.form);
      this.isShow = !this.isShow;
    },
    upload() {
      let client = new OSS({
        // 以下信息可以在阿里云上查看
        region: "oss-cn-beijing", // 服务器集群地区
        accessKeyId: "LTAI5tLAUYNKmPj7cbMJPsEp", // accessKeyId
        accessKeySecret: "ae6y6bxR4ZWBnw5ly0uVzEItb4k5VL", // accessKeySecret
        // stsToken 可以不写但是不安全
        // stsToken: 'xxx', // 签名token
        bucket: "campus-help-picture", // 阿里云上存储的 Bucket名称
      });
      const file = this.$refs.imageInput.files[0]; // 获取文件
      const filePathArr = file.name.split(".");
      let path = `/user/avatar/${this.$store.state.user.userInfo.id}.${
        filePathArr[filePathArr.length - 1]
      }`; // 路径以及文件名，根据需求定义
      var response = client.put(path, file); // 上传并获取响应
      response.then((res) => {
        // 获取返回的文件url
        // console.log(res.url)
        this.headPortraitSrc = res.url; // 并设置给页面上图片所绑定的源
        this.$store.dispatch("submitAva", res.url);
      });
      // console.log(response)
    },
    setIsShow() {
      this.isShow = !this.isShow;
    },
  },
};
</script>

<style  scoped>
.formStyle {
  width: 50%;
  margin: 0 auto;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  border: 1px solid #e6a23c;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>