<template>
  <bigcomponentwrap :sendBigData="dustBinData" :dustBinTitle="dustBinTitle" :textIcon="textIcon">
    <div slot="dashboardBigLeftIcon"  class="leafImg">
      <ICountUp :startVal="0" :endVal="parseInt(dustBinData.totalNum, 10) || 0" :duration="2.5" :options="{useEasing: true,useGrouping: true,separator: ''}"/>
    </div>
    <div slot="dashboardBigCenter" style="width: 100%;height: 100%;" ref="dustbinEchart"></div>
    <bigCommon slot="dashboardBigRight" :totalEquipNum="dustBinData.totalEquipNum" :monthWarnNum="dustBinData.monthWarnNum" :dayWarnNum="dustBinData.dayWarnNum" :textIcon="textIcon"></bigCommon>
  </bigcomponentwrap>
</template>
<script>
import { mapGetters } from 'vuex';
import ICountUp from 'vue-countup-v2';
import bigCommon from './component/BigComponent';
import bigcomponentwrap from './component/BigComponentWrap';


export default {
  data() {
    return {
      dustBinTitle: {
        title: '垃圾箱监测',
        url: '',
      },
      dustBinData: {},
      textIcon: [
        {
          iconFont: 'icon-shebei',
          name: '设备数',
        },
        {
          iconFont: 'icon-dangyue',
          name: '当月告警',
        },
        {
          iconFont: 'icon-dangri',
          name: '当月故障',
        },
      ],
      resData: {
        echartData: [0, 0, 0, 0, 0, 0],
        // x轴刻度
        xList: ['1号', '2号', '3号', '4号', '5号'],
      },
      echartFont: 24,
      echartObj: '',
    };
  },
  components: {
    bigcomponentwrap,
    ICountUp,
    bigCommon,
  },
  computed: {
    ...mapGetters(['requestData']),
  },
  watch: {
    'requestData.dustbin.updateTime': function dustbin() {
      this.formatData();
    },
  },
  mounted() {
    this.formatData();
    this.getEcharts();
    window.addEventListener('resize', this.echartResize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.echartResize);
  },
  methods: {
    formatData() {
      if (this.requestData.dustbin && this.requestData.dustbin.data) {
        this.dustBinData = this.requestData.dustbin.data.list;
      }
    },
    getEcharts() {
      this.echartObj = this.$echarts.init(this.$refs.dustbinEchart);
      const option = {
        color: ['#32CEFF'], // 柱状颜色
        title: {
          // text: '报警次数',
          x: '86%',
          textStyle: {
            fontSize: 24,
            color: '#C8D2F0',
          },
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        grid: {
          left: '1%',
          right: '18%',
          bottom: '5%', // 5
          top: '5%', // 14
          containLabel: true,
        },
        legend: {
          itemWidth: 18,
          item: 18,
          right: '5%',
          bottom: '12%',
          orient: 'vertical',
          data: [
            {
              name: '温度',
              // 强制设置图形为圆。
              icon: 'roundRect',
              // 设置文本为红色
              textStyle: {
                color: '#C8D2F0',
              },
            },
            {
              name: '垃圾量',
              // 强制设置图形为圆。
              icon: 'roundRect',
              // 设置文本为红色
              textStyle: {
                color: '#C8D2F0',
              },
            },
          ],
        },
        xAxis: [
          {
            nameTextStyle: {
              color: '#C8D2F0',
              fontSize: 12,
            },
            axisLine: {
              lineStyle: {
                type: 'solid',
                color: '#5E72A9',
                width: '2',
              },
            },
            type: 'category',
            data: this.resData.xList,
            axisTick: {
              alignWithLabel: true,
            },
            axisLabel: {
              textStyle: {
                color: '#C8D2F0',
                fontSize: 14,
              },
            },
          },
        ],
        yAxis: [
          {
            type: 'value',
            splitLine: {
              lineStyle: {
                type: 'dashed',
                color: '#5E72A9',
                width: '2',
              },
            },
            axisLine: {
              lineStyle: {
                type: 'solid',
                color: '#5E72A9',
                width: '2',
              },
            },
            axisLabel: {
              textStyle: {
                color: '#C8D2F0 ',
                fontSize: 14,
              },
              // formatter(value) {
              //   const texts = [];
              //   if (value === 0) {
              //     texts.push('0%');
              //   } else if (value <= 20) {
              //     texts.push('20%');
              //   } else if (value <= 40) {
              //     texts.push('40%');
              //   } else if (value <= 60) {
              //     texts.push('60%');
              //   } else if (value <= 80) {
              //     texts.push('80%');
              //   } else {
              //     texts.push('100%');
              //   }
              //   return texts;
              // },
            },
          },
        ],
        series: [
          {
            name: '温度',
            type: 'bar',
            data: [30, 22, 18, 40, 35],
            barWidth: 16,
            itemStyle: {
              normal: {
                barBorderRadius: [10, 10, 0, 0],
                color(params) {
                  const colorList = [
                    '#32CEFF', '#32CEFF', '#32CEFF', '#32CEFF', '#32CEFF', '#32CEFF',
                  ];
                  return colorList[params.dataIndex];
                },
              },
            },
          },
          {
            name: '垃圾量',
            type: 'bar',
            barWidth: 16,
            data: [15, 30, 25, 20, 5],
            itemStyle: {
              normal: {
                barBorderRadius: [10, 10, 0, 0],
                color(params) {
                  const colorList = [
                    '#ff7b2d', '#ff7b2d', '#ff7b2d', '#ff7b2d', '#ff7b2d', '#ff7b2d',
                  ];
                  return colorList[params.dataIndex];
                },
              },
            },
          },
        ],
      };
      this.echartObj.setOption(option);
    },
    echartResize() {
      if (this.echartObj) {
        this.echartObj.resize();
      }
    },
  },
};
</script>
<style lang="scss" scoped>
  .leafImg{
    margin: 0 auto;
    width: 100%;
    height: 75%;
    font-family: PingFangTC-Medium;
    font-size: 2.5vw;
    color: #ffe639;
    position: relative;
    background:url(../../../assets/images/dashboard/bigDustBin/normal.png) no-repeat center bottom;
    background-size: contain;
    >span{
      position:absolute;
      top:50%;
      left:50%;
      transform:translate(-50%,-50%);
    }
  }
</style>
