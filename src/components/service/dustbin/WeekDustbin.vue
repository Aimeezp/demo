<template>
  <section class="week-dustbin">
    <div id="dustbinWeekTrend" style="width: 500px;height:340px"></div>
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
      window.vaApi.getWeekDustbinTrendData().then(({ data: { data, status } }) => {
        if (parseInt(status, 10) === 1) {
          this.highest = data.highest;
          // this.minimum = data.minimum;
          this.dustbinWeekTrendInt();
        }
      });
    },
    dustbinWeekTrendInt() {
      const echartInstance = this.$echarts.init(document.getElementById('dustbinWeekTrend'));
      const option = {
        title: {
          text: '一周走势(均值)',
          // subtext: '每日满溢次数',
          textStyle: {
            fontSize: 12,
            color: '#0B2E59',
          },
          y: '0px',
          x: '0px',
        },
        tooltip: {
          trigger: 'axis',
        },
        // legend: {
        //   data: ['南京西路2011号', '南京西路1111号'],
        // },
        grid: {
          left: '3%',
          right: '30%',
          bottom: '14%',
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
          data: ['4/8', '4/9', '4/10', '4/11', '4/12', '4/13', '4/14'],
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
            formatter: '{value}',
            color: '#4B5869',
            fontSize: 12,
          },
        },
        series: [
          {
            name: '每日满溢次数均值',
            type: 'line',
            data: this.highest,
            symbolSize: 0,
            color: '#F38715',
            smooth: true,
            markPoint: {
              data: [
                { type: 'max', name: '最大值' },
                { type: 'min', name: '最小值' },
              ],
            },
          },
          // {
          //   name: '南京西路1111号',
          //   type: 'line',
          //   symbolSize: 0,
          //   color: '#4DA8F3',
          //   smooth: false,
          //   data: this.minimum,
          //   markPoint: {
          //     data: [
          //       { type: 'max', name: '最大值' },
          //       { type: 'min', name: '最小值' },
          //     ],
          //   },
          // },
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
  .week-dustbin{
    width: 100%;
    opacity: 0.86;
    margin-top: 25px;
    background: rgba(255,255,255,0.4);
  }
</style>
