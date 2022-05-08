<template>
  <div class="headerWrap" v-show="isHeaderShow">
    <Header />
  </div>
  <div class="main">
    <div class="sidebarWrap">
      <router-view></router-view>
    </div>
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
export default {
  name: "route-plan-main",
  components: {
    Header,
    Footer,
    Map,
  },
  data() {
    return {
      isHeaderShow: true,
    };
  },
  watch: {
    "$store.state.windowWidth": {
      handler: function (newValue, oldValue) {
        if (newValue <= 769) {
          this.isHeaderShow = false;
        } else {
          this.isHeaderShow = true;
        }
      },
      immediate: true,
    },
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
}
.map {
  width: 100%;
  height: 95%;
  border-radius: 8px;
  padding-left: 3%;
}
@media screen and (max-width: 769px) {
  .main {
    height: 100vh;
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