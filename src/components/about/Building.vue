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
  name: 'building',
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
          className: 'smoke1',
        },
        {
          list: [
            {
              value: '门磁监测',
              mapKey: 'doorlock',
            },
          ],
          className: 'doorlock',
        },
        {
          list: [
            {
              value: '地磁',
              mapKey: 'geoMonitor',
            },
          ],
          className: 'geoMonitor1',
        },
        {
          list: [
            {
              value: '水压监测',
              mapKey: 'firePressure',
            },
          ],
          className: 'firePressure',
        },
        {
          list: [
            {
              value: '电梯监测',
              mapKey: 'lift',
            },
          ],
          className: 'lift',
        },
        {
          list: [
            {
              value: '硫化氢监测',
              mapKey: 'h2s',
            },
          ],
          className: 'h2s',
        },
        {
          list: [
            {
              value: '电弧监测',
              mapKey: 'arc',
            },
          ],
          className: 'arc',
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
.smoke1 {
  top: 129px;
  left: 801px;
  .line1 {
    width: 100px;
    left: -100px;
    top: 30px;
    .line2 {
      width: 70px;
      left: -70px;
      bottom: -2px;
      transform: rotate(-60deg);
      transform-origin: right;
      .circle {
        top: -15px;
        left: -28px;
      }
    }
  }
}
.doorlock {
  top: 273px;
  left: 994px;
  .line1 {
    width: 117px;
    right: -117px;
    top: 30px;
    .line2 {
      width: 100px;
      right: -100px;
      bottom: -2px;
      transform: rotate(-70deg);
      transform-origin: left;
      .circle {
        top: -13px;
        left: 98px;
      }
    }
  }
}
.geoMonitor1 {
  top: 369px;
  left: 678px;
  .line1 {
    width: 90px;
    left: -90px;
    top: 30px;
    .line2 {
      width: 40px;
      left: -40px;
      bottom: -2px;
      transform: rotate(65deg);
      transform-origin: right;
      .circle {
        top: -15px;
        left: -28px;
      }
    }
  }
}
.firePressure {
  top: 457px;
  right: 60px;
  .line1 {
    width: 110px;
    left: -110px;
    top: 30px;
    .line2 {
      .circle {
        top: -15px;
        left: -28px;
      }
    }
  }
}
.lift {
  top: 515px;
  left: 728px;
  .line1 {
    width: 150px;
    left: -150px;
    top: 30px;
    .line2 {
      width: 30px;
      left: -30px;
      bottom: -2px;
      transform: rotate(55deg);
      transform-origin: right;
      .circle {
        top: -15px;
        left: -28px;
      }
    }
  }
}
.h2s {
  bottom: 60px;
  right: 204px;
  .line1 {
    width: 105px;
    left: -105px;
    top: 30px;
    .line2 {
      width: 60px;
      left: -60px;
      bottom: -2px;
      transform: rotate(60deg);
      transform-origin: right;
      .circle {
        top: -15px;
        left: -28px;
      }
    }
  }
}
.arc {
  bottom: 30px;
  left: 583px;
  .line1 {
    width: 135px;
    right: -135px;
    top: 30px;
    .line2 {
      width: 30px;
      right: -30px;
      bottom: -2px;
      transform: rotate(30deg);
      transform-origin: left;
      .circle {
        top: -13px;
        left: 28px;
      }
    }
  }
}
</style>
