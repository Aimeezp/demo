<template>
  <section class="week-trend-page">
    <div id="airWeekTrend" style="width: 500px;height:340px;"></div>
  </section>
</template>

<script>
export default {
  name: 'week-trend',
  data() {
    return {
      highest: [],
      minimum: [],
    };
  },
  mounted() {
    this.getWeekTrendData();
  },
  methods: {
    getWeekTrendData() {
      window.vaApi.getAirWeekTrendData().then(({ data: { data, status } }) => {
        if (parseInt(status, 10) === 1) {
          this.highest = data.highest;
          this.minimum = data.minimum;
          this.airWeekTrendInt();
        }
      });
    },
    airWeekTrendInt() {
      const that = this;
      const echartInstance = that.$echarts.init(document.getElementById('airWeekTrend'));
      const option = {
        title: {
          text: '一周走势（均值）',
          textStyle: {
            fontSize: 12,
            color: '#0B2E59',
          },
          y: '20px',
        },
        tooltip: {
          trigger: 'axis',
          position: 'top',
          // formatter: function (obj) {
          //   var value = obj.value;
          //   return '<div>'
          //     + `${obj[0].axisValue}气温<br/>`
          //     +`<div>最高：${obj[0].data}</div>`
          //     +`<div>最低：${obj[1].data}</div>`
          //     + '</div>'
          // },
        },
        legend: {
          show: false,
          data: ['最高气温', '最低气温'],
        },
        grid: {
          left: '3%',
          right: '30%',
          bottom: '20px',
          containLabel: true,
        },
        toolbox: {
          show: false,
          feature: {
            dataZoom: {
              yAxisIndex: 'none',
            },
            dataView: { readOnly: false },
            magicType: { type: ['line', 'bar'] },
            restore: {},
            saveAsImage: {},
          },
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          axisLine: {
            lineStyle: {
              color: '#EEEFF3',
            },
          },
          axisLabel: {
            color: '#4B5869',
            fontSize: 12,
          },
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        },
        yAxis: {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: '#EEEFF3',
            },
          },
          splitLine: {
            lineStyle: {
              color: '#EEEFF3',
            },
          },
          axisLabel: {
            formatter: '{value} °C',
            color: '#4B5869',
            fontSize: 12,
          },
        },
        series: [
          {
            name: '最高气温',
            type: 'line',
            smooth: true,
            data: that.highest,
            symbolSize: 0,
            color: '#F38715',
            markPoint: {
              data: [
                { type: 'max', name: '最大值' },
                { type: 'min', name: '最小值' },
              ],
            },
          },
          {
            name: '最低气温',
            type: 'line',
            smooth: true,
            symbolSize: 0,
            color: '#4DA8F3',
            data: that.minimum,
            markPoint: {
              data: [
                { type: 'max', name: '最大值' },
                { type: 'min', name: '最小值' },
              ],
            },
          },
        ],
      };
      echartInstance.setOption(option);
      window.addEventListener('resize', () => {
        echartInstance.resize();
      });
    },
  },
};
</script>

<style scoped lang="scss">
.week-trend-page{
  width: 100%;
  opacity: 0.86;
  margin-top: 4px;
  background: rgba(255,255,255,0.4);
}
</style>
