<template>
  <div>
    <div id="RSRPmain" style="height:300px;"></div>
    <div id="SNRmain" style="height:300px;"></div>
  </div>
</template>

<script>
import echarts from 'echarts';

export default {
  data() {
    return {
      RSRPList: [],
      SNRList: [],
      reportTimeList: [],
    };
  },
  mounted() {
    this.dataFun();
    this.RSRPFun();
    this.SNRfun();
  },
  props: ['signalData'],
  methods: {
    dataFun() {
      this.RSRPList = [];
      this.SNRList = [];
      this.reportTimeList = [];
      this.signalData.forEach((item) => {
        this.RSRPList.push(item.rsrp);
        this.SNRList.push(item.snr);
        this.reportTimeList.push(item.reportTime);
      });
    },
    RSRPFun() {
      const option = {
        tooltip: {
          trigger: 'axis',
          position(pt) {
            return [pt[0], '10%'];
          },
        },
        xAxis: {
          type: 'category',
          data: this.reportTimeList,
        },
        title: {
          left: 'center',
          text: '设备信号强度',
        },
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
        grid: [{
          left: '2%',
          right: '2%',
        }],
        yAxis: {
          type: 'value',
        },
        series: [{
          name: '信号强度',
          data: this.RSRPList,
          type: 'line',
        }],
      };
      const myechart = echarts.init(document.getElementById('RSRPmain'));
      myechart.setOption(option);
    },
    SNRfun() {
      const date = this.reportTimeList;
      const datas = this.SNRList;
      const option = {
        tooltip: {
          trigger: 'axis',
          position(pt) {
            return [pt[0], '10%'];
          },
        },
        grid: [{
          left: '2%',
          right: '2%',
        }],
        title: {
          left: 'center',
          text: '设备信噪比',
        },
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
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: date,
        },
        yAxis: {
          type: 'value',
          boundaryGap: [0, '100%'],
        },
        // dataZoom: [{
        //   type: 'inside',
        //   start: 0,
        //   end: 10,
        // }, {
        //   start: 0,
        //   end: 10,
        //   handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
        //   handleSize: '80%',
        //   handleStyle: {
        //     color: '#fff',
        //     shadowBlur: 3,
        //     shadowColor: 'rgba(0, 0, 0, 0.6)',
        //     shadowOffsetX: 2,
        //     shadowOffsetY: 2,
        //   },
        // }],
        series: [
          {
            name: '信噪比',
            type: 'line',
            smooth: true,
            symbol: 'none',
            sampling: 'average',
            itemStyle: {
              color: 'rgb(255, 70, 131)',
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgb(255, 158, 68)',
              }, {
                offset: 1,
                color: 'rgb(255, 70, 131)',
              }]),
            },
            data: datas,
          },
        ],
      };
      const myechart = echarts.init(document.getElementById('SNRmain'));
      myechart.setOption(option);
    },
  },
};
</script>

<style scoped>

</style>
