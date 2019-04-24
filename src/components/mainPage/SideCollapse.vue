<template>
    <section class="sideCollapseCls" @click="scroll" ref="sideCollapseRef">
        <warnInfo :list="warnData"/>
        <el-collapse @change="collapseChangeOne" v-model="collapseActive" class="mainClassify">
            <el-collapse-item v-for="(item, i) in appData" :title="item.title" :name="i" :key="i">
                <classifyItem :list="item.list" />
            </el-collapse-item>
        </el-collapse>
    </section>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import warnInfo from '@/components/mainPage/sideCollapse/WarnInfo';
import classifyItem from '@/components/mainPage/sideCollapse/classify/ClassifyItem';
import mapLevelData from '@/assets/js/mainPage/map/mapLevelData';
import { appMapping } from '@/assets/js/appMapping';

export default {
  data() {
    return {
      collapseActive: [0, 1, 2, 3, 4, 5],
      appData: [
        {
          list: [
            {
              type: 'airQuality', title: '空气质量', total: 0, offline: 0, install: true,
            },
            {
              type: 'water', title: '河道水质', total: 0, offline: 0, install: true,
            },
            {
              type: 'noise', title: '噪声监测', total: 0, offline: 0, install: true,
            },
          ],
          title: '公共环境',
        },
        {
          list: [
            {
              type: 'dustbin', title: '垃圾桶', total: 0, offline: 0, install: true,
            },
            {
              type: 'hydrant', title: '消防栓帽', total: 0, offline: 0, install: true,
            },
            // {
            //   type: 'geoMonitor', title: '应急车道', total: 0, offline: 0,
            // },
            {
              type: 'cover', title: '井盖监测', total: 0, offline: 0, install: true,
            },
          ],
          title: '公共设施',
        },
        {
          list: [
            {
              type: 'smoke', title: '烟感监测', total: 0, offline: 0, install: true,
            },
            // {
            //   type: 'gasMonitor', title: '燃气监测', total: 0, offline: 0,
            // },
            // {
            //   type: 'infraRed', title: '红外监测', total: 0, offline: 0,
            // },
          ],
          title: '公共安全',
        },
        {
          list: [
            {
              type: 'geoMonitor', title: '停车地磁', total: 0, offline: 0, install: true,
            },
          ],
          title: '公共停车',
        },
        // {
        //   list: [
        //     {
        //       type: 'light', title: '智能灯杆', total: 0, offline: 0,
        //     },
        //   ],
        //   title: '公共照明',
        // },
      ],
      warnData: [
        { type: 'smoke', title: '烟感', number: 0 },
        // { type: 'gasMonitor', title: '燃气', number: 0 },
        // { type: 'infraRed', title: '红外', number: 0 },
        { type: 'dustbin', title: '垃圾桶', number: 0 },
        { type: 'cover', title: '井盖', number: 0 },
        { type: 'geoMonitor', title: '违停', number: 0 },
      ],
    };
  },
  mounted() {
    this.getCollapseActivData();
  },
  computed: { ...mapGetters(['mapLevel', 'mapMarkers', 'markerLoadingFlag', 'collapseDeviceType']) },
  watch: {
    mapMarkers() {
      if (this.markerLoadingFlag) {
        setTimeout(() => {
          this.dataCollect();
        }, 0);
      }
    },
  },
  components: { warnInfo, classifyItem },
  methods: {
    ...mapMutations(['SET_RECORD_COLLAPSE_ONE']),
    getCollapseActivData() {
      let i = 0;
      this.appData.forEach(() => {
        this.collapseActive[i] = i;
        i += 1;
      });
    },
    collapseChangeOne(activeNames) {
      this.getCollapseActivData();
      this.SET_RECORD_COLLAPSE_ONE(activeNames);
    },
    // 根据地图展示等级展示右侧数据
    dataCollect() {
      const {
        maxLng, minLng, maxLat, minLat,
      } = mapLevelData[this.mapLevel];
      if (!this.mapMarkers || this.mapMarkers === 0) return;
      // 重置为0
      this.appData.forEach((v) => {
        v.list.forEach((val) => {
          const z = val;
          z.total = 0;
          z.offline = 0;
        });
      });
      this.warnData.forEach((v) => {
        const val = v;
        val.number = 0;
      });
      // 过滤数据
      this.mapMarkers.forEach((arr) => {
        const {
          lng, lat,
        } = arr[0];
        if (lng > minLng && lng < maxLng && lat > minLat && lat < maxLat) {
          arr.forEach((v) => {
            const {
              deviceType, onlineState, alarmState,
            } = v;
            for (let i = 0; i < this.appData.length; i += 1) {
              const { list } = this.appData[i];
              let flag = false;
              for (let j = 0; j < list.length; j += 1) {
                if (deviceType === appMapping[list[j].type].val) {
                  list[j].total += 1;
                  if (onlineState === 'lost') {
                    list[j].offline += 1;
                  }
                  flag = true;
                  break;
                }
              }
              if (flag) break;
            }
            if (alarmState === 'alarm') {
              const obj = this.warnData.find(z => appMapping[z.type].val === deviceType);
              if (obj) {
                obj.number += 1;
              }
            }
          });
        }
      });
    },
    scroll(e) {
      let i = 0;// 防死锁
      let ele = e.target;
      while (!ele.className || ele.className.indexOf('classifyTitleCls') === -1 || i > 20) {
        i += 1;
        ele = ele.parentNode;
      }
      setTimeout(() => {
        if (this.collapseDeviceType) {
          const { top } = ele.getBoundingClientRect();
          const lastScrollTop = this.$refs.sideCollapseRef.scrollTop;
          const nowTop = parseInt(top, 10) + parseInt(lastScrollTop, 10) - 60;
          this.$refs.sideCollapseRef.scrollTop = nowTop;
        } else {
          this.$refs.sideCollapseRef.scrollTop = 0;
        }
        this.lastScrollTop = this.$refs.sideCollapseRef.scrollTop;
      }, 100);
    },
  },
};
</script>

<style lang="scss">
$bg: rgba($color: #fff, $alpha: 0.86);

.sideCollapseCls {
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    width: 400px;
    background-color: $bg;
    overflow: auto;
      .el-collapse-item__header {
        background-color: #EEEFF3;
        border-bottom: 1px solid $bg;
        padding-left: 10px;
      }
      .el-collapse-item__wrap {
        background-color: transparent;
      }
      .el-collapse-item{
        .el-collapse-item__arrow {
          display: none;
        }
      }
}
</style>
