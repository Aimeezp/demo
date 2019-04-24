<template>
  <div class="content-main">
    <pentagon-list
      v-for="(item, inx) in pentagonListInfo"
      :key="inx"
      :list="item.list"
      :className="item.className"
      :showLine="item.showLine"
    ></pentagon-list>
  </div>
</template>
<script>
import { appMapping } from '@/assets/js/appMapping';
import pentagonList from '@/components/PentagonList';

export default {
  name: 'Zone',
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
          ],
          className: 'smoke2',
        },
        {
          list: [
            {
              value: '扬尘监测',
              mapKey: 'dust',
            },
            {
              value: '硫化氢监测',
              mapKey: 'h2s',
            },
            {
              value: '空气监测',
              mapKey: 'airQuality',
            },
          ],
          className: 'b-block8',
        },
        {
          list: [
            {
              value: '摄像头',
              mapKey: 'camera',
            },
          ],
          className: 'camera2',
          showLine: false,
        },
        {
          list: [
            {
              value: '门磁监测',
              mapKey: 'doorlock',
            },
          ],
          className: 'doorlock3',
        },
        {
          list: [
            {
              value: '地磁',
              mapKey: 'geoMonitor',
            },
          ],
          className: 'geoMonitor3',
        },
        {
          list: [
            {
              value: '水质监测',
              mapKey: 'water',
            },
          ],
          className: 'water1',
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
.smoke2 {
  top: 85px;
  left: 596px;
  .line1 {
    width: 70px;
    right: -70px;
    top: 10px;
    .line2 {
      width: 20px;
      right: -20px;
      bottom: -2px;
      transform: rotate(35deg);
      transform-origin: left;
      .circle {
        top: -13px;
        left: 20px;
      }
    }
  }
}
.b-block8 {
  top: 98px;
  right: 300px;
  .line1 {
    width: 100px;
    right: -100px;
    top: 60px;
    .line2 {
      width: 40px;
      right: -40px;
      bottom: -2px;
      transform: rotate(-65deg);
      transform-origin: left;
      .circle {
        top: -13px;
        left: 40px;
      }
    }
  }
}
.camera2 {
  top: 426px;
  left: 486px;
}
.doorlock3 {
  top: 420px;
  right: 420px;
  .line1 {
    width: 70px;
    left: -70px;
    top: 10px;
    .line2 {
      width: 60px;
      left: -60px;
      bottom: -2px;
      transform: rotate(-20deg);
      transform-origin: right;
      .circle {
        top: -13px;
        left: -27px;
      }
    }
  }
}
.geoMonitor3 {
  bottom: 115px;
  right: 562px;
  .line1 {
    width: 70px;
    left: -70px;
    top: 10px;
    .line2 {
      width: 20px;
      left: -20px;
      bottom: -2px;
      transform: rotate(-45deg);
      transform-origin: right;
      .circle {
        top: -13px;
        left: -27px;
      }
    }
  }
}
.water1 {
  bottom: 60px;
  right: 212px;
  .line1 {
    width: 60px;
    right: -60px;
    top: 30px;
    .line2 {
      width: 40px;
      right: -40px;
      bottom: -2px;
      transform: rotate(-65deg);
      transform-origin: left;
      .circle {
        top: -13px;
        left: 40px;
      }
    }
  }
}
</style>
