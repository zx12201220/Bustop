<template>
  <div class="select-row">
    <h2>我在</h2>
    <select v-model="selectLocation">
      <option
        v-for="(item, index) in locationList"
        :value="item.City"
        :key="index"
      >
        {{ item.CityName }}
      </option>
    </select>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "select-location",
  data() {
    return {
      selectLocation: "Taichung",
      locationList: [
        {
          CityName: "臺北市",
          City: "Taipei",
        },
        {
          CityName: "新北市",
          City: "NewTaipei",
        },
        {
          CityName: "桃園市",
          City: "Taoyuan",
        },
        {
          CityName: "臺中市",
          City: "Taichung",
        },
        {
          CityName: "臺南市",
          City: "Tainan",
        },
        {
          CityName: "高雄市",
          City: "Kaohsiung",
        },
        {
          CityName: "基隆市",
          City: "Keelung",
        },
        {
          CityName: "新竹市",
          City: "Hsinchu",
        },
        {
          CityName: "新竹縣",
          City: "HsinchuCounty",
        },
        {
          CityName: "苗栗縣",
          City: "MiaoliCounty",
        },
        {
          CityName: "彰化縣",
          City: "ChanghuaCounty",
        },
        {
          CityName: "南投縣",
          City: "NantouCounty",
        },
        {
          CityName: "雲林縣",
          City: "YunlinCounty",
        },
        {
          CityName: "嘉義縣",
          City: "ChiayiCounty",
        },
        {
          CityName: "嘉義市",
          City: "Chiayi",
        },
        {
          CityName: "屏東縣",
          City: "PingtungCounty",
        },
        {
          CityName: "宜蘭縣",
          City: "YilanCounty",
        },
        {
          CityName: "花蓮縣",
          City: "HualienCounty",
        },
        {
          CityName: "臺東縣",
          City: "TaitungCounty",
        },
        {
          CityName: "金門縣",
          City: "KinmenCounty",
        },
        {
          CityName: "澎湖縣",
          City: "PenghuCounty",
        },
        {
          CityName: "連江縣",
          City: "LienchiangCounty",
        },
      ],
    };
  },
  watch: {
    selectLocation: {
      handler(newValue, oldValue) {
        this.$store.commit("setSelectLocation", newValue);
      },
    },
    location: {
      handler: function (newValue, oldValue) {
        if (newValue !== "") {
          for (let i = 0; i < this.locationList.length; i++) {
            if (this.locationList[i].CityName == this.location) {
              this.selectLocation = this.locationList[i].City;
              this.$store.commit("setLocationEn", this.locationList[i].City);
              break;
            }
          }
        }
      },
      //immediate: true,
    },
  },
  computed: {
    location() {
      return this.$store.state.location;
    },
  },
  mounted() {
    const initLocation = this.$store.state.selectLocation;
    this.selectLocation = initLocation;
  },
};
</script>
<style lang="scss" scoped>
.select-row {
  display: flex;
  height: 32px;
  line-height: 32px;
  margin-bottom: 20px;
  > select {
    background-color: transparent;
    border: none;
    font-size: 16px;
    font-weight: 700;
    font-family: "Noto Sans TC", sans-serif;
    outline: none;
    cursor: pointer;
  }
}
</style>