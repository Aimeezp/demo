<template>
<section class="river-way-week-trend-page">
  <div id="riverWayWeekTrend" style="width: 500px;height:340px;"></div>
</section>
</template>

<script>
export default {
  name: 'week-trend',
  data() {
    return {
      riverWayWeekTrendData: {},
      riverWayAxisData: [],
    };
  },
  mounted() {
    this.getRiverWayAxisData();
    this.getWeekTrendData();
  },
  methods: {
    getWeekTrendData() {
      window.vaApi.getRiverWayWeekTrend().then(({ data: { data, status } }) => {
        if (parseInt(status, 10) === 1) {
          this.riverWayWeekTrendData = data;
          this.riverWayWeekTrendInt();
        }
      });
    },
    getRiverWayAxisData() {
      this.riverWayAxisData = [];
      const nowTime = new Date();
      const nowYear = nowTime.getFullYear();
      const nowMonth = nowTime.getMonth() + 1;
      let nowDay = nowTime.getDate();
      let nowPreMonthDays = new Date(nowYear, nowMonth - 1, 0).getDate();
      if (nowDay >= 7) {
        for (let i = 0; i < 7; i += 1) {
          nowDay -= 1;
          this.riverWayAxisData.push(`${nowMonth}.${nowDay}`);
        }
      } else {
        for (let i = 0; i < 7; i += 1) {
          nowDay -= 1;
          if (nowDay > 0) this.riverWayAxisData.push(`${nowMonth}.${nowDay}`);
          else {
            this.riverWayAxisData.push(`${nowMonth - 1}.${nowPreMonthDays}`);
            nowPreMonthDays -= 1;
          }
        }
      }
      this.riverWayAxisData = this.riverWayAxisData.reverse();
    },
    riverWayWeekTrendInt() {
      const that = this;
      const echartInstance = that.$echarts.init(document.getElementById('riverWayWeekTrend'));
      const colors = ['#4792FA', '#FF8100', '#7A6FC1'];
      const option = {
        backgroundColor: 'rgba(255,255,255,0.4)',
        title: {
          text: '一周水质趋势（均值）',
          textStyle: {
            fontSize: 12,
            color: '#0B2E59',
          },
          y: '6px',
        },
        color: colors,
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
          },
        },
        grid: {
          right: '50%',
          bottom: '30px',
        },
        toolbox: {
          feature: {
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        legend: {
          data: ['蒸发量', '降水量', '平均温度'],
        },
        xAxis: [
          {
            type: 'category',
            axisTick: {
              alignWithLabel: true,
            },
            axisLabel: {
              color: '#4B5869',
              fontSize: 12,
            },
            data: that.riverWayAxisData,
          },
        ],
        yAxis: [
          {
            type: 'value',
            name: '蒸发量',
            min: 0,
            // max: 250,
            position: 'right',
            axisLine: {
              lineStyle: {
                color: colors[0],
              },
            },
            splitLine: {
              lineStyle: {
                color: '#EEEFF3',
              },
            },
            axisLabel: {
              formatter: '{value} ml',
            },
          },
          {
            type: 'value',
            name: '降水量',
            min: 0,
            // max: 250,
            position: 'right',
            offset: 80,
            axisLine: {
              lineStyle: {
                color: colors[1],
              },
            },
            axisLabel: {
              formatter: '{value} ml',
            },
          },
          {
            type: 'value',
            name: '温度',
            min: 0,
            // max: 50,
            position: 'left',
            axisLine: {
              lineStyle: {
                color: colors[2],
              },
            },
            axisLabel: {
              formatter: '{value} °C',
            },
          },
        ],
        series: [
          {
            name: '蒸发量',
            type: 'bar',
            data: that.riverWayWeekTrendData.evaporationData,
          },
          {
            name: '降水量',
            type: 'bar',
            yAxisIndex: 1,
            data: that.riverWayWeekTrendData.precipitationData,
          },
          {
            name: '平均温度',
            type: 'line',
            smooth: true,
            yAxisIndex: 2,
            data: that.riverWayWeekTrendData.averageTemperData,
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
.river-way-week-trend-page{
  background: rgba(255,255,255,0.4);
  box-sizing: border-box;
  padding-top: 4px;
  padding-bottom: 4px;
  margin-top: 14px;
}
</style>
