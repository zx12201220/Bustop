<template>
  <!-- ---主頁 router-view  (公車動態)--- -->
  <!-- 前往busTime頁面 按鈕 -->
  <div class="search" @click="nextPage">
    <div class="icon-search"></div>
    搜尋公車路線/站牌
  </div>
  <!-- 公車 我的最愛組件 -->
  <FavoriteBusList />
  <!-- (mobile) 地圖組件 -->
  <template v-if="isMobile">
    <div class="title-row">
      <div class="icon-station"></div>
      <h2>附近站牌</h2>
    </div>
    <div class="m-map">
      <Map />
    </div>
  </template>
  <!-- 目前附近的公車站牌位置組件 NearBusStop-->
  <NearBusStop />
  <!-- 目前附近的公車位置組件 NearBus-->
  <NearBus />
</template>
<script>
import FavoriteBusList from "@/components/FavoriteBusList.vue";
import NearBusStop from "@/components/NearBusStop.vue";
import NearBus from "@/components/NearBus.vue";
import Map from "@/components/Map.vue";
export default {
  name: "search-bus",
  components: {
    FavoriteBusList,
    NearBusStop,
    NearBus,
    Map,
  },
  methods: {
    nextPage() {
      this.$router.push("/busTime");
    },
  },
  computed: {
    isMobile() {
      if (this.$store.state.windowWidth <= 769) {
        return true;
      }
      return false;
    },
  },
};
</script>
<style lang="scss" scoped>
.search {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 55px;
  margin-top: 20px;
  background-color: $gray;
  border-right: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  > .icon-search {
    margin: 0 8px;
  }
}
.warn {
  display: flex;
  align-items: center;
  height: 60px;
  color: $red;
  > .icon-notice {
    filter: invert(26%) sepia(93%) saturate(4705%) hue-rotate(13deg)
      brightness(105%) contrast(83%);
    margin-right: 12px;
  }
}

.title-row {
  display: flex;
  align-items: center;
  height: 23px;
  margin-bottom: 12px;
  > h2 {
    margin-left: 8px;
  }
}
.m-map {
  width: 100%;
  height: 223px;
  overflow: hidden;
}
</style>