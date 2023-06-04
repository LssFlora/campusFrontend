<template>
  <div style="width: 60%; margin-left: 35px">
    <el-card class="box-card">
      <el-form ref="form" :model="form" label-width="80px" class="formStyle">
        <el-form-item>
          <div class="block">
            <el-avatar :size="70" :src="form.avatar"></el-avatar>
            <input
              type="file"
              ref="imageInput"
              :style="{ display: isShow ? 'inline-block' : 'none' }"
            />
          </div>
        </el-form-item>
        <div></div>
        <el-form-item label="评分" size="small">
          <el-rate
            v-model="form.rate"
            :colors="colors"
            disabled
            show-score
            text-color="#ff9900"
            score-template="{value}"
          >
          </el-rate>
        </el-form-item>
        <el-form-item label="昵称" size="small">
          <span :style="{ display: isShow ? 'none' : 'inline-block' }">{{
            form.nickName
          }}</span>
          <el-input
            type="text"
            v-model="form.nickName"
            :style="{ display: isShow ? 'inline-block' : 'none' }"
          ></el-input>
        </el-form-item>
        <el-form-item label="性别" size="small">
          <span :style="{ display: isShow ? 'none' : 'inline-block' }">{{
            form.sex
          }}</span>
          <el-radio-group
            v-model="form.sex"
            :disabled="!isShow"
            :style="{ display: isShow ? 'inline-block' : 'none' }"
          >
            <el-radio :label="'男'">男</el-radio>
            <el-radio :label="'女'">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="手机号" size="small">
          <span :style="{ display: isShow ? 'none' : 'inline-block' }">{{
            form.phoneNumber
          }}</span>
          <el-input
            type="text"
            v-model="form.phoneNumber"
            :disabled="!isShow"
            :style="{ display: isShow ? 'inline-block' : 'none' }"
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱" size="small">
          <span :style="{ display: isShow ? 'none' : 'inline-block' }">{{
            form.email
          }}</span>
          <el-input
            type="email"
            v-model="form.email"
            :disabled="!isShow"
            :style="{ display: isShow ? 'inline-block' : 'none' }"
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
    </el-card>
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
    this.$store.dispatch("getUserInfo");
    this.getForm();
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
    getForm() {
      const user = this.$store.state.user.userInfo;
      this.form = { ...user, sex: user.sex == 0 ? "女" : "男" };
    },
    // 更新信息
    async onSubmit() {
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
      if (file) {
        const filePathArr = file?.name.split(".");
        let path = `/user/avatar/${this.$store.state.user.userInfo.id}.${
          filePathArr[filePathArr.length - 1]
        }`; // 路径以及文件名，根据需求定义
        var response = client.put(path, file); // 上传并获取响应
        await response.then((res) => {
          // 获取返回的文件url
          this.headPortraitSrc = res.url; // 并设置给页面上图片所绑定的源
          this.$store.dispatch("submitAva", res.url);
          console.log("ff", this.form);
          this.$store.dispatch("submitInfo", {
            ...this.form,
            sex: this.form.sex == "男" ? 1 : 0,
          });
          this.isShow = !this.isShow;
        });
      } else {
        this.$store.dispatch("submitInfo", {
          ...this.form,
          sex: this.form.sex == "男" ? 1 : 0,
        });
        this.isShow = !this.isShow;
      }
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