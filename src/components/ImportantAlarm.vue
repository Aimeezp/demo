<template>
  <div class="importantAlarm" v-if="isAlarmShow">
    <div style="text-align: center">
      <p class="textTitle">{{alarmText}}报警</p>
      <el-button type="danger" @click="viewInfo">查看详情</el-button>
    </div>

  </div>
</template>

<script>
// import bus from '@/utils/eventBus';

export default {
  data() {
    return {
      serialNumber: '',
      isAlarmShow: false,
      alarmText: '',
      deviceType: '',
    };
  },
  watch: {
    isAlarmShow(val) {
      if (val) {
        window.document.body.style.overflow = 'hidden';
      } else {
        window.document.body.style.overflow = 'auto';
      }
    },
  },
  created() {
    /* bus.$on('fullAlarm', ([deviceType, serialNumber, alarmText]) => {
      this.isAlarmShow = true;
      this.serialNumber = serialNumber;
      this.deviceType = deviceType;
      this.alarmText = alarmText;
    }); */
  },
  beforeDestroy() {
    window.document.body.style.overflow = 'auto';
    // bus.$off('fullAlarm');
  },
  methods: {
    viewInfo() {
      this.isAlarmShow = false;
      // this.$router.push({ name: 'device', params: { key: this.serialNumber, deviceType: this.deviceType } });
    },
  },
};
</script>

<style lang="scss">
.importantAlarm{
  background-image: url(~@/assets/images/alarmBg.png);
  width: 100%;
  height: 100%;
  background-size: cover;
  z-index: 99;
  position: fixed;
  display:flex;
  justify-content:center;
  align-items:center;
  .textTitle{
    font-size: 80px;
    color: #FF0000;
    margin-bottom: 25px;
  }
  .el-button--danger{
    background-color: #FD4646;
    span{
      border-radius: 4px;
      width:180px;
      line-height: 30px;
      display: inline-block;
      font-size: 30px;
    }
  }
}
</style>
