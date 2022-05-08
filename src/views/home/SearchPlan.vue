<template>
  <!-- ---主頁 router-view  (規劃路線)--- -->
  <!-- 前往routePlan頁面 按鈕 -->
  <div class="search-row">
    <input type="search" placeholder="我想去哪裡...?" @click="nextPage" />
  </div>
  <div class="warn">
    <div class="icon-notice"></div>
    目前此頁面功能尚未開發完成
  </div>
  <!-- (mobile) 搜尋過的地點組件 -->
  <template v-if="isMobile">
    <HistoryList />
  </template>
  <!-- (desktop) 收藏的地點組件 -->
  <template v-else-if="!isMobile">
    <FavoriteList />
  </template>
</template>
<script>
import FavoriteList from "@/components/FavoriteList.vue";
import HistoryList from "@/components/HistoryList.vue";
export default {
  name: "search-plan",
  components: {
    FavoriteList,
    HistoryList,
  },
  methods: {
    nextPage() {
      this.$router.push("/routePlan");
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
.search-row {
  width: 100%;
  height: 55px;
  margin-top: 20px;
  > input[type="search"] {
    width: 100%;
    height: 100%;
    padding-left: 20px;
    border: none;
    font-size: 16px;
    font-weight: 500px;
    background-color: $gray;
    color: #000;
    border-radius: 8px;
    outline: none;
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
.m-map {
  width: 100%;
  height: 223px;
  overflow: hidden;
}
</style>