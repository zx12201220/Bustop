<template>
  <div class="m-header">
    <RouteHeader />
    <div class="icon-route" @click="mobileShowHandler"></div>
  </div>
  <SelectLocation />
  <div class="container">
    <h3 class="title">{{ this.searchBusRoute }}</h3>
    <div class="subTitle">{{ this.OperatorName }}/一段票</div>
    <div class="tabWrap">
      <h4
        class="tab"
        :class="{ active: activeIndex === 0 }"
        @click="activeIndexHandler(0)"
      >
        往{{ startStopName }}
      </h4>
      <h4
        class="tab"
        :class="{ active: activeIndex === 1 }"
        @click="activeIndexHandler(1)"
      >
        往{{ endStopName }}
      </h4>
    </div>
    <ul class="dynamicBusData" v-if="activeIndex === 0">
      <li
        v-for="(item, index) in startStopOfRoute"
        :key="index"
        :class="{
          pitStop: item.state === 'pitStop',
          comming: item.state === 'comming',
        }"
      >
        <div class="time">{{ item.nextBusTime }}</div>
        <h3 class="routeName">{{ item.StopName.Zh_tw }}</h3>
        <div class="icon">
          <span class="circle"></span>
        </div>
      </li>
    </ul>
    <ul class="dynamicBusData" v-else-if="activeIndex === 1">
      <li
        v-for="(item, index) in endStopOfRoute"
        :key="index"
        :class="{
          pitStop: item.state === 'pitStop',
          comming: item.state === 'comming',
        }"
      >
        <div class="time">{{ item.nextBusTime }}</div>
        <h3 class="routeName">{{ item.StopName.Zh_tw }}</h3>
        <div class="icon">
          <span class="circle"></span>
        </div>
      </li>
    </ul>
  </div>
  <div class="m-mapContainer" v-show="isMobileShow">
    <div class="mapBackHeader">
      <div class="icon-back" @click="mobileHideHandler"></div>
      <div class="title">路線圖</div>
    </div>
    <div class="mapWrap">
      <Map />
    </div>
  </div>
</template>
<script>
import RouteHeader from "@/components/RouteHeader.vue";
import SelectLocation from "@/components/SelectLocation.vue";
import Map from "@/components/Map.vue";
import axios from "axios";
import getAuthorizationHeader from "@/tools/AuthorizationHeader";
export default {
  name: "bus_result",
  components: {
    RouteHeader,
    SelectLocation,
    Map,
  },
  data() {
    return {
      isMobileShow: false,
      activeIndex: this.$store.state.busPageActiveIndex,
      location: "",
      searchBusRoute: "",
      OperatorName: "",
      startStopName: "",
      endStopName: "",
      startStopOfRoute: [],
      endStopOfRoute: [],
      startLine: null,
      endLine: null,
      timer: null,
    };
  },
  methods: {
    activeIndexHandler(index) {
      if (this.endStopName !== "") {
        this.$store.commit("setBusPageActiveIndex", index);
        this.activeIndex = index;
      }
    },
    mobileShowHandler() {
      this.$store.commit("setisMobileShow", true);
      this.isMobileShow = true;
    },
    mobileHideHandler() {
      this.$store.commit("setisMobileShow", false);
      this.isMobileShow = false;
    },
    initData() {
      this.searchBusRoute = this.$store.state.searchBusRoute.routeName;
      this.OperatorName = this.$store.state.searchBusRoute.OperatorName;
      this.startStopName = this.$store.state.searchBusRoute.startStop;
      this.endStopName = this.$store.state.searchBusRoute.endStop;
    },
    getStopOfRouteApi() {
      return new Promise((resolve, reject) => {
        axios
          .get(
            `https://ptx.transportdata.tw/MOTC/v2/Bus/StopOfRoute/City/${this.$store.state.searchBusRoute.location}/${this.searchBusRoute}?%24top=500&%24format=JSON`,
            {
              headers: getAuthorizationHeader(),
            }
          )
          .then((response) => {
            const routeID = this.searchBusRoute;
            const result = response.data.filter(
              (data) => data.RouteName.Zh_tw == routeID
            );
            if (result[0]) {
              this.startStopOfRoute = result[0].Stops;
            }
            if (result[1]) {
              this.endStopOfRoute = result[1].Stops;
            }
            resolve();
          })
          .catch((err) => {
            console.log(err);
          });
      });
    },
    getEstimatedTimeOfArrivalApi() {
      return new Promise((resolve, reject) => {
        axios
          .get(
            `https://ptx.transportdata.tw/MOTC/v2/Bus/EstimatedTimeOfArrival/City/${this.$store.state.searchBusRoute.location}/${this.searchBusRoute}?%24top=500&%24format=JSON`,
            {
              headers: getAuthorizationHeader(),
            }
          )
          .then((response) => {
            response.data.forEach((element) => {
              let NextBusTime;
              if (element.NextBusTime === undefined) {
                NextBusTime = "未發車";
              } else {
                NextBusTime = element.NextBusTime.slice(11, 16);
              }
              // start 添加下一班時間
              if (element.Direction === 0) {
                for (let i = 0; i < this.startStopOfRoute.length; i++) {
                  if (
                    this.startStopOfRoute[i].StopName.Zh_tw ==
                    element.StopName.Zh_tw
                  ) {
                    if (element.EstimateTime != undefined) {
                      if (element.EstimateTime / 60 === 0) {
                        this.startStopOfRoute[i].nextBusTime = `進站中`;
                        this.startStopOfRoute[i].state = "pitStop";
                      } else if (element.EstimateTime / 60 <= 3) {
                        this.startStopOfRoute[i].nextBusTime = `${Math.trunc(
                          element.EstimateTime / 60
                        )}分鐘`;
                        this.startStopOfRoute[i].state = "comming";
                      } else {
                        this.startStopOfRoute[i].nextBusTime = `${Math.trunc(
                          element.EstimateTime / 60
                        )}分鐘`;
                        this.startStopOfRoute[i].state = "none";
                      }
                    } else {
                      this.startStopOfRoute[i].nextBusTime = NextBusTime;
                      this.startStopOfRoute[i].state = "none";
                    }
                    break;
                  }
                }
              }
              // end 添加下一班時間
              else if (element.Direction === 1) {
                for (let i = 0; i < this.endStopOfRoute.length; i++) {
                  if (
                    this.endStopOfRoute[i].StopName.Zh_tw ==
                    element.StopName.Zh_tw
                  ) {
                    if (element.EstimateTime != undefined) {
                      if (element.EstimateTime / 60 === 0) {
                        this.endStopOfRoute[i].nextBusTime = `進站中`;
                        this.endStopOfRoute[i].state = "pitStop";
                      } else if (element.EstimateTime / 60 <= 3) {
                        this.endStopOfRoute[i].nextBusTime = `${Math.trunc(
                          element.EstimateTime / 60
                        )}分鐘`;
                        this.endStopOfRoute[i].state = "comming";
                      } else {
                        this.endStopOfRoute[i].nextBusTime = `${Math.trunc(
                          element.EstimateTime / 60
                        )}分鐘`;
                        this.endStopOfRoute[i].state = "none";
                      }
                    } else {
                      this.endStopOfRoute[i].nextBusTime = NextBusTime;
                      this.endStopOfRoute[i].state = "none";
                    }
                    break;
                  }
                }
              }
            });

            for (let i = 1; i < this.startStopOfRoute.length; i++) {
              if (
                this.startStopOfRoute[i].state === "comming" &&
                this.startStopOfRoute[i - 1].state === "none"
              ) {
                this.startStopOfRoute[i].nextBusTime = `進站中`;
                this.startStopOfRoute[i].state = "pitStop";
              }
            }
            for (let i = 1; i < this.endStopOfRoute.length; i++) {
              if (
                this.endStopOfRoute[i].state === "comming" &&
                this.endStopOfRoute[i - 1].state === "none"
              ) {
                this.endStopOfRoute[i].nextBusTime = `進站中`;
                this.endStopOfRoute[i].state = "pitStop";
              }
            }
            resolve();
          })
          .catch((err) => {
            console.log(err);
          });
      });
    },
    getBusLineApi() {
      return new Promise((resolve, reject) => {
        axios
          .get(
            `https://ptx.transportdata.tw/MOTC/v2/Bus/Shape/City/${this.$store.state.searchBusRoute.location}/${this.searchBusRoute}?%24top=24&%24format=JSON`,
            {
              headers: getAuthorizationHeader(),
            }
          )
          .then((response) => {
            response.data.forEach((element) => {
              if (
                element.Direction === 0 &&
                this.searchBusRoute === element.RouteName.Zh_tw
              ) {
                this.$store.commit("setStartLine", element.Geometry);
              } else if (
                element.Direction === 1 &&
                this.searchBusRoute === element.RouteName.Zh_tw
              ) {
                this.$store.commit("setEndLine", element.Geometry);
              }
            });
            //如果無Direction資料
            if (this.$store.state.startLine === null) {
              response.data.forEach((element) => {
                if (
                  this.searchBusRoute === element.RouteName.Zh_tw &&
                  this.$store.state.startLine === null
                ) {
                  this.$store.commit("setStartLine", element.Geometry);
                } else if (
                  this.searchBusRoute === element.RouteName.Zh_tw &&
                  this.$store.state.startLine !== null
                ) {
                  this.$store.commit("setEndLine", element.Geometry);
                }
              });
            }
            if (this.$store.state.endLine === null) {
              this.$store.commit("setEndLine", this.$store.state.startLine);
            }
            resolve();
          })
          .catch((err) => {
            console.log(err);
          });
      });
    },
    renderStopOfRoute() {
      const Call = async () => {
        this.$store.commit("setLoading", true);
        await this.getStopOfRouteApi();
        await this.getEstimatedTimeOfArrivalApi();
        const postStoreStopOfRouteData = () => {
          this.$store.commit("setStartStopOfRoute", this.startStopOfRoute);
          this.$store.commit("setEndStopOfRoute", this.endStopOfRoute);
        };
        postStoreStopOfRouteData();
        await this.getBusLineApi();
        this.$store.commit("setLoading", false);
      };

      Call();
      this.timer = setInterval(() => {
        Call();
      }, 30000);
    },
  },
  watch: {
    "$store.state.windowWidth": function (newValue, oldValue) {
      if (newValue > 769) {
        this.isMobileShow = false;
      }
    },
    endStopName: {
      handler: function (newValue, oldValue) {
        if (newValue == "") {
          this.$store.commit("setBusPageActiveIndex", 0);
          this.activeIndex = 0;
        }
      },
      immediate: true,
    },
  },
  mounted() {
    this.initData();
    this.renderStopOfRoute();
  },
  unmounted() {
    this.$store.commit("setStartStopOfRoute", []);
    this.$store.commit("setEndStopOfRoute", []);
    this.$store.commit("setStartLine", null);
    this.$store.commit("setEndLine", null);
    if (this.timer) {
      clearInterval(this.timer);
    }
  },
};
</script>
<style lang="scss" scoped>
.m-header {
  display: none;
  position: relative;
  .icon-route {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    cursor: pointer;
  }
}
.container {
  .title {
    text-align: center;
  }
  .subTitle {
    margin-top: 5px;
    text-align: center;
  }
  .tabWrap {
    display: flex;
    > .tab {
      flex: 1;
      padding: 16px 0;
      text-align: center;
      border-bottom: 1px solid $gray;
      cursor: pointer;
    }
    .active {
      border-bottom: 1px solid #010101;
    }
  }
  .dynamicBusData {
    li {
      display: flex;
      align-items: center;
      > .time {
        flex: 2;
        width: 72px;
        height: 37px;
        line-height: 37px;
        text-align: center;
        background-color: $gray;
        border-radius: 8px;
        font-weight: 500;
      }
      > .routeName {
        flex: 5;
        height: 37px;
        line-height: 37px;
        padding-left: 16px;
      }
      > .icon {
        position: relative;
        flex: 1;
        height: 61px;
        &::before {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          content: "";
          display: block;
          width: 1px;
          height: 16px;
          background-color: #000;
        }
        &::after {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          content: "";
          display: block;
          width: 1px;
          height: 16px;
          background-color: #000;
        }
        > .circle {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          display: block;
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background-color: #000;
        }
      }
      &:first-child {
        > .icon {
          &::before {
            height: 0px;
          }
        }
      }
      &:last-child {
        > .icon {
          &::after {
            height: 0px;
          }
        }
      }
    }
    .pitStop {
      > .time {
        color: $red;
      }
      > .icon {
        > .circle {
          position: relative;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background-color: $red;
          &::before {
            position: absolute;
            left: 48%;
            top: 48%;
            transform: translate(-50%, -50%);
            display: block;
            content: "";
            width: 17px;
            height: 17px;
            border-radius: 50%;
            border: 2px solid $red;
            box-sizing: content-box;
          }
        }
      }
    }
    .comming {
      > .time {
        color: $red;
      }
      > .icon {
        > .circle {
          background-color: $red;
        }
      }
    }
  }
}

.m-mapContainer {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: #fff;
  .mapBackHeader {
    position: relative;
    left: 0;
    top: 0;
    width: 100%;
    height: 64px;
    background-color: rgba(255, 255, 255, 0.9);
    z-index: 99999;
    .icon-back {
      position: absolute;
      left: 5%;
      top: 50%;
      transform: translateY(-50%);
      cursor: pointer;
    }
    .title {
      width: 100%;
      line-height: 64px;
      text-align: center;
    }
  }
  .mapWrap {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 9999;
  }
}
@media screen and (max-width: 769px) {
  .m-header {
    display: block;
  }
}
</style>