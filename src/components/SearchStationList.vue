<template>
  <div class="searchStationList">
    <h3>建議路線</h3>
    <p>找到3個結果</p>
    <div class="stationDetailsCard">
      <div class="head">
        <h3>步行2分鐘</h3>
        <div class="icon-back"></div>
        <div class="icon-bus"></div>
        <div class="number">55</div>
        <div class="min">15分鐘</div>
      </div>
      <div class="body">
        <div class="body-row">
          <div class="icon-clock"></div>
          <h4>下午6:03-下午6:18</h4>
        </div>
        <div class="body-row">
          <p>每10分鐘一班從台中火車站發車</p>
          <span class="state crowded">不擁擠</span>
          <div class="icon-searhHistory"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "search-station-list",
};
</script>
<style lang="scss">
.searchStationList {
  width: 100%;
  box-sizing: border-box;
  overflow-y: scroll;
  > h3 {
    margin: 20px 0 0 20px;
  }
  > p {
    margin: 5px 0 20px 20px;
  }
  .stationDetailsCard {
    height: 119px;
    background-color: $gray;
    padding: 12px;
    box-sizing: border-box;
    border-radius: 8px;
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
    .body {
      .body-row {
        display: flex;
        align-items: center;
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
        .state {
          margin-left: 8px;
        }
        .crowded {
          color: $green;
        }
      }
    }
  }
}
</style>