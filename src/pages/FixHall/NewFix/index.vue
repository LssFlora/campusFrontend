<template>
  <div>
    <el-card class="box-card">
      <el-form ref="form" label-width="250px">
        <el-form-item label="保修类型" style="margin: 15px auto">
          <el-col :span="11">
            <el-select placeholder="请选择保修类型">
              <el-option label="门窗" value="door"></el-option>
              <el-option label="空调电器" value="air"></el-option>
              <el-option label="下水道" value="water"></el-option>
            </el-select>
          </el-col>
        </el-form-item>

        <el-form-item label="保修地点" style="margin: 15px auto">
          <el-col :span="11">
            <el-input placeholder="请输入保修地点（精确到门牌号）"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="联系方式" style="margin: 15px auto">
          <el-col :span="11">
            <el-input placeholder="请输入联系方式"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="任务详情" style="margin: 15px auto">
          <el-col :span="11">
            <el-input
              type="textarea"
              autosize
              placeholder="请输入保修详情"
            ></el-input>
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
export default {};
</script>

<style  scoped>
.box-card {
  width: 800px;
  display: inline-block;
  margin: 10px;
}
</style>