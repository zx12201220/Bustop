<template>
  <div class="sidebarWrap">
    <RouteHeader />
    <div class="search-wrap">
      <div class="icons">
        <span class="circle"></span>
        <span class="line"></span>
        <div class="icon-location"></div>
      </div>
      <div class="searchs">
        <h4 class="now-location">現在位置</h4>
        <div class="search-location">
          <input type="search" placeholder="我想去哪裡...?" ref="myinput" />
          <div class="icon-search"></div>
        </div>
      </div>
    </div>
    <div class="warn">
      <div class="icon-notice"></div>
      目前此頁面功能尚未開發完成
    </div>
    <FavoriteList />
    <HistoryMoreList />
  </div>
</template>
<script>
import RouteHeader from "@/components/RouteHeader.vue";
import FavoriteList from "@/components/FavoriteList.vue";
import HistoryMoreList from "@/components/HistoryMoreList.vue";
export default {
  name: "route-plan",
  components: {
    RouteHeader,
    FavoriteList,
    HistoryMoreList,
  },
  mounted() {
    this.$refs.myinput.focus();
  },
};
</script>
<style lang="scss" scoped>
.sidebarWrap {
  width: 100%;
  height: 100%;
  padding-right: 5%;
  box-sizing: border-box;
  overflow-y: scroll;
}
.search-wrap {
  display: flex;
  width: 100%;
  height: 108px;
  .icons {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 25px;
    .circle {
      display: block;
      width: 9px;
      height: 9px;
      border-radius: 50%;
      background-color: #000;
    }
    .line {
      width: 1px;
      height: 29px;
      background-color: #000;
      margin: 8.5px 0;
    }
  }
  .searchs {
    flex: 1;
    margin-left: 12px;
    .now-location,
    .search-location {
      width: 100%;
      height: 48px;
      line-height: 48px;
      border-radius: 8px;
    }
    .now-location {
      padding-left: 20px;
      background-color: $skyblue;
      color: $blue;
      box-sizing: border-box;
      margin-bottom: 12px;
    }
    .search-location {
      background-color: $gray;
      > .icon-search {
        float: right;
        margin: 15px 15px 0 0;
      }
      > input[type="search"] {
        width: 85%;
        height: 100%;
        padding-left: 20px;
        border: none;
        font-size: 14px;
        font-weight: 400px;
        background-color: $gray;
        color: #000;
        border-radius: 8px;
        outline: none;
      }
    }
  }
}
.warn {
  display: flex;
  align-items: center;
  height: 45px;
  color: $red;
  > .icon-notice {
    filter: invert(26%) sepia(93%) saturate(4705%) hue-rotate(13deg)
      brightness(105%) contrast(83%);
    margin-right: 12px;
  }
}
@media screen and (max-width: 769px) {
  .sidebarWrap {
    padding-right: 0;
  }
}
</style>