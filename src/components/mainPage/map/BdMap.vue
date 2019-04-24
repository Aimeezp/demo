<template>
  <div class="bdMapCls">
    <baidu-map
      :class="['bdMapContent', data.length > 0 ? 'bdMapContentZindex': '']"
      :center="center"
      :zoom="zoom"
      @ready="handler"
      @zoomend="zoomEnd"
      :map-click="false"
      :double-click-zoom="false"
      :keyboard="false"
      :scroll-wheel-zoom="true"
      @moveend="syncCenter">
      <videoHome ref="videoHomeRefs"/>
      <mapMarker v-for="(item, i) in mapMarkers" :lng="item[0].lng" :lat="item[0].lat" :number="item.length" :list="item" @goInside="levelChange" :key="i"/>
      <bml-heatmap :data="data" :max="100" :radius="40"></bml-heatmap>
      <!--:gradient="{0.4: '#FF524B', 0.3:'#FCF747', 0.3: '#55F141', 0.1:'#8786F7'}"-->
    </baidu-map>
    <mapTool @direction="directionChange" @levelChange="levelChange"/>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import { BmlHeatmap } from 'vue-baidu-map';
import mapMarker from '@/components/mainPage/map/marker/MapMarker';
import mapTool from '@/components/mainPage/map/MapTool';
import { appMapping } from '@/assets/js/appMapping';
import videoHome from '../video/VideoHome';
import bus from '@/utils/eventBus';

export default {
  data() {
    return {
      // 默认定位到联通大厦： lng: 121.4000790000, lat: 31.2226820000
      center: {
        lng: 121.4000790000,
        lat: 31.2226820000,
      },
      zoom: 11,
      diffNum: 0.01,
      BMap: '',
      map: '',
      deviceList: [], // 后台传来的所有设备  遍历设备找出一个烟感，变成红色
      resData: [
        { lng: 121.672259, lat: 31.139179, count: 60 },
        { lng: 121.655586, lat: 31.199987, count: 70 },
        { lng: 121.817712, lat: 31.156981, count: 70 },
        { lng: 121.746423, lat: 30.879686, count: 70 },
      ],
      data: [],
    };
  },
  computed: {
    ...mapGetters(['sideDevice', 'markerLoadingFlag', 'mapLevel', 'mapMarkers', 'recordAirOpenFlag', 'collapseDeviceType']),
  },
  watch: {
    mapLevel(val) {
      switch (val) {
        case 1:
          this.diffNum = 0.05;
          break;
        case 2:
          this.diffNum = 0.01;
          break;
        case 3:
          this.diffNum = 0.0001;
          break;
        default:
          break;
      }
    },
    diffNum() {
      if (this.markerLoadingFlag) {
        this.pointAggregation();
      }
    },
    collapseDeviceType() {
      this.getThermalPowerChartData();
      if (this.markerLoadingFlag) {
        this.pointAggregation();
        this.deviceToCenter();
      }
    },
    sideDevice() {
      if (this.markerLoadingFlag) {
        this.pointAggregation();
      }
    },
  },
  components: {
    mapMarker, mapTool, BmlHeatmap, videoHome,
  },
  methods: {
    ...mapMutations(['SET_MAP_LEVEL', 'SET_MAP_MARKERS', 'SET_MARKER_LOADING_FLAG']),
    // 地图回调
    handler({ BMap, map }) {
      this.BMap = BMap;
      this.map = map;
      this.zoom = 11;
      this.diffNum = 0.05;
      this.center = {
        lng: 121.4000790000,
        lat: 31.2226820000,
      };
    },
    // 同步地图的center
    syncCenter(e) {
      const { lng, lat } = e.target.getCenter();
      this.center = { lng, lat };
      this.zoom = e.target.getZoom();
    },
    zoomEnd(e) {
      const zoom = e.target.getZoom();
      let level = 1;
      if (zoom >= 18) {
        level = 3;
      } else if (zoom >= 12 && zoom < 18) {
        level = 2;
      }
      this.zoom = zoom;
      this.SET_MAP_LEVEL(level);
    },
    // 查询所有的设备
    getAllDeviceData() {
      this.SET_MARKER_LOADING_FLAG(false);
      window.vaApi.getDevices().then((res) => {
        const { status, data } = res.data;
        if (parseInt(status, 10) === 1) {
          this.deviceList = data;
          this.pointAggregation();
        }
        this.SET_MARKER_LOADING_FLAG(true);
      });
    },
    // 点聚合
    pointAggregation() {
      // 过滤掉经纬度不存在的点
      let vaildList = this.deviceList.filter(v => v.lng && v.lat && this.sideDevice.some(z => appMapping[z].val === v.deviceType));
      // 根据打开的设备类型过滤设备
      if (this.collapseDeviceType) {
        vaildList = vaildList.filter(v => v.deviceType === appMapping[this.collapseDeviceType].val);
      }
      const points = [];
      if (vaildList && vaildList.length > 0) this.aggregation(vaildList, points);
      // 解决mapMarkers改变后，地图上点显示不正确，移动地图才正常的问题
      this.SET_MAP_MARKERS([]);
      this.$nextTick(() => {
        this.SET_MAP_MARKERS(points);
      });
    },
    // 递归聚合
    aggregation(vaildList, points) {
      const sameDevice = [vaildList[0]];
      const notSame = [];
      for (let i = 1; i < vaildList.length; i += 1) {
        if (Math.abs(vaildList[0].lat - vaildList[i].lat) < this.diffNum
          && (Math.abs(vaildList[0].lng - vaildList[i].lng) < this.diffNum)) {
          sameDevice.push(vaildList[i]);
        } else {
          notSame.push(vaildList[i]);
        }
      }
      points.push(sameDevice);
      if (notSame.length > 1) {
        this.aggregation(notSame, points);
      } else if (notSame.length === 1) {
        points.push(notSame);
      }
    },
    levelChange() {
      const center = {
        lng: 121.4000790000,
        lat: 31.2226820000,
      };
      const distance = 0.00000001;
      this.center = {
        lng: center.lng - distance,
        lat: center.lat - distance,
      };
      this.$nextTick(() => {
        this.center = center;
        switch (this.mapLevel) {
          case 1:
            this.zoom = 11;
            break;
          case 2:
            this.zoom = 15;
            break;
          case 3:
            this.zoom = 18;
            break;
          default:
            break;
        }
      });
    },
    // 地图移动控制
    directionChange(direction) {
      switch (direction) {
        case 'top':
          this.center.lat += 0.01;
          break;
        case 'bottom':
          this.center.lat -= 0.01;
          break;
        case 'left':
          this.center.lng -= 0.01;
          break;
        case 'right':
          this.center.lng += 0.01;
          break;
        default:
          break;
      }
    },
    getThermalPowerChartData() {
      this.data = [];
      if (this.collapseDeviceType === 'airQuality') {
        window.vaApi.getAirThermalPowerChart().then(({ data: { data, status } }) => {
          if (parseInt(status, 10) === 1) {
            this.data = data;
          }
        });
      } else if (this.collapseDeviceType === 'water') {
        window.vaApi.getRiverWayThermalPowerChartData().then(({ data: { data, status } }) => {
          if (parseInt(status, 10) === 1) {
            this.data = data;
          }
        });
      } else {
        this.data = [];
      }
    },
    // 右侧列表展开后，相应的设备移动到地图中间
    deviceToCenter() {
      const { collapseDeviceType } = this;
      if (collapseDeviceType) {
        const type = appMapping[collapseDeviceType].val;
        this.$nextTick(() => {
          for (let i = 0; i < this.mapMarkers.length; i += 1) {
            let flag = false;
            for (let j = 0; j < this.mapMarkers[i].length; j += 1) {
              const { deviceType, lng, lat } = this.mapMarkers[i][j];
              if (type === deviceType) {
                this.center = { lng, lat };
                flag = true;
                break;
              }
            }
            if (flag) break;
          }
        });
      }
    },
  },
  created() {
    bus.$on('fullAlarm', () => {
      for (let i = 0; i < this.deviceList.length; i += 1) {
        if (this.deviceList[i].deviceType === appMapping.smoke.val) {
          this.deviceList[i].alarmState = 'alarm';
          this.pointAggregation();
          break;
        }
      }
    });
    this.getThermalPowerChartData();
    this.getAllDeviceData();
  },
};
</script>

<style lang="scss">
.bdMapCls {
  height: 100%;
  .bdMapContent{
    height: 100%;
  }
  .bdMapContentZindex {
    .BMap_mask + div >div:last-child{
      z-index: 900!important;
    }
  }
}
</style>
