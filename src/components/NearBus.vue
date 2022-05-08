<template>
  <!-- 目前附近的公車位置組件 NearBus (未完成)-->
  <div class="near-bus">
    <ul>
      <!-- 載入中 -->
      <template v-if="isLoading">
        <li class="loading"></li>
        <li class="loading"></li>
        <li class="loading"></li>
        <li class="loading"></li>
      </template>
      <!-- 載入完成 -->
      <template v-else>
        <li v-for="(item, index) in nearBusList" :key="index">
          <h1 class="bus-number">{{ item.RouteName.Zh_tw }}</h1>
          <h4 class="bus-time">{{ item.status }}</h4>
          <div class="bus-destination">{{ item.StopName.Zh_tw }}</div>
        </li>
      </template>
    </ul>
  </div>
</template>
<script>
import axios from "axios";
import getAuthorizationHeader from '@/tools/AuthorizationHeader';
export default {
  name: "near-bus",
  data() {
    return {
      nearBusList: [],
      isLoading: true,
    };
  },
  methods: {
    getEstimatedTimeOfArrivalApi(stationID) {
      this.isLoading = true;
      // 取得指定[縣市],[站位]的市區公車預估到站資料(N1)
      axios
        .get(
          `https://ptx.transportdata.tw/MOTC/v2/Bus/EstimatedTimeOfArrival/City/${this.$store.state.locationEn}/PassThrough/Station/${stationID}?%24top=30&%24format=JSON`,
          {
            headers: getAuthorizationHeader(),
          }
        )
        .then((response) => {
          this.nearBusList = [];
          // 遍歷資料
          response.data.forEach((element) => {
            // 如果有發車
            if (element.EstimateTime) {
              this.nearBusList.push({
                ...element,
                status: element.EstimateTime / 60 + "分鐘",
              });
            } else {
              this.nearBusList.push({
                ...element,
                status: "未發車",
              });
            }
          });
        })
        .then(()=> {
          this.isLoading = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  computed: {
    nearBusStop() {
      return this.$store.state.nearBusStop;
    },
    nearBusStopActiveIndex() {
      return this.$store.state.nearBusStopActiveIndex;
    },
  },
  watch: {
    nearBusStop(newValue) {
      // 當nearBusStop 有資料摳api (初次)
      if (newValue != "") {
        this.getEstimatedTimeOfArrivalApi(
          this.nearBusStop[this.nearBusStopActiveIndex].StationID
        );
      }
    },
    nearBusStopActiveIndex(newValue) {
      // 當nearBusStopActiveIndex 變更 摳api
      this.getEstimatedTimeOfArrivalApi(
        this.nearBusStop[this.nearBusStopActiveIndex].StationID
      );
    },
  },
};
</script>
<style lang="scss">
.near-bus {
  width: 100%;
  > ul {
    display: flex;
    flex-wrap: wrap;
    margin-top: 24px;
    li {
      flex: none;
      position: relative;
      width: 180px;
      height: 97px;
      margin-right: 20px;
      margin-bottom: 12px;
      background-color: $gray;
      border-radius: 8px;
      > .bus-number {
        position: absolute;
        left: 16px;
        top: 10px;
      }
      > .bus-time {
        position: absolute;
        left: 16px;
        bottom: 10px;
      }
      > .bus-destination {
        position: absolute;
        right: 16px;
        bottom: 12px;
      }
      // &:nth-child(2n) {
      //   margin-right: 0;
      // }
    }
    .loading {
      overflow: hidden;
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
  }
}

@media screen and (max-width: 769px) {
  .near-bus {
    width: 100%;
    overflow-x: scroll;
    > ul {
      display: flex;
      flex-wrap: nowrap;
    }
  }
}
</style>