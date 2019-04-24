<template>
    <div>
      <div id="power" style="height:600px;"></div>
    </div>
</template>

<script>
import echarts from 'echarts';


export default {
  data() {
    return {
      voltageList: [],
      electricityList: [],
      reportTimeList: [],
    };
  },
  mounted() {
    this.dataFun();
    this.powerFun();
  },
  props: ['powerData'],
  methods: {
    dataFun() {
      this.voltageList = [];
      this.electricityList = [];
      this.reportTimeList = [];
      this.powerData.forEach((item) => {
        this.voltageList.push(item.voltage);
        this.electricityList.push(item.electricity);
        this.reportTimeList.push(item.reportTime);
      });
    },
    powerFun() {
      const option = {

        // Make gradient line here
        visualMap: [{
          show: false,
          type: 'continuous',
          seriesIndex: 0,
          min: 0,
          max: 400,
        }, {
          show: false,
          type: 'continuous',
          seriesIndex: 1,
          dimension: 0,
          min: 0,
          max: this.reportTimeList.length - 1,
        }],


        title: [{
          left: 'center',
          text: '设备电压',
        }, {
          top: '55%',
          left: 'center',
          text: '设备电量',
        }],
        toolbox: {
          feature: {
            // dataZoom: {
            //   yAxisIndex: 'none',
            // },
            restore: {},
            saveAsImage: {},
          },
          right: '2%',
        },
        tooltip: {
          trigger: 'axis',
        },
        xAxis: [{
          data: this.reportTimeList,
        }, {
          data: this.reportTimeList,
          gridIndex: 1,
        }],
        yAxis: [{
          splitLine: {
            show: false,
          },
        }, {
          splitLine: {
            show: false,
          },
          gridIndex: 1,
        }],
        grid: [{
          bottom: '60%',
          left: '2%',
          right: '2%',
        }, {
          top: '60%',
          left: '2%',
          right: '2%',
        }],
        series: [{
          name: '电压',
          type: 'line',
          showSymbol: false,
          data: this.voltageList,
        }, {
          name: '电量',
          type: 'line',
          showSymbol: false,
          data: this.electricityList,
          xAxisIndex: 1,
          yAxisIndex: 1,
        }],
      };
      const myechart = echarts.init(document.getElementById('power'));
      myechart.setOption(option);
    },
  },
};
</script>

<style scoped>

</style>
