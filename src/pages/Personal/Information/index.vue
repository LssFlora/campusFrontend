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
            ref="upload"
            action="string"
            :file-list="fileList"
            :auto-upload="false"
            :http-request="uploadFile"
            :on-change="handleChange"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-upload="beforeAvatarUpload"
            multiple="multiple"
          >
            <el-tooltip
              class="item"
              effect="dark"
              content="只能上传jpeg/jpg/gif/png文件，且不超过500kb"
              placement="right"
            >
              <el-button size="small" type="primary" @click="delFile"
                >选取文件</el-button
              >
            </el-tooltip>
          </el-upload>
          <el-button size="small" type="primary" @click="submitAva"
            >点击上传</el-button
          >
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
      // 不支持多选
      multiple: false,
    };
  },
  mounted() {
    this.$store.dispatch("getUserInfo");
    this.form = this.$store.state.user.userInfo.user;
    console.log("get form", this.form);
  },
  computed: {
    token() {
      return localStorage.getItem("token");
    },
  },
  methods: {
    // 更新信息
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
    beforeAvatarUpload(file) {
      console.log("file", file);
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
    //点击上传文件触发的额外事件,清空fileList
    //点击上传文件触发的额外事件,清空fileList
    delFile() {
      this.fileList = [];
    },
    submitAva() {
      let formData = new FormData();
      formData.append("file", this.fileList[0]); //拿到存在fileList的文件存放到formData中
      //下面数据是我自己设置的数据,可自行添加数据到formData(使用键值对方式存储)
      // formData.append("title", this.title);
      this.$store.dispatch("submitAva", formData);
    },
    handleChange(file, fileList) {
      this.fileList = fileList;
      // console.log(this.fileList, "sb");
    },
    //自定义上传文件
    uploadFile(file) {
      this.formData.append("file", file.file);
      // console.log(file.file, "sb2");
    },
    //删除文件
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    // 点击文件
    handlePreview(file) {
      console.log(file);
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