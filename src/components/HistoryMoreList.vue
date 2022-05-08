<template>
  <div class="historyMoreList">
    <ul>
      <li v-for="(item, index) in favoriteList" :key="index">
        <div :class="item.icon"></div>
        <div class="info">
          <div class="title">{{ item.title }}</div>
          <div class="location">{{ item.location }}</div>
        </div>
        <div class="icon-bookmark1"></div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "history-more-list",
  data() {
    return {
      favoriteList: [
        {
          icon: "icon-searhHistory",
          title: "台中國家歌劇院",
          location: "台中市西屯區惠來路二段101號",
        },
        {
          icon: "icon-searhHistory",
          title: "審計新村",
          location: "台中市西區民生路368巷4弄8號",
        },
        {
          icon: "icon-searhHistory",
          title: "勤美誠品綠園道",
          location: "台中市西區公益路68號",
        },
        {
          icon: "icon-searhHistory",
          title: "秋紅谷",
          location: "台中市西屯區朝富路30號",
        },
        {
          icon: "icon-searhHistory",
          title: "后豐鐵馬道",
          location: "台中市豐原區國豐路三段",
        },
      ],
    };
  },
};
</script>
<style lang="scss" scoped>
.historyMoreList {
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
}
</style>