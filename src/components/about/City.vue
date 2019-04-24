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
  name: 'City',
  data() {
    return {
      appMapping,
      pentagonListInfo: [
        {
          list: [
            {
              value: '扬尘监测',
              mapKey: 'dust',
            },
          ],
          className: 'dust2',
        },
        {
          list: [
            {
              value: '噪声监测',
              mapKey: 'noise',
            },
          ],
          className: 'noise',
        },
        {
          list: [
            {
              value: '灯杆监测',
              mapKey: 'light',
            },
          ],
          className: 'light1',
        },
        {
          list: [
            {
              value: '红外',
              mapKey: 'infraRed',
            },
            {
              value: '燃气监测',
              mapKey: 'gasMonitor',
            },
            {
              value: '烟感监测',
              mapKey: 'smoke',
            },
          ],
          className: 'b-block3',
        },
        {
          list: [
            {
              value: '地磁',
              mapKey: 'geoMonitor',
            },
            {
              value: '井盖监测',
              mapKey: 'cover',
            },
            {
              value: '消防栓帽',
              mapKey: 'hydrant',
            },
          ],
          className: 'b-block4',
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
.dust2 {
  top: 64px;
  right: 505px;
  .line1 {
    width: 110px;
    left: -110px;
    top: 30px;
    .line2 {
      .circle {
        top: -12px;
        left: -28px;
      }
    }
  }
}
.noise {
  top: 179px;
  left: 522px;
  .line1 {
    width: 40px;
    left: -40px;
    top: 30px;
    .line2 {
      width: 30px;
      left: -30px;
      bottom: -2px;
      transform: rotate(-30deg);
      transform-origin: right;
      .circle {
        top: -15px;
        left: -28px;
      }
    }
  }
}
.light1 {
  top: 257px;
  right: 129px;
  .line1 {
    width: 65px;
    left: -65px;
    top: 30px;
    .line2 {
      width: 30px;
      left: -30px;
      bottom: -2px;
      transform: rotate(-40deg);
      transform-origin: right;
      .circle {
        top: -15px;
        left: -28px;
      }
    }
  }
}
.b-block3 {
  top: 395px;
  left: 484px;
  .line1 {
    width: 120px;
    right: -120px;
    top: 80px;
    .line2 {
      width: 30px;
      right: -30px;
      bottom: -2px;
      transform: rotate(40deg);
      transform-origin: left;
      .circle {
        top: -10px;
        left: 28px;
      }
    }
  }
}
.b-block4 {
  bottom: 64px;
  right: 339px;
  .line1 {
    width: 95px;
    left: -95px;
    top: 130px;
    .line2 {
      width: 80px;
      left: -80px;
      bottom: -2px;
      transform: rotate(-20deg);
      transform-origin: right;
      .circle {
        top: -15px;
        left: -28px;
      }
    }
  }
}
</style>
