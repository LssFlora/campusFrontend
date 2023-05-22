<template>
  <div>
    <el-card class="box-card" v-for="item in items" :key="item.id">
      <div slot="header" class="clearfix">
        <span>公告{{ item.id }}</span>
      </div>
      <div class="text item">发布时间：{{ item.time }}</div>
      <div class="text item">内容：{{ item.reason }}</div>
      <div class="text item">联系电话：{{ item.phone }}</div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          id: 1,
          time: "2023-4-28",
          reason: "二食堂捡到校园卡一张",
          phone: "19829264527",
        },
        {
          id: 2,
          time: "2023-4-29",
          reason: "一教捡到一把伞",
          phone: "15829264527",
        },
      ],
    };
  },
};
</script>

<style  scoped>
.box-card {
  width: 480px;
  display: inline-block;
  margin: 10px;
}
</style>