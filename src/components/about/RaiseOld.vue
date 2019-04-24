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
          className: 'cell-four',
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
  right: 95px;
  top: 207px;
}
</style>
