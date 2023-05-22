<template>
  <div>
    <el-card class="box-card">
      <el-form ref="form" label-width="250px">
        <el-form-item label="任务类型" style="margin: 15px auto">
          <el-col :span="11">
            <el-select placeholder="请选择任务类型">
              <el-option label="跑腿任务" value="runTask"></el-option>
              <el-option label="代买任务" value="buyTask"></el-option>
            </el-select>
          </el-col>
        </el-form-item>

        <el-form-item label="任务地点" style="margin: 15px auto">
          <el-col :span="11">
            <el-input placeholder="请输入任务地点"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="佣金" style="margin: 15px auto">
          <el-col :span="11">
            <el-input-number
              :precision="2"
              :step="0.1"
              :max="10000"
            ></el-input-number>
          </el-col>
        </el-form-item>
        <el-form-item label="任务详情" style="margin: 15px auto">
          <el-col :span="11">
            <el-input
              type="textarea"
              autosize
              placeholder="请输入任务详情"
            ></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="图片详情" style="margin: 15px auto">
          <el-col :span="17">
            <input type="file" ref="imageInput" class="upload-demo" />
            <el-button v-on:click="upload()" type="success" plain
              >提交</el-button
            >
          </el-col>
        </el-form-item>
        <el-form-item style="margin: 15px auto">
          <el-col :span="11">
            <el-button type="primary">立即创建</el-button>
            <el-button>取消</el-button>
          </el-col>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  methods: {
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
  },
};
</script>

<style scoped>
.box-card {
  width: 800px;
  display: inline-block;
  margin: 10px;
}
</style>