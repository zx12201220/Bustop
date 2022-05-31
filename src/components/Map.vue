<template>
  <div class="v-map">
    <!-- 初始化地圖設定 -->
    <l-map
      ref="myMap"
      :zoom="zoom"
      :maxZoom="16"
      :center="center"
      :options="options"
      @update:zoom="zoomUpdate"
      style="height: 100%"
    >
      <!-- 載入圖資 -->
      <l-tile-layer :url="url" />

      <!-- 自己所在位置 -->
      <l-marker ref="location" :lat-lng="center">
        <l-icon :icon-url="icon.type.center" :icon-size="centerSize" />
        <l-popup> 你的位置 </l-popup>
      </l-marker>
      <!-- 創建標記點 -->
      <l-marker :lat-lng="item.local" v-for="item in data" :key="item.id">
        <!-- 標記點樣式判斷 -->
        <l-icon
          :icon-url="
            item.state === 'comming'
              ? icon.type.comming
              : item.state === 'pitStop'
              ? icon.type.pitStop
              : icon.type.black
          "
          :icon-size="icon.iconSize"
          :popup-anchor="icon.popupAnchor"
        />
        <!-- 彈出視窗 -->
        <l-popup>
          {{ item.name }}
        </l-popup>
      </l-marker>

      <l-marker
        :lat-lng="item.local"
        v-for="(item, index) in nearBusStop"
        :key="index"
      >
        <!-- 標記點樣式判斷 -->
        <l-icon
          :icon-url="
            $store.state.nearBusStopActiveIndex === index
              ? icon.type.blue
              : icon.type.black1
          "
          :iconSize="[25, 41]"
          :iconAnchor="[12, 41]"
          :popupAnchor="[1, -34]"
          :shadowSize="[41, 41]"
          :popup-anchor="icon.popupAnchor"
        />
        <!-- 彈出視窗 -->
        <l-popup>
          {{ item.StationName.Zh_tw }}
        </l-popup>
      </l-marker>

      <l-geo-json
        :geojson="geojson"
        stroke="#000"
        :optionsStyle="{
          stroke: '#000',
          weight: 4,
          opacity: 1,
        }"
      ></l-geo-json>
    </l-map>
  </div>
