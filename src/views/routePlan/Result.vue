<template >
  <div class="sidebarWrap">
    <RouteHeader />
    <div class="back">
      <div class="icon-back"></div>
    </div>
    <div class="detaileWrap" :class="{ isOpen: isOpen }">
      <div class="m-top">
        <div class="icon-back" @click="isOpen = !isOpen"></div>
      </div>
      <div class="head">
        <h3>步行2分鐘</h3>
        <div class="icon-back"></div>
        <div class="icon-bus"></div>
        <div class="number">55</div>
        <div class="min">15分鐘</div>
      </div>
      <div class="time-row">
        <div class="icon-clock"></div>
        <h4>下午6:03-下午6:18</h4>
      </div>
      <div class="detaile">
        <div class="now-row row">
          <div class="icon-location2"></div>
          <h4 class="now-title">台中火車站</h4>
          <h4 class="now-time">下午6:03</h4>
        </div>
        <h3 class="now-info">步行2分鐘</h3>
        <div class="bus-row row">
          <div class="icon-location"></div>
          <h4 class="bus-title">台中火車站B月台</h4>
          <h4 class="bus-time">下午6:03</h4>
        </div>
        <div class="bus-info">
          <ul>
            <li>干城站</li>
            <li>台中公園</li>
            <li>中興堂</li>
            <li>國立臺中科技大學</li>
          </ul>
        </div>
        <div class="destination-row row">
          <div class="icon-location2"></div>
          <h4 class="destination-title">中友百貨</h4>
          <h4 class="destination-time">下午6:23</h4>
        </div>
      </div>
    </div>
    <div class="mapWrap">
      <Map />
    </div>
  </div>
</template>
<script>
import RouteHeader from "@/components/RouteHeader.vue";
import Map from "@/components/Map.vue";
export default {
  name: "route-plan-result",
  components: {
    RouteHeader,
    Map,
  },
  data() {
    return {
      isOpen: false,
    };
  },
};
</script>
<style lang="scss" scoped>
.sidebarWrap {
  position: relative;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow-y: scroll;
}
.detaileWrap {
  background-color: $gray;
  height: calc(87% - 64px);
  padding: 29px 24px 10px;
  border-radius: 10px 10px 0 0;
  overflow-y: scroll;
  transition: all 0.8s;
  .m-top {
    display: none;
    align-items: center;
    height: 38px;
    margin-bottom: 25px;
    border-bottom: 3px solid $gray;
    cursor: pointer;
    > .icon-back {
      transform: rotate(90deg);
      transition: 0.8s;
    }
  }
  .head {
    position: relative;
    display: flex;
    align-items: center;
    .icon-back {
      margin-left: 15px;
      transform: rotate(180deg);
    }
    .icon-bus {
      margin-left: 15px;
      margin-right: 2px;
    }
    .number {
      width: 35px;
      height: 22px;
      margin: 0 4px;
      line-height: 22px;
      text-align: center;
      background-color: #e0edff;
      color: $blue;
      border-radius: 8px;
    }
    .min {
      position: absolute;
      right: 0;
    }
  }
  .time-row {
    display: flex;
    align-items: center;
    margin-top: 20px;
    > h4 {
      margin-left: 5px;
    }
    &:first-child {
      margin-top: 30px;
      margin-bottom: 8px;
    }
    &:last-child {
      position: relative;
      margin-bottom: 0;
    }
    .icon-searhHistory {
      position: absolute;
      right: 0;
    }
  }
  .detaile {
    margin-top: 44px;
    .row {
      display: flex;
      align-items: center;
      position: relative;
    }
    .now-row {
      position: relative;
      > .now-title {
        margin-left: 25px;
        color: $blue;
      }
      > .now-time {
        position: absolute;
        right: 0;
      }
    }
    .now-info {
      height: 71px;
      line-height: 71px;
      padding-left: 22px;
      margin: 10px 8px 0;
      border-left: 3px dashed $blue;
    }
    .now-row {
      position: relative;
      > .now-title {
        margin-left: 25px;
        color: $blue;
      }
      > .now-time {
        position: absolute;
        right: 0;
      }
    }
    .bus-row {
      position: relative;
      > .bus-title {
        margin-left: 25px;
      }
      > .bus-time {
        position: absolute;
        right: 0;
      }
    }
    .bus-info {
      border-left: 3px solid #000;
      padding-top: 16px;
      padding-left: 48px;
      padding-bottom: 8px;
      margin: 10px 8px 0;
      > ul {
        li {
          margin: 15px 0;
        }
      }
    }
    .destination-row {
      margin-top: 7px;
      > .destination-title {
        margin-left: 25px;
      }
      > .destination-time {
        position: absolute;
        right: 0;
      }
    }
  }
}
.mapWrap {
  position: absolute;
  left: 0;
  top: 0;
  display: none;
  width: 100%;
  height: 100%;
}
.back {
  display: none;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 999;
  width: 36px;
  height: 36px;
  margin: 16px;
  padding: 8px;
  box-sizing: border-box;
  border-radius: 50%;
  background-color: $gray;
  cursor: pointer;
}
@media screen and (max-width: 769px) {
  .detaileWrap {
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
    width: 90%;
    height: 145px;
    padding: 0px 24px 10px;
    background-color: #fff;
    overflow-y: hidden;
    box-sizing: border-box;
    z-index: 99;
    .m-top {
      display: flex;
    }
    .head {
      .min {
        right: 50px;
      }
    }
  }
  .isOpen {
    height: 500px;
    overflow-y: scroll;
    .m-top {
      > .icon-back {
        transform: rotate(-90deg);
      }
    }
  }
  .mapWrap {
    display: block;
  }
  .back {
    display: block;
  }
}
</style>