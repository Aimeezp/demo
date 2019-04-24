<template>
  <div class="content-main">
    <pentagon-list
      v-for="(item, inx) in pentagonListInfo"
      :key="inx"
      :list="item.list"
      :className="item.className"
    ></pentagon-list>
    <img :src="personImg" class="person-img">
  </div>
</template>
<script>
import { appMapping } from '@/assets/js/appMapping';
import personImg from '@/assets/images/about/person.png';
import pentagonList from '@/components/PentagonList';

export default {
  name: 'Hospital',
  data() {
    return {
      appMapping,
      personImg,
      pentagonListInfo: [
        {
          list: [
            {
              value: '扬尘监测',
              mapKey: 'dust',
            },
          ],
          className: 'dust',
        },
        {
          list: [
            {
              value: '一键告警',
              mapKey: 'alarmBtn',
            },
          ],
          className: 'alarm-btn',
        },
        {
          list: [
            {
              value: '烟感监测',
              mapKey: 'smoke',
            },
          ],
          className: 'smoke',
        },
        {
          list: [
            {
              value: '手环',
              mapKey: 'bracelet',
            },
            {
              value: 'RFID',
              mapKey: 'rfid',
            },
            {
              value: 'PAD',
              mapKey: 'pad',
            },
          ],
          className: 'hand-feel',
        },
        {
          list: [
            {
              value: '硫化氢监测',
              mapKey: 'h2s',
            },
            {
              value: '水质监测',
              mapKey: 'water',
            },
            {
              value: '空气监测',
              mapKey: 'airQuality',
            },
          ],
          className: 'hand-feel',
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
.dust {
  left: 510px;
  top: 160px;
  .line1 {
    width: 77px;
    left: -77px;
    top: 30px;
    .line2 {
      width: 40px;
      left: -40px;
      bottom: -2px;
      transform: rotate(50deg);
      transform-origin: right;
      .circle {
        top: -15px;
        left: -28px;
      }
    }
  }
}
.alarm-btn {
  left: 448px;
  top: 460px;
  .line1 {
    width: 75px;
    left: -75px;
    top: 30px;
    .line2 {
      width: 40px;
      left: -40px;
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
.smoke {
  left: 891px;
  top: 100px;
  .line1 {
    width: 105px;
    left: -105px;
    top: 30px;
    .line2 {
      width: 70px;
      left: -70px;
      bottom: -2px;
      transform: rotate(30deg);
      transform-origin: right;
      .circle {
        top: -15px;
        left: -28px;
      }
    }
  }
}
.hand-feel {
  left: 844px;
  top: 303px;
  .line1 {
    width: 60px;
    right: -60px;
    top: 30px;
    .line2 {
      width: 68px;
      right: -68px;
      bottom: -2px;
      transform: rotate(70deg);
      transform-origin: left;
      .circle {
        bottom: -16px;
        right: -28px;
      }
    }
  }
}
.person-img {
  position: absolute;
  right: 195px;
  bottom: 59px;
  width: 290px;
  z-index: 99;
}
.hos-bottom {
  width: 634px !important;
  bottom: 30px;
  left: 510px;
  .main,
  .pentagon {
    width: 630px;
  }
  ul {
    display: flex;
    li {
      margin: 0 28px 0 0 !important;
    }
  }
}
</style>