</template>
<script>
import {
  LMap,
  LIcon,
  LTileLayer,
  LMarker,
  LTooltip,
  LPopup,
  LGeoJson,
} from "@vue-leaflet/vue-leaflet";
import "leaflet/dist/leaflet.css";
import Wkt from "wicket";
export default {
  name: "v-map",
  components: {
    LMap,
    LIcon,
    LTileLayer,
    LMarker,
    LTooltip,
    LPopup,
    LGeoJson,
  },
  data() {
    return {
      // 模擬資料
      data: [],
      zoom: 11, //13
      center: this.$store.state.mapCenter, //22.612961, 120.304167
      centerSize: [41, 41],
      url: "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}",
      options: {
        zoomControl: false,
        zoomSnap: 0.5,
        attributionControl: false,
      },
      icon: {
        type: {
          black: "./marker_none.png",
          pitStop: "./marker_pitStop.png",
          comming: "./marker_comming.png",
          center: "./gpsCenter.png",
          blue: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
          black1:
            "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-black.png",
        },
        iconSize: [20, 20],
        iconAnchor: [9, 32],
        popupAnchor: [1, -34],
      },
      busPageActiveIndex: this.$store.state.busPageActiveIndex,
      startStopOfRoute: [],
      endStopOfRoute: [],
      geojson: null,
      startLine: null,
      endLine: {
        coordinates: [],
        type: "LineString",
      },
      nearBusStop: [],
    };
  },
  methods: {
    zoomUpdate(zoom) {
      this.zoom = zoom;
    },
    centerUpdate(center) {
      this.center = center;
    },
  },
  watch: {
    "$store.state.isMobileShow": {
      handler: function (newValue, oldValue) {
        if (newValue == true) {
          this.$refs.myMap.leafletObject._onResize();
        }
      },
      // immediate: true,
    },
    "$store.state.busPageActiveIndex": {
      handler: function (newValue, oldValue) {
        this.busPageActiveIndex = newValue;
        if (newValue == 0) {
          this.data = this.startStopOfRoute;
          this.geojson = this.startLine;
        } else if (newValue == 1) {
          this.data = this.endStopOfRoute;
          this.geojson = this.endLine;
        }
      },
      immediate: true,
    },
    "$store.state.startStopOfRoute": {
      handler: function (newValue, oldValue) {
        if (newValue !== [] || newValue === undefined) {
          this.startStopOfRoute = [];
          newValue.forEach((element, index) => {
            this.startStopOfRoute.push({
              id: index,
              name: element.StopName.Zh_tw,
              state: element.state,
              local: [
                element.StopPosition.PositionLat,
                element.StopPosition.PositionLon,
              ],
            });
          });

          if (this.$store.state.busPageActiveIndex == 0) {
            this.data = this.startStopOfRoute;
          }
        }
      },
    },
    "$store.state.endStopOfRoute": {
      handler: function (newValue, oldValue) {
        if (newValue !== [] || newValue === undefined) {
          this.endStopOfRoute = [];
          newValue.forEach((element, index) => {
            this.endStopOfRoute.push({
              id: index,
              name: element.StopName.Zh_tw,
              state: element.state,
              local: [
                element.StopPosition.PositionLat,
                element.StopPosition.PositionLon,
              ],
            });
          });

          if (this.$store.state.busPageActiveIndex == 1) {
            this.data = this.endStopOfRoute;
          }
        }
      },
    },
    "$store.state.startLine": {
      handler: function (newValue, oldValue) {
        if (newValue !== null) {
          const wkt = new Wkt.Wkt();
          const geoTojson = wkt.read(newValue).toJson();
          this.startLine = geoTojson;
          if (this.busPageActiveIndex == 0) {
            this.geojson = geoTojson;
          }
        } else if (newValue === null) {
          this.geojson = {
            coordinates: [],
            type: "LineString",
          };
        }
      },
      immediate: true,
    },
    "$store.state.endLine": {
      handler: function (newValue, oldValue) {
        if (newValue !== null) {
          const wkt = new Wkt.Wkt();
          const geoTojson = wkt.read(newValue).toJson();
          this.endLine = geoTojson;
          if (this.busPageActiveIndex == 1) {
            this.geojson = geoTojson;
          } else if (newValue === null) {
            this.geojson = {
              coordinates: [],
              type: "LineString",
            };
          }
        }
      },
      immediate: true,
    },
    "$store.state.nearBusStop": {
      handler: function (newValue, oldValue) {
        this.nearBusStop = [];
        newValue.forEach((element) => {
          this.nearBusStop.push({
            ...element,
            local: [
              element.StationPosition.PositionLat,
              element.StationPosition.PositionLon,
            ],
          });
        });
      },
    },
    data: {
      handler: function (newValue, oldValue) {
        if (newValue !== [] || newValue === undefined) {
          this.$nextTick(() => {
            // 獲得中間站的座標 作為放大中心點
            const data = newValue[parseInt(newValue.length / 2)];
            if (data !== undefined) {
              this.centerSize = [0, 0];
              this.centerUpdate(data.local);
              this.zoomUpdate(15);
            }
          });
        }
      },
    },
    // $route(to, from) {
    //   if (from.path == "/busResult") {
    //     this.setGpsCenter();
    //   }
    // },
    zoom(newValue, oldValue) {
      if (newValue >= 17) {
        this.zoomUpdate(oldValue);
      }
    },
    isGpsReady: {
      handler: function (newValue, oldValue) {
        this.$nextTick(() => {
          if (newValue && this.$route.fullPath !== "/busResult") {
            if (this.$route.fullPath !== "/searchBus") {
              this.centerUpdate(this.$store.state.gps);
            } else {
              setTimeout(() => {
                this.centerUpdate(this.$store.state.gps);
                this.centerSize = [41, 41];

                setTimeout(() => {
                  this.zoomUpdate(16);
                }, 1000);
              }, 1000);
            }
          }
        });
      },
      immediate: true,
    },
  },
  computed: {
    isGpsReady() {
      const gps = this.$store.state.gps;
      if (gps == "" || gps == []) {
        return false;
      } else {
        return true;
      }
    },
  },
  mounted() {
    if (this.$store.state.nearBusStop[0] !== undefined) {
      this.nearBusStop = [];
      this.$store.state.nearBusStop.forEach((element) => {
        this.nearBusStop.push({
          ...element,
          local: [
            element.StationPosition.PositionLat,
            element.StationPosition.PositionLon,
          ],
        });
      });
    }
  },
};
</script>
<style lang="scss" scoped>
.v-map {
  width: 100%;
  height: 100%;
  border-radius: 8px;
  background-color: $gray;
}
</style>
<style>
path {
  stroke: #000 !important;
  stroke-width: 4;
}
</style>