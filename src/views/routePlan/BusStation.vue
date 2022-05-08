<template>
  <div class="sidebarWrap">
    <RouteHeader />
    <div class="searchWrap">
      <h3 class="title">前往</h3>
      <div class="search-row">
        <div class="icon-arrow"></div>
        <input type="search" value="中友百貨" />
        <div class="icon-bookmark1"></div>
      </div>
    </div>
    <SearchStationList />
  </div>
</template>
<script>
import RouteHeader from "@/components/RouteHeader.vue";
import SearchStationList from "@/components/SearchStationList.vue";
export default {
  name: "bus-staion",
  components: {
    SearchStationList,
    RouteHeader
  },
};
</script>
<style lang="scss" scoped>
.sidebarWrap {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow-y: scroll;
}
.searchWrap {
  width: 100%;
  border-bottom: 1px solid #d6d6d6;
  .search-row {
    display: flex;
    align-items: center;
    height: 60px;
    > input[type="search"] {
      width: 90%;
      height: 100%;
      padding-left: 20px;
      border: none;
      font-size: 14px;
      font-weight: 400px;
      color: #000;
      outline: none;
    }
  }
}
</style>