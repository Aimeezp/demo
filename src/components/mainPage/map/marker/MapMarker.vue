<template>
    <bm-overlay
        pane="floatPane"
        class="bmOverlayCls"
        :class="overlayCls"
        @draw="draw"
        @click.native="goInside">
        <insideWindow :list="list" v-show="active && (mapLevel<=2||!showDustbin)"/>
        <dustWindow :list="list" :showFlag="active && (mapLevel>2&&showDustbin)"/>
        <div
          @mouseover="active = true"
          @mouseleave="active = false">{{number}}</div>
    </bm-overlay>
</template>

<script>
import { mapGetters } from 'vuex';
import insideWindow from '@/components/mainPage/map/marker/InsideWindow';
import dustWindow from '@/components/mainPage/map/marker/DustbinWindow';

export default {
  data() {
    return {
      active: false,
      showDustbin: false,
    };
  },
  props: {
    lng: {
      require: true,
    },
    lat: {
      require: true,
    },
    number: {
      require: true,
    },
    list: {
      type: Array,
      require: true,
    },
  },
  computed: {
    ...mapGetters(['mapLevel', 'collapseDeviceType']),
    overlayCls() {
      const classArr = [];
      if (this.active) classArr.push('active');
      if (this.mapLevel > 2) {
        classArr.push('insideMarkerCls');
        if (this.list.some(v => v.alarmState === 'alarm')) {
          classArr.push('alarmMarker');
        } else if (this.list.some(v => v.onlineState === 'lost')) {
          classArr.push('warnMarker');
        }
      } else {
        classArr.push('outsideMarkerCls');
      }
      return classArr.join(' ');
    },
  },
  components: { insideWindow, dustWindow },
  methods: {
    draw({ el, BMap, map }) {
      const pixel = map.pointToOverlayPixel(new BMap.Point(this.lng, this.lat));
      const ele = el;
      ele.style.left = `${pixel.x - (this.mapLevel > 2 ? 22 : 40)}px`;
      ele.style.top = `${pixel.y - (this.mapLevel > 2 ? 22 : 19)}px`;
    },
    goInside() {
      if (this.mapLevel < 3) {
        this.$store.commit('SET_MAP_LEVEL', this.mapLevel + 1);
        this.$emit('goInside');
      }
    },
    // 判断是否展示垃圾箱弹窗
    judgeDustbinWindow() {
      this.showDustbin = false;
      if (this.mapLevel === 3) {
        if (this.collapseDeviceType === 'dustbin') {
          this.showDustbin = true;
        }
      }
    },
  },
  created() {
    this.judgeDustbinWindow();
  },
};
</script>

<style lang="scss">
$insideSize: 44px;

.bmOverlayCls{
  &.insideMarkerCls {
    position: absolute;
    width: $insideSize;
    height: $insideSize;
    line-height: $insideSize;
    text-align: center;
    font-size: 24px;
    color: #FFFFFF;
    background-color: #4DA8F3;
    box-shadow: 0 2px 8px 0 #269DFF;
    border-radius: 50%;
    &.active {
      z-index: 1;
    }
    &.alarmMarker {
      background-color: #F35C4D;
    }
    &.warnMarker {
      background-color: #F38715;
    }
  }
  &.outsideMarkerCls {
    position: absolute;
    width: 80px;
    height: 38px;
    line-height: 38px;
    text-align: center;
    font-size: 18px;
    color: #269DFF;
    background-color: #FFFFFF;
    box-shadow: 0 2px 8px 0 #269DFF;
    border-radius: 27px;
    cursor: pointer;
    &.active {
      background-color: #4DA8F3;
      font-size: 24px;
      color: #FFFFFF;
      z-index: 1;
    }
  }
}
</style>
