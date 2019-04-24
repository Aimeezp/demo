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
  name: 'Business',
  data() {
    return {
      appMapping,
      pentagonListInfo: [
        {
          list: [
            {
              value: 'POS',
              mapKey: 'pos',
            },
            {
              value: 'RFID',
              mapKey: 'rfid',
            },
          ],
          className: 'b-block1',
        },
        {
          list: [
            {
              value: '4G路由',
              mapKey: 'g4Router',
            },
            {
              value: 'GPS',
              mapKey: 'gps',
            },
          ],
          className: 'b-block2',
        },
        {
          list: [
            {
              value: 'PAD',
              mapKey: 'pad',
            },
          ],
          className: 'pad1',
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
.b-block1 {
  top: 236px;
  left: 658px;
  .line1 {
    width: 80px;
    left: -80px;
    top: 60px;
    .line2 {
      width: 40px;
      left: -40px;
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
.b-block2 {
  top: 124px;
  right: 232px;
  .line1 {
    width: 90px;
    left: -90px;
    top: 40px;
    .line2 {
      width: 90px;
      left: -90px;
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
.pad1 {
  top: 434px;
  right: 354px;
  .line1 {
    width: 80px;
    left: -80px;
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
</style>
