<template>
  <div class="m-header">
    <RouteHeader />
  </div>
  <SelectLocation />
  <div class="searchWrap">
    <form action="javascript:void 0">
      <input
        type="search"
        placeholder="搜尋公車路線/站牌"
        ref="myinput"
        v-model="searchKeyWord"
        @keydown.enter="getKeywordBusList(searchKeyWord)"
        @input="getKeywordBusList(searchKeyWord)"
      />
    </form>
  </div>
  <div class="busList">
    <ul>
      <li
        v-for="(item, index) in busList"
        :key="index"
        @click="
          nextPage(item.title, item.OperatorName, item.startStop, item.endStop)
        "
      >
        <div :class="item.icon"></div>
        <div class="info">
          <div class="title">{{ item.title }}</div>
          <div class="location">{{ item.location }}</div>
        </div>
        <div
          @click.stop="likeHandler(index)"
          :class="{
            'icon-heart1': item.favorite,
            'icon-heart2': !item.favorite,
          }"
        ></div>
      </li>
    </ul>
  </div>
</template>
<script>
import RouteHeader from "@/components/RouteHeader.vue";
import SelectLocation from "@/components/SelectLocation.vue";
import axios from "axios";
import getAuthorizationHeader from '@/tools/AuthorizationHeader';
export default {
  name: "bus-time",
  components: {
    RouteHeader,
    SelectLocation,
  },
  data() {
    return {
      busList: [],
      searchKeyWord: "",
    };
  },
  methods: {
    getFavoriteList() {
      //取得我的最愛列表
      let data = localStorage.getItem("busTop_favorlist");
      if (data !== null) {
        return JSON.parse(data);
      } else {
        return [];
      }
    },
    saveFavoriteList(data) {
      //將資料儲存到localStorage
      localStorage.setItem("busTop_favorlist", JSON.stringify(data));
    },
    likeHandler(index) {
      //將資料夾到我的最愛
      //獲取localStorage列表
      let localStorageData = this.getFavoriteList();
      //獲取狀態
      let state = this.busList[index].favorite;
      //if false
      if (!state) {
        localStorageData.push({
          location: this.$store.state.selectLocation,
          routeName: this.busList[index].title,
          OperatorName: this.busList[index].OperatorName,
          startStop: this.busList[index].startStop,
          endStop: this.busList[index].endStop,
        });
        this.saveFavoriteList(localStorageData);
        this.busList[index].favorite = true;
      }
      // if true
      else if (state) {
        let longWords = localStorageData.filter(
          (element) =>
            element.locationthis !== this.$store.state.selectLocation &&
            element.routeName !== this.busList[index].title
        );
        this.saveFavoriteList(longWords);
        this.busList[index].favorite = false;
      }
    },
    getKeywordBusList(keyword) {
      if (keyword !== "") {
        axios
          .get(
            `https://ptx.transportdata.tw/MOTC/v2/Bus/Route/City/${this.$store.state.selectLocation}/${keyword}?%24top=30&%24format=JSON`,
            {
              headers: getAuthorizationHeader(),
            }
          )
          .then((response) => {
            //清空資料
            this.busList = [];
            //遍歷資料到busList
            response.data.forEach((element) => {
              const RouteName = element.RouteName.Zh_tw;
              const OperatorName = element.Operators[0].OperatorName.Zh_tw;
              let startStop = element.DestinationStopNameZh;
              let endStop = element.DepartureStopNameZh;

              if (startStop === undefined) startStop = "";
              if (endStop === undefined) endStop = "";

              let localStorageData = this.getFavoriteList();
              let favoriteState = false;
              localStorageData.forEach((element) => {
                if (
                  element.location === this.$store.state.selectLocation &&
                  element.routeName === RouteName
                ) {
                  favoriteState = true;
                }
              });
              this.busList.push({
                icon: "icon-bus",
                title: RouteName,
                location: `${startStop} - ${endStop}`,
                OperatorName: OperatorName,
                startStop: startStop,
                endStop: endStop,
                favorite: favoriteState,
              });
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    nextPage(routeName, OperatorName, startStop, endStop) {
      this.$store.commit("setSearchBusRoute", {
        location: this.$store.state.selectLocation,
        routeName: routeName,
        OperatorName: OperatorName,
        startStop: startStop,
        endStop: endStop,
      });

      this.$router.push("/busResult");
    },
  },
  watch: {
    searchKeyWord: {
      handler(newValue, oldValue) {
        //如果搜尋欄是空值 給列表也清空
        if (newValue === "") {
          this.busList = [];
        }
      },
    },
  },
  mounted() {
    this.$refs.myinput.focus();
  },
};
</script>
<style lang="scss" scoped>
.m-header {
  display: none;
}
.searchWrap {
  height: 55px;
  form {
    height: 100%;
    > input {
      width: 100%;
      height: 100%;
      padding: 0 26px;
      outline: none;
      border: none;
      background-color: $gray;
      border-radius: 8px;
      font-weight: 500;
    }
  }
}
.busList {
  width: 100%;
  > ul {
    display: flex;
    flex-wrap: wrap;
    li {
      flex: none;
      width: 100%;
      height: 77px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #d6d6d6;
      cursor: pointer;
      &:last-child {
        border-bottom: 0;
      }
      .info {
        flex: 1;
        height: 50%;
        line-height: 1.6;
        padding-left: 25px;
      }
    }
  }
}
@media screen and (max-width: 769px) {
  .m-header {
    display: block;
  }
}
</style>