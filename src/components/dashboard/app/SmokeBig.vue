<template>
  <bigcomponentwrap :sendBigData="smokeBigData" :dustBinTitle="smokeTitle" :textIcon="textIcon">
    <div slot="dashboardBigLeftIcon"  class="leafImg">
      <ICountUp :startVal="0" :endVal="parseInt(smokeBigData.totalNum, 10) || 0" :duration="2.5" :options="{useEasing: true,useGrouping: true,separator: ''}"/>
    </div>
    <div slot="dashboardBigCenter" style="height:100%;">
      <SmokeBigCenter></SmokeBigCenter>
    </div>
    <bigCommon slot="dashboardBigRight" :totalEquipNum="smokeBigData.totalEquipNum" :monthWarnNum="smokeBigData.smokeNum" :dayWarnNum="smokeBigData.fireNum" :textIcon="textIcon"></bigCommon>
  </bigcomponentwrap>
</template>
<script>
import ICountUp from 'vue-countup-v2';
import { mapGetters } from 'vuex';
import SmokeBigCenter from './SmokeBigCenter';
import bigCommon from './component/BigComponent';
import bigcomponentwrap from './component/BigComponentWrap';

export default {
  data() {
    return {
      smokeTitle: {
        title: '智能烟感',
        url: '/smoke/alarm-monitoring',
      },
      smokeBigData: {},
      textIcon: [
        {
          iconFont: 'icon-shebei',
          name: '设备数',
        },
        {
          iconFont: 'icon-icon-test',
          name: '当月烟警',
        },
        {
          iconFont: 'icon-huojing',
          name: '当月火警',
        },
      ],
    };
  },
  components: {
    bigcomponentwrap,
    bigCommon,
    SmokeBigCenter,
    ICountUp,
  },
  computed: {
    ...mapGetters(['requestData']),
  },
  watch: {
    'requestData.smoke.updateTime': function smoke() {
      this.formatData();
    },
  },
  mounted() {
    this.formatData();
  },
  methods: {
    formatData() {
      if (this.requestData.smoke && this.requestData.smoke.data) {
        this.smokeBigData = this.requestData.smoke.data.list;
      }
    },
  },
};
</script>
<style scoped lang="scss">
.leafImg{
    margin: 0 auto;
    width: 100%;
    height: 75%;
    font-family: "PingFangTC-Medium";
    font-size: 2.5vw;
    color: #ffe639;
    position: relative;
    background:url(../../../assets/images/dashboard/bigSmoke/znygsj.png) no-repeat center bottom;
    background-size: contain;
    >span{
      position:absolute;
      top:50%;
      left:50%;
      transform:translate(-50%,-50%);
    }
}
</style>
