<template>
    <div class="nowTimeCls">
      <span class="timeCls">{{nowTime}}</span>
    </div>
</template>

<script>
import moment from 'moment';

export default {
  data() {
    return {
      nowTime: moment().format(),
      intervalObj: '',
    };
  },
  mounted() {
    this.intervalObj = setInterval(this.getNow, 500);
  },
  beforeDestroy() {
    clearInterval(this.intervalObj);
    this.intervalObj = '';
  },
  methods: {
    getNow() {
      this.nowTime = moment()
        .locale('zh-cn')
        .format('YYYY-MM-DD dddd HH:mm:ss');
    },
  },
};
</script>

<style lang="scss">
.nowTimeCls {
  width: 230px;
}
</style>
