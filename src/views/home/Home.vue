<template>
  <!-- 主頁 -->
  <Header />
  <div class="main">
    <div class="sidebarWrap">
      <!-- 搜尋地點 下拉選單 -->
      <SelectLocation />
      <!-- 按鈕列 (規劃路線 公車動態) router -->
      <div class="buttons-row">
        <div
          class="button"
          v-for="(item, index) in buttonList"
          :key="index"
          :class="{ active: index == activeIndex }"
          @click="activeHandler(index, item.url)"
        >
          <div :class="item.icon" v-if="index !== activeIndex"></div>
          <div :class="item.icon2" v-else-if="index === activeIndex"></div>
          {{ item.title }}
        </div>
      </div>
      <!-- (規劃路線 公車動態) view -->
      <router-view></router-view>
    </div>
    <!-- 地圖 -->
    <div class="map">
      <Map />
    </div>
  </div>
  <Footer />
</template>
<script>
import Header from "@/components/MainHeader.vue";
import Footer from "@/components/Footer.vue";
import Map from "@/components/Map.vue";
import SelectLocation from "@/components/SelectLocation.vue";

export default {
  name: "sidebarWrap",
  components: {
    Header,
    Footer,
    Map,
    SelectLocation,
  },
  data() {
    return {
      buttonList: [
        {
          title: "公車動態",
          icon: "icon-bus",
          icon2: "icon-bus2",
          url: "/searchBus",
        },
        {
          title: "規劃路線",
          icon: "icon-route",
          icon2: "icon-route2",
          url: "/searchPlan",
        },
      ],
      activeIndex: 0,
    };
  },
  methods: {
    activeHandler(index, url) {
      this.activeIndex = index;
      this.$router.push(url);
    },
  },
  watch: {
    $route(to, from) {
      if (to.path === "/searchBus") {
        this.activeIndex = 0;
      } else if (to.path === "/searchPlan") {
        this.activeIndex = 1;
      }
    },
  },
  mounted() {
    const route = this.$route.path;
    if (route === "/searchBus") {
      this.activeIndex = 0;
    } else if (route === "/searchPlan") {
      this.activeIndex = 1;
    }
  },
};
</script>
<style lang="scss" scoped>
.main {
  display: flex;
  width: 100%;
  height: calc(100vh - 108px);
  padding: 0 5%;
  box-sizing: border-box;
}
.sidebarWrap {
  width: 100%;
  height: 100%;
  max-width: 400px;
  min-width: 400px;
  box-sizing: border-box;
  overflow-y: scroll;
  .buttons-row {
    display: flex;
    justify-content: space-between;
    > .button {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 70px;
      border-radius: 8px;
      background-color: $gray;
      cursor: pointer;
      &:first-child {
        margin-right: 10px;
      }
      > div {
        margin-bottom: 6px;
      }
    }
    > .active {
      background-color: $skyblue;
      color: $blue;
    }
  }
}
.map {
  width: 100%;
  height: 95%;
  border-radius: 8px;
  padding-left: 3%;
}
@media screen and (max-width: 769px) {
  .main {
    height: calc(100vh - 70px);
  }
  .sidebarWrap {
    min-width: 320px;
    max-width: 100%;
  }
  .map {
    display: none;
  }
}
</style>