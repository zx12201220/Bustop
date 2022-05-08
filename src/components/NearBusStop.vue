<template>
  <!-- 目前附近的公車站牌位置組件 NearBusStop (debug)-->
  <div class="near-bus-stop">
    <!-- 載入中 -->
    <template v-if="isLoading">
      <ul>
        <li class="loading"></li>
        <li class="loading"></li>
        <li class="loading"></li>
        <li class="loading"></li>
      </ul>
    </template>
    <!-- 載入完成 -->
    <template v-else>
      <!-- mobile -->
      <template v-if="isMobile">
        <ul>
          <!-- 展開全部 -->
          <li
            v-for="(item, index) in nearByList"
            :key="index"
            :class="{ active: activeIndex == index }"
            @click="activeIndexHandler(index)"
          >
            {{ item.StationName.Zh_tw }}({{ item.distance }}公尺)
          </li>
        </ul>
      </template>
      <!-- desktop -->
      <template v-else-if="!isMobile">
        <ul>
          <!-- 預設顯示4個 -->
          <li
            v-for="(item, index) in nearByList.slice(0, 4)"
            :key="index"
            :class="{ active: activeIndex == index }"
            v-show="isShowMore"
            @click="activeIndexHandler(index)"
          >
            {{ item.StationName.Zh_tw }}({{ item.distance }}公尺)
          </li>
          <!-- 展開全部 -->
          <li
            v-for="(item, index) in nearByList"
            :key="index"
            :class="{ active: activeIndex == index }"
            v-show="!isShowMore"
            @click="activeIndexHandler(index)"
          >
            {{ item.StationName.Zh_tw }}({{ item.distance }}公尺)
          </li>
        </ul>
        <!-- 展開更多按鈕 -->
        <div class="more-btn" @click="isShowMore = !isShowMore">
          <span v-show="isShowMore">展開更多</span>
          <span v-show="!isShowMore">收起隱藏</span>
          <div v-show="isShowMore" class="icon-back"></div>
          <div v-show="!isShowMore" class="icon-back icon-up"></div>
        </div>
      </template>
    </template>
  </div>
</template>
<script>
import axios from "axios";
import getAuthorizationHeader from '@/tools/AuthorizationHeader';
export default {
  name: "ear-bus-stop",
  data() {
    return {
      activeIndex: 0,
      nearByList: [],
      isShowMore: false,
      isLoading: true,
      gps: [],
    };
  },
  methods: {
    activeIndexHandler(index) {
      this.activeIndex = index;
      this.$store.commit("setNearBusStopActiveIndex", index);
    },
    getNearByApi(gps) {
      this.isLoading = true;
      axios
        .get(
          `https://ptx.transportdata.tw/MOTC/v2/Bus/Station/NearBy?%24top=30&%24spatialFilter=nearby(${gps[0]}%2C%20${gps[1]}%2C%20300)&%24format=JSON`,
          {
            headers: getAuthorizationHeader(),
          }
        )
        .then((response) => {
          this.nearByList = [];
          //如果超出四個 展開更多
          if (response.data.length > 4) {
            this.isShowMore = true;
          }
          response.data.forEach((element) => {
            this.nearByList.push({
              ...element,
              distance: this.calcDistance(
                this.$store.state.gps[0],
                this.$store.state.gps[1],
                element.StationPosition.PositionLat,
                element.StationPosition.PositionLon,
                "K"
              ),
            });
          });

          this.$store.commit("setNearBusStop", this.nearByList);
        })
        .then(() => {
          this.isLoading = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    calcDistance(lat1, lon1, lat2, lon2, unit) {
      if (lat1 == lat2 && lon1 == lon2) {
        return 0;
      } else {
        let radlat1 = (Math.PI * lat1) / 180;
        let radlat2 = (Math.PI * lat2) / 180;
        let theta = lon1 - lon2;
        let radtheta = (Math.PI * theta) / 180;
        let dist =
          Math.sin(radlat1) * Math.sin(radlat2) +
          Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
          dist = 1;
        }
        dist = Math.acos(dist);
        dist = (dist * 180) / Math.PI;
        dist = dist * 60 * 1.1515;
        if (unit == "K") {
          dist = dist * 1.609344;
        }
        if (unit == "N") {
          dist = dist * 0.8684;
        }
        return parseInt(dist * 1000);
      }
    },
  },
  mounted() {
    this.gps = this.$store.state.gps;
    if (this.gps[0] !== undefined) {
      this.getNearByApi(this.gps);
    }
  },
  unmounted() {
    this.$store.commit("setNearBusStop", []);
    this.$store.commit("setNearBusStopActiveIndex", 0);
  },
  computed: {
    isMobile() {
      if (this.$store.state.windowWidth <= 769) {
        return true;
      }
      return false;
    },
  },
  watch: {
    "$store.state.gps": {
      handler(newVal, oldVal) {
        this.getNearByApi(newVal);
      },
    },
  },
};
</script>
<style lang="scss">
.near-bus-stop {
  width: 100%;
  margin-top: 12px;
  > ul {
    display: flex;
    flex-wrap: wrap;
    li {
      flex: none;
      width: 161px;
      padding: 12px 12px;
      margin-right: 10px;
      margin-bottom: 12px;
      background-color: $gray;
      font-size: 12px;
      font-weight: 400;
      line-height: 1.5;
      border-radius: 8px;
      cursor: pointer;
    }
    .loading {
      position: relative;
      overflow: hidden;
      height: 18px;
      &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, $gray, #faf0f0, $gray);
        animation: progress 1.5s ease-in-out infinite;
      }
    }

    @keyframes progress {
      0% {
        transform: translate3d(-100%, 0, 0);
      }
      100% {
        transform: translate3d(100%, 0, 0);
      }
    }
    > .active {
      color: $blue;
    }
  }
}
.more-btn {
  display: flex;
  align-items: center;
  color: $blue;
  cursor: pointer;
  .icon-back {
    transform: rotate(-90deg);
  }
  .icon-up {
    transform: rotate(90deg);
  }
}
@media screen and (max-width: 769px) {
  .near-bus-stop {
    width: 100%;
    margin-top: 18px;
    overflow-x: scroll;
    > ul {
      display: flex;
      flex-wrap: nowrap;
    }
  }
}
</style>