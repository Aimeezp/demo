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
  name: 'Campus',
  data() {
    return {
      appMapping,
      pentagonListInfo: [
        {
          list: [
            {
              value: '空气监测',
              mapKey: 'airQuality',
            },
            {
              value: '扬尘监测',
              mapKey: 'dust',
            },
            {
              value: '硫化氢监测',
              mapKey: 'h2s',
            },
          ],
          className: 'b-block6',
        },
        {
          list: [
            {
              value: '灯杆监测',
              mapKey: 'light',
            },
          ],
          className: 'light2',
        },
        {
          list: [
            {
              value: '摄像头',
              mapKey: 'camera',
            },
          ],
          className: 'camera',
        },
        {
          list: [
            {
              value: '水质监测',
              mapKey: 'water',
            },
            {
              value: '烟感监测',
              mapKey: 'smoke',
            },
          ],
          className: 'b-block7',
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
.b-block6 {
  top: 63px;
  left: 800px;
  .line1 {
    width: 70px;
    left: -70px;
    top: 110px;
    .line2 {
      width: 25px;
      left: -25px;
      bottom: -2px;
      transform: rotate(-25deg);
      transform-origin: right;
      .circle {
        top: -15px;
        left: -28px;
      }
    }
  }
}
.light2 {
  top: 215px;
  right: 215px;
  .line1 {
    width: 70px;
    right: -70px;
    top: 30px;
    .line2 {
      width: 23px;
      right: -23px;
      bottom: -2px;
      transform: rotate(35deg);
      transform-origin: left;
      .circle {
        top: -13px;
        left: 23px;
      }
    }
  }
}
.camera {
  top: 426px;
  left: 486px;
  .line1 {
    width: 80px;
    right: -80px;
    top: 5px;
    .line2 {
      width: 30px;
      right: -30px;
      bottom: -2px;
      transform: rotate(25deg);
      transform-origin: left;
      .circle {
        top: -13px;
        left: 30px;
      }
    }
  }
}
.b-block7 {
  bottom: 200px;
  right: 300px;
  .line1 {
    width: 100px;
    right: -100px;
    top: 70px;
    .line2 {
      width: 40px;
      right: -40px;
      bottom: -2px;
      transform: rotate(-35deg);
      transform-origin: left;
      .circle {
        top: -13px;
        left: 40px;
      }
    }
  }
}
@import "~scss_about1920";
</style>
