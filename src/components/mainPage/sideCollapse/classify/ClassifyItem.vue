<template>
    <el-collapse accordion v-model="activeName" class="classifyItemCls" @change="collapseChangeOne">
        <el-collapse-item class="collapseItem" v-for="(item, i) in list" :key="i" :name="item.type">
            <template slot="title">
                <classifyTitle :data="item"/>
            </template>
            <keep-alive v-if="item.install">
                <div @click.stop>
                  <component :is="item.type" :total="item.total"></component>
                </div>
            </keep-alive>
        </el-collapse-item>
    </el-collapse>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import smoke from '@/components/smoke/SmokeCollapse';
import classifyTitle from './ClassifyTitle';
import airQuality from '../../../air/AirCollapse';
import geoMonitor from '../../../gasMonitor/CarContent';
import cover from '../../../service/trapdoor/TrapdoorAll';
import noise from '../../../noise/NoiseAll';
import water from '../../../riverWay/RiverWayCollapse';
import dustbin from '../../../service/dustbin/DustbinAll';
import hydrant from '../../../service/hydrant/HydrantAll';

export default {
  computed: {
    ...mapGetters(['collapseDeviceType', 'mapLevel']),
    activeName: {
      set(v) {
        this.SET_COLLAPSE_DEVICE_TYPE(v);
      },
      get() {
        return this.collapseDeviceType;
      },
    },
  },
  props: {
    list: {
      type: Array,
      required: true,
    },
  },
  watch: {
    mapLevel(val) {
      if (val < 3) {
        this.SET_COLLAPSE_DEVICE_TYPE('');
      }
    },
  },
  components: {
    classifyTitle, smoke, airQuality, geoMonitor, cover, noise, water, dustbin, hydrant,
  },
  methods: {
    ...mapMutations(['SET_COLLAPSE_DEVICE_TYPE', 'SET_CARCAD_FLAG']),
    collapseChangeOne(activeNames) {
      if (activeNames === 'geoMonitor') {
        this.SET_CARCAD_FLAG(!this.carCADisShow);
      } else {
        this.SET_CARCAD_FLAG(this.carCADisShow);
      }
    },
  },
};
</script>

<style lang="scss">
.classifyItemCls {
    .collapseItem{
        .el-collapse-item__header {
            background-color: transparent;
            height: auto;
            line-height: normal;
            padding-left: 0;
        }
        .el-collapse-item__arrow {
          display: inline-block!important;
          position: absolute;
          right: 0;
        }
    }
}
</style>
