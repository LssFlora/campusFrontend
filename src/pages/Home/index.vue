<template>
  <div>
    <Header></Header>
    <el-main>
      <el-row>
        <el-col :span="24">
          <!-- <div class="grid-content bg-purple-dark">广告招商中...</div> -->
          <el-carousel
            :interval="5000"
            arrow="always"
            class="grid-content"
            style="height: 120px"
          >
            <el-carousel-item
              v-for="item in carouselSrc"
              :key="item.id"
              style="height: 120px"
              :src="item.imgSrc"
            >
              <img
                :src="item.imgSrc"
                style="height: 120px; width: 100%; display: inline-block"
              />
            </el-carousel-item>
          </el-carousel>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6" v-for="(cardItem, index) in cardSrc" :key="index"
          ><div class="grid-content bg-purple">
            <el-card :body-style="{ padding: '0px' }">
              <img
                :src="cardItem.imgSrc"
                class="image"
                @click="cardItem.clickEvent()"
              />
              <div style="padding: 14px">
                <span>{{ cardItem.title }}</span>
                <div class="bottom clearfix">
                  <time class="time">{{ currentDate }}</time>
                  <el-button
                    type="text"
                    class="button"
                    @click="cardItem.clickEvent()"
                    >前往</el-button
                  >
                </div>
              </div>
            </el-card>
          </div></el-col
        >
      </el-row>
    </el-main>
  </div>
</template>

<script>
import Header from "@/components/Header";
export default {
  components: { Header },
  data() {
    return {
      currentDate: "",
      carouselSrc: [
        {
          id: 1,
          imgSrc: require("./assets/c1.png"),
        },
        {
          id: 2,
          imgSrc: require("./assets/c2.png"),
        },
        {
          id: 3,
          imgSrc: require("./assets/c3.png"),
        },
        {
          id: 4,
          imgSrc: require("./assets/c4.png"),
        },
      ],
      cardSrc: [
        {
          imgSrc: require("./assets/home1.png"),
          title: "任务大厅",
          clickEvent: () => {
            this.goTaskHall();
          },
        },
        {
          imgSrc: require("./assets/home2.png"),
          title: "维修中心",
          clickEvent: () => {
            this.goFixHall();
          },
        },
        {
          imgSrc: require("./assets/home3.png"),
          title: "公告",
          clickEvent: () => {
            this.goAnnounceHall();
          },
        },
        {
          imgSrc: require("./assets/home4.png"),
          title: "我的",
          clickEvent: () => {
            this.goMine();
          },
        },
      ],
    };
  },
  methods: {
    goTaskHall() {
      this.$router.push("/taskHall/taskList");
    },
    goMine() {
      this.$router.push("/mine/myTask/taskList");
    },
    goFixHall() {
      this.$router.push("/fixHall/fixHistory");
    },
    goAnnounceHall() {
      this.$router.push("/announceHall/allAnnounce");
    },
  },
};
</script>

<style  scoped>
.el-row {
  margin-bottom: 20px;
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.el-carousel__container {
  height: 120px !important;
}
</style>