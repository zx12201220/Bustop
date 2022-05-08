<template>
  <!-- 公車 我的最愛組件 -->
  <div class="favoriteBusList">
    <template v-if="isMobile">
      <div class="title-row" v-show="hasData">
        <div class="icon-heart1"></div>
        <h2>我的最愛</h2>
      </div>
    </template>
    <!-- 如果資料沒有超過2筆 -->
    <template v-if="!isOver">
      <ul>
        <li
          v-for="(item, index) in favoriteList"
          :key="index"
          @click="
            nextPage(
              item.title,
              item.OperatorName,
              item.startStop,
              item.endStop,
              item.location
            )
          "
        >
          <div :class="item.icon"></div>
          <div class="info">
            <div class="title">{{ item.title }}</div>
            <div class="location">
              {{ item.startStop }} - {{ item.endStop }}
            </div>
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
    </template>
    <!-- 如果資料超過兩筆 -->
    <template v-else-if="isOver">
      <ul>
        <!-- 超過顯示2個 -->
        <li
          v-for="(item, index) in favoriteList.slice(0, 2)"
          :key="index"
          v-show="isShowMore"
          :class="{ borderBottomNone: index == 1 }"
          @click="
            nextPage(
              item.title,
              item.OperatorName,
              item.startStop,
              item.endStop,
              item.location
            )
          "
        >
          <div :class="item.icon"></div>
          <div class="info">
            <div class="title">{{ item.title }}</div>
            <div class="location">
              {{ item.startStop }} - {{ item.endStop }}
            </div>
          </div>
          <div
            @click.stop="likeHandler(index)"
            :class="{
              'icon-heart1': item.favorite,
              'icon-heart2': !item.favorite,
            }"
          ></div>
        </li>
        <!-- 展開全部 -->
        <li
          v-for="(item, index) in favoriteList"
          :key="index"
          v-show="!isShowMore"
          @click="
            nextPage(
              item.title,
              item.OperatorName,
              item.startStop,
              item.endStop
            )
          "
        >
          <div :class="item.icon"></div>
          <div class="info">
            <div class="title">{{ item.title }}</div>
            <div class="location">
              {{ item.startStop }} - {{ item.endStop }}
            </div>
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
      <!-- 展開更多按鈕 -->
      <div class="more-btn" @click="isShowMore = !isShowMore">
        <span v-show="isShowMore">展開更多</span>
        <span v-show="!isShowMore">收起隱藏</span>
        <div v-show="isShowMore" class="icon-back"></div>
        <div v-show="!isShowMore" class="icon-back icon-up"></div>
      </div>
    </template>
  </div>
</template>
<script>
export default {
  name: "favorite-bus-list",
  data() {
    return {
      favoriteList: [],
      hasData: false,
      isShowMore: false,
      isOver: false,
    };
  },
  methods: {
    getFavoriteList() {
      //localStorage 取得我最愛列表
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
      let state = this.favoriteList[index].favorite;
      //if false
      if (!state) {
        localStorageData.push({
          location: this.$store.state.selectLocation,
          routeName: this.favoriteList[index].title,
          OperatorName: this.favoriteList[index].OperatorName,
          startStop: this.favoriteList[index].startStop,
          endStop: this.favoriteList[index].endStop,
        });
        this.saveFavoriteList(localStorageData);
        this.favoriteList[index].favorite = true;
      }
      // if true
      else if (state) {
        let longWords = localStorageData.filter(
          (element) =>
            element.locationthis !== this.$store.state.selectLocation &&
            element.routeName !== this.favoriteList[index].title
        );
        this.saveFavoriteList(longWords);
        this.favoriteList[index].favorite = false;
      }
    },
    nextPage(routeName, OperatorName, startStop, endStop, location) {
      this.$store.commit("setSearchBusRoute", {
        location: location,
        routeName: routeName,
        OperatorName: OperatorName,
        startStop: startStop,
        endStop: endStop,
      });

      this.$router.push("/busResult");
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
  mounted() {
    //獲取localStorage列表
    let localStorageData = this.getFavoriteList();
    this.favoriteList = [];
    //將localStorage資料放到data
    localStorageData.forEach((element) => {
      this.favoriteList.push({
        icon: "icon-bus",
        title: element.routeName,
        location: element.location,
        BusStopToFrom: element.BusStopToFrom,
        OperatorName: element.OperatorName,
        startStop: element.startStop,
        endStop: element.endStop,
        favorite: true,
      });
    });
    //如果超出四個 展開更多
    if (this.favoriteList.length > 2) {
      this.isShowMore = true;
      this.isOver = true;
    }
    //如果沒資料不顯示 標題
    if (this.favoriteList.length !== 0) {
      this.hasData = true;
    }
  },
};
</script>
<style lang="scss" scoped>
.favoriteBusList {
  width: 100%;
  margin-top: 16px;
  .favoriteTile {
    font-weight: 400;
    margin-top: 16px;
  }
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
    .borderBottomNone {
      border-bottom: none;
    }
  }

  .title-row {
    display: flex;
    align-items: center;
    height: 23px;
    > h2 {
      margin-left: 8px;
    }
  }
}

.more-btn {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  color: $blue;
  cursor: pointer;
  .icon-back {
    transform: rotate(-90deg);
  }
  .icon-up {
    transform: rotate(90deg);
  }
}
</style>