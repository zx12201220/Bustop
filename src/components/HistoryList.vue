<template>
<!-- 搜尋過的地點 組件(未完成) -->
  <div class="history-list">
    <div class="history-title">搜尋過的地點</div>
    <ul>
      <li>
        <div class="icon-bookmark2"></div>
        <h3>公司</h3>
      </li>
      <li><h3>台中歌劇院</h3></li>
      <li><h3>台中歌劇院</h3></li>
      <li><h3>台中歌劇院</h3></li>
      <li><h3>台中歌劇院</h3></li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "history-list",
};
</script>
<style lang="scss">
.history-list {
  width: 100%;
  margin: 16px 0 12px 0;
  .history-title {
    margin-bottom: 12px;
  }
  > ul {
    display: flex;
    flex-wrap: wrap;
    li {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 12px;
      margin-bottom: 8px;
      padding: 13px 24px;
      background-color: $gray;
      cursor: pointer;
      border-radius: 8px;
      > div {
        margin-right: 12px;
      }
    }
  }
}
@media screen and (max-width: 769px) {
  .history-list {
    > ul {
      overflow-x: scroll;
      display: flex;
      flex-wrap: nowrap;
      li {
        flex: none;
      }
    }
  }
}
</style>