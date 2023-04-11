<template>
  <div style="width: 100%">
    <el-form ref="form" :model="form" label-width="80px" class="formStyle">
      <el-form-item label="头像">
        <div class="block">
          <el-avatar
            :size="70"
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          ></el-avatar>
          <el-upload
            class="upload-demo"
            auto-upload="false"
            action="http://campus.help.com/api/user/userInfo/updatePicture"
            :headers={token}
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            accept=".jpeg, .jpg, .gif, .png"
             multiple
            :limit="1"
            :file-list="fileList"
          >
            <el-tooltip
              class="item"
              effect="dark"
              content="只能上传jpeg/jpg/gif/png文件，且不超过500kb"
              placement="right"
            >
              <el-button size="small" type="primary" @click="submitAvatar"
                >点击上传</el-button
              >
            </el-tooltip>
          </el-upload>
        </div>
      </el-form-item>
      <el-form-item label="昵称" size="small">
        <el-input type="text" v-model="form.nickName"></el-input>
      </el-form-item>
      <el-form-item label="性别" size="small">
        <el-radio-group v-model="form.sex">
          <el-radio :label="0">男</el-radio>
          <el-radio :label="1">女</el-radio>
          <el-radio :label="2">其他</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="手机号" size="small">
        <el-input type="text" v-model="form.phoneNumber"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" size="small">
        <el-input type="email" v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { serviceAdd } from "@/services/servceAdd";
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
    };
  },
  mounted() {
    this.$store.dispatch("getUserInfo");
    this.form = this.$store.state.user.userInfo.user;
    console.log("get form", this.form);
  },
  computed: {
    token() {
      return this.$store.state.user.token;
    },
  },
  methods: {
    onSubmit() {
      // console.log("submit!");
      this.$store.dispatch("submitInfo", this.form);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleAvatarSuccess(){
      console.log("上传成功！")
    },

    submitAvatar() {
      // this.$refs.upload.submit()
    },
    beforeAvatarUpload(file) {
      const isJPG =
        file.type === "image/jpeg" ||
        file.type === "image/jpg" ||
        file.type === "image/png";
        // 限制只能3M以内的图片
      const isLt2M = file.size / 1024 / 1024 < 3;

      if (!isJPG) {
        this.$message.error("图片只能是 JPG 或者 PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 3MB!");
      }
      return isJPG && isLt2M;
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