<template>
  <div>
    <el-card class="box-card" v-for="(item, index) in items" :key="index">
      <div slot="header" class="clearfix">
        <span>维修记录</span>
      </div>
      <div class="text item">维修时间：{{ item.time }}</div>
      <div class="text item">维修项目：{{ item.reason }}</div>
      <div class="text item">维修师傅：{{ item.person }}</div>
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
          time: "2023-4-28",
          reason: "水管坏了",
          person: "王师傅",
          phone: "19829264527",
        },
        {
          time: "2023-4-29",
          reason: "空调不制冷",
          person: "王师傅",
          phone: "15829264527",
        },
        {
          time: "2023-4-30",
          reason: "门坏了没法开",
          person: "王师傅",
          phone: "14629264527",
        },
        {
          time: "2023-5-3",
          reason: "水管坏了",
          person: "王师傅",
          phone: "18029264527",
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