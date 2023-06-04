<template>
  <div>
    <br />
    <el-page-header
      @back="goBack"
      :style="{ display: isBackShow }"
      content="发布任务"
    >
    </el-page-header>
    <div>
      <el-card class="box-card">
        <el-row>
          <el-col :span="12" :offset="4"
            ><div class="grid-content" @click="changeAddress">
              <el-card
                shadow="always"
                class="addressCard"
                :body-style="{
                  padding: '0px',
                  height: '110px',
                  position: 'relative',
                }"
              >
                <i
                  class="el-icon-s-promotion addressIcon"
                  style="float: left"
                ></i>
                <div class="addressMain">
                  <el-row :gutter="20">
                    <el-col :span="6"
                      ><div class="grid-content" style="font-weight: 700">
                        {{ defAddress.liaisonMan }}
                      </div></el-col
                    >
                    <el-col :span="4"
                      ><div class="grid-content">
                        {{ defAddress.phoneNumber }}
                      </div></el-col
                    >
                  </el-row>
                  <el-row>
                    <el-col :span="24"
                      ><div class="grid-content">
                        {{ defAddress.address }}
                      </div></el-col
                    >
                  </el-row>
                </div>
                <div
                  style="display: right; position: absolute; top: 0; right: 0"
                >
                  <i
                    class="el-icon-s-tools addressIcon"
                    style="float: right"
                  ></i>
                </div>
              </el-card></div
          ></el-col>
        </el-row>
        <el-form ref="form" label-width="250px">
          <el-form-item label="任务类型" style="margin: 15px auto">
            <el-col :span="11">
              <el-select
                placeholder="请选择任务类型"
                v-model="newTask.taskType"
              >
                <el-option label="跑腿任务" value="1"></el-option>
                <el-option label="代买任务" value="2"></el-option>
                <el-option label="其他" value="3"></el-option>
              </el-select>
            </el-col>
          </el-form-item>
          <el-form-item label="任务概述" style="margin: 15px auto">
            <el-col :span="11">
              <el-input
                placeholder="请输入任务概述"
                v-model="newTask.taskName"
              ></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="任务详情" style="margin: 15px auto">
            <el-col :span="11">
              <el-input
                type="textarea"
                autosize
                placeholder="请输入任务详情"
                v-model="newTask.taskContent"
              ></el-input>
            </el-col>
          </el-form-item>

          <el-form-item
            label="是否采用评分限制抢单人"
            style="margin: 15px auto"
          >
            <el-col :span="11">
              <el-switch
                v-model="isRate"
                active-color="#13ce66"
                inactive-color="#ff4949"
              >
              </el-switch>
              <el-input-number
                :style="{ display: isRate ? 'inline-block' : 'none' }"
                style="margin-left: 6px"
                v-model="newTask.rateLimit"
                :max="5"
                label=""
              ></el-input-number>
            </el-col>
          </el-form-item>
          <el-form-item label="任务佣金" style="margin: 15px auto">
            <el-col :span="11">
              <el-input-number
                :precision="2"
                :step="0.1"
                :max="10000"
                v-model="newTask.taskCommission"
              ></el-input-number>
            </el-col>
          </el-form-item>
          <el-form-item label="任务图片详情" style="margin: 15px auto">
            <el-col :span="17">
              <input type="file" ref="imageInput" class="upload-demo" />
            </el-col>
          </el-form-item>
          <el-form-item style="margin: 15px auto">
            <el-col :span="11">
              <el-button type="primary" @click="createTask">立即创建</el-button>
              <el-button>取消</el-button>
            </el-col>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible" center>
      <el-form
        status-icon
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="联系人" prop="user">
          <el-input
            type="text"
            autocomplete="off"
            v-model="defAddress.liaisonMan"
          ></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="phone">
          <el-input
            type="text"
            autocomplete="off"
            v-model="defAddress.phoneNumber"
          ></el-input>
        </el-form-item>
        <el-form-item label="详细地址" prop="detailAdd">
          <el-input
            type="text"
            autocomplete="off"
            v-model="defAddress.address"
          ></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="user">
          <el-radio-group v-model="selectedAddress.sex">
            <el-radio :label="0">男</el-radio>
            <el-radio :label="1">女</el-radio>
            <el-radio :label="2">其他</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancleEdit">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { reqCreateTask, reqDefAddress } from "@/services/api";
import { Message } from "element-ui";
const OSS = require("ali-oss");

export default {
  data() {
    return {
      newTask: {
        address: "",
        liaisonMan: "",
        phoneNumber: "",
        rateLimit: 0,
        taskCommission: 0,
        taskContent: "",
        taskName: "",
        taskPicture: [],
        taskType: "1",
      },
      isRate: false,
      isBackShow: "",
      isShow: true,
      defAddress: "",
      selectedAddress: {},
      dialogFormVisible: false,
    };
  },
  mounted() {
    this.getDefAddress();
  },
  methods: {
    inputAddress() {
      this.isShow = !this.isShow;
      this.newTask.address = this.defAddress.address;
    },
    async getDefAddress() {
      let result = await reqDefAddress();
      if (result.code == 200) {
        this.defAddress = result.data || {};
      } else {
        Message({
          type: "error",
          message: result.msg,
        });
      }
    },
    cancleEdit() {
      this.getDefAddress();

      this.dialogFormVisible = false;
    },
    changeAddress() {
      this.dialogFormVisible = true;
    },
    async createTask() {
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
      const filePathArr = file?.name.split(".");
      let path = `/task/${this.$store.state.user.userInfo.id}.${
        filePathArr[filePathArr.length - 1]
      }`; // 路径以及文件名，根据需求定义
      var response = client.put(path, file); // 上传并获取响应
      let url = await response.then((res) => {
        return res.url;
      });
      this.newTask = { ...this.newTask, taskPicture: url, ...this.defAddress };
      let result = await reqCreateTask(this.newTask);
      if (result.code == 200) {
        Message({
          type: "success",
          message: "创建成功",
        });
        this.$router.push("/mine/myLach/taskList");
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

<style lang="scss" scoped>
.box-card {
  width: 800px;
  display: inline-block;
  margin: 10px;
}
.defAddress {
  &:hover {
    cursor: pointer;
  }
}
.grid-content {
  &:hover {
    cursor: pointer;
  }
}
.addressIcon {
  flex: 1 1 5%;
  font-size: 30px;
  line-height: 110px;
  color: #e6a23c;
  margin: 0 10px;
}
.addressMain {
  display: inline-block;
  width: 70%;
  height: 100%;
  flex: 1 1 70%;
  padding: 20px;
}
</style>