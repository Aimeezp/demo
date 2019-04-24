<template>
  <section class="marchTrendPage">
    <div style="font-size: 12px;color: #0B2E59;font-weight: bold;margin-left: 5px">
      <p>三月走势(均值)</p>
    </div>
    <div id="marchTrend" style="width: 400px;height:350px"></div>
  </section>
</template>

<script>

export default {
  data() {
    return {
      monthTrendData: [],
      monthTrendDataRes: [],
    };
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    drawLine() {
      window.vaApi.getMarchTrendData().then(({ data: { data, status } }) => {
        if (parseInt(status, 10) === 1) {
          this.monthTrendDataRes = data;
          this.marchTrend();
        }
      });
    },
    getMonthRangeDateFun() {
      const that = this;
      function getVirtulData(years) {
        const year = years || '2019';
        const date = +that.$echarts.number.parseDate(`${year}-01-01`);
        const end = +that.$echarts.number.parseDate(`${+year + 1}-01-01`);
        const dayTime = 3600 * 24 * 1000;
        const data = [];
        let index = 0;
        for (let time = date; time < end; time += dayTime) {
          data.push([
            that.$echarts.format.formatTime('yyyy-MM-dd', time),
            that.monthTrendDataRes[index],
          ]);
          index += 1;
        }
        return data;
      }
      that.monthTrendData = getVirtulData(2019);
    },
    marchTrend() {
      const that = this;
      const echartInstance = that.$echarts.init(document.getElementById('marchTrend'));
      that.getMonthRangeDateFun();
      const option = {
        backgroundColor: 'rgba(255,255,255,0.4)',
        tooltip: {
          position: 'top',
          formatter(obj) {
            return `<div><div>${obj.data[0]}</div><div>平均满溢${obj.data[1]}次</div></div>`;
          },
        },
        calendar: {
          orient: 'vertical',
          yearLabel: {
            show: false,
          },
          monthLabel: {
            align: 'center',
          },
          dayLabel: {
            position: 'start',
            firstDay: 1,
            nameMap: 'en',
          },
          itemStyle: {
            normal: {
              color: 'rgba(255,255,255,0.4)',
              borderWidth: 1,
              borderColor: '#DADADA',
            },
          },
          cellSize: 49,
          top: 50,
          left: 35,
          range: '2019-03',
        },
        series: [
          {
            name: '满溢次数',
            type: 'scatter',
            coordinateSystem: 'calendar',
            data: that.monthTrendData,
            symbolSize(val) {
              return val[1] * 3;
            },
            // symbolSize: 10,
            itemStyle: {
              normal: {
                color: '#DF7377',
              },
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
  .marchTrendPage{
    width: 300px;
    opacity: 0.86;
    margin-top: 25px;
    background: rgba(255,255,255,0.4);
  }
</style>
