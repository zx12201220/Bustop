<template>
<!-- 收藏的地點 組件(未完成) -->
  <div class="favorite-location-list">
    <ul>
      <li v-for="(item, index) in favoriteList" :key="index">
        <div :class="item.icon"></div>
        <div class="info">
          <div class="title">{{ item.title }}</div>
          <div class="location">{{ item.location }}</div>
        </div>
        <div class="icon-bookmark2"></div>
      </li>
    </ul>
    <div class="more-btn">
      展開更多
      <div class="icon-back"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: "favorite-list",
  data() {
    return {
      favoriteList: [
        {
          icon: "icon-company",
          title: "公司",
          location: "台灣大道二段200號",
        },
        {
          icon: "icon-searhHistory",
          title: "公司",
          location: "台灣大道二段200號",
        },
      ],
    };
  },
};
</script>
<style lang="scss" scope>
.favorite-location-list {
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
  .more-btn {
    display: flex;
    color: $blue;
    cursor: pointer;
    .icon-back {
      transform: rotate(-90deg);
    }
  }
}
</style>