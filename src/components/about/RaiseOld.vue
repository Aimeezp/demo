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
  name: 'RaiseOld',
  data() {
    return {
      appMapping,
      pentagonListInfo: [
        {
          list: [
            {
              value: '手环',
              mapKey: 'bracelet',
            },
          ],
          className: 'bracelet',
        },
        {
          list: [
            {
              value: '一键告警',
              mapKey: 'alarmBtn',
            },
          ],
          className: 'cell-four',
        },
        {
          list: [
            {
              value: '红外',
              mapKey: 'infraRed',
            },
          ],
          className: 'infraRed',
        },
        {
          list: [
            {
              value: '烟感监测',
              mapKey: 'smoke',
            },
            {
              value: '燃气监测',
              mapKey: 'gasMonitor',
            },
          ],
          className: 'smoke3',
          showLine: false,
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
.bracelet {
  left: 883px;
  top: 504px;
  .line1 {
    width: 55px;
    left: -55px;
    top: 30px;
    .line2 {
      .circle {
        top: -12px;
        left: -28px;
      }
    }
  }
}
.cell-four {
  left: 395px;
  bottom: 250px;
  .line1 {
    width: 50px;
    right: -50px;
    top: 30px;
    .line2 {
      width: 30px;
      right: -30px;
      bottom: -2px;
      transform: rotate(-70deg);
      transform-origin: left;
      .circle {
        bottom: -16px;
        right: -28px;
      }
    }
  }
}
.smoke3 {
  right: 190px;
  top: 210px;
}
.infraRed {
  left: 520px;
  top: 130px;
  .line1 {
    width: 100px;
    right: -100px;
    top: 10px;
    .line2 {
      width: 70px;
      right: -70px;
      bottom: -2px;
      transform: rotate(50deg);
      transform-origin: left;
      .circle {
        bottom: -16px;
        right: -28px;
      }
    }
  }
}
@import "~scss_about1920";
</style>
