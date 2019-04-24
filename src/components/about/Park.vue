<template>
  <div class="content-main">
    <pentagon-list
      v-for="(item, inx) in pentagonListInfo"
      :key="inx"
      :list="item.list"
      :className="item.className"
    ></pentagon-list>
  </div>
</template>
<script>
import { appMapping } from '@/assets/js/appMapping';
import pentagonList from '@/components/PentagonList';

export default {
  name: 'Park',
  data() {
    return {
      appMapping,
      pentagonListInfo: [
        {
          list: [
            {
              value: '烟感监测',
              mapKey: 'smoke',
            },
            {
              value: '摄像头',
              mapKey: 'camera',
            },
          ],
          className: 'b-block5',
        },
        {
          list: [
            {
              value: '门磁监测',
              mapKey: 'doorlock',
            },
          ],
          className: 'doorlock1',
        },
        {
          list: [
            {
              value: '地磁',
              mapKey: 'geoMonitor',
            },
          ],
          className: 'geoMonitor2',
        },
      ],
    };
  },
  components: { pentagonList },
  created() {},
};
</script>

<style lang="scss">
@import "~scss_about";
.b-block5 {
  top: 72px;
  left: 743px;
  .line1 {
    width: 140px;
    left: -140px;
    top: 70px;
    .line2 {
      width: 90px;
      left: -90px;
      bottom: -2px;
      transform: rotate(78deg);
      transform-origin: right;
      .circle {
        top: -15px;
        left: -28px;
      }
    }
  }
}
.doorlock1 {
  top: 170px;
  right: 246px;
  .line1 {
    width: 150px;
    right: -150px;
    top: 5px;
    .line2 {
      width: 40px;
      right: -40px;
      bottom: -2px;
      transform: rotate(40deg);
      transform-origin: left;
      .circle {
        top: -13px;
        left: 39px;
      }
    }
  }
}
.geoMonitor2 {
  bottom: 205px;
  right: 609px;
  .line1 {
    width: 95px;
    left: -95px;
    top: 30px;
    .line2 {
      width: 50px;
      left: -50px;
      bottom: -2px;
      transform: rotate(-50deg);
      transform-origin: right;
      .circle {
        top: -15px;
        left: -28px;
      }
    }
  }
}
@import "~scss_about1920";
</style>
