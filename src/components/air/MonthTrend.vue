<template>
<section class="air-trend-page">
  <div id="airMonthTrend" style="width: 500px;height:350px;"></div>
</section>
</template>

<script>
export default {
  name: 'month-trend',
  data() {
    return {
      calendarRangeStart: '',
      calendarRangeEnd: '',
      nowMonthPre: new Date().getMonth(),
      nowYear: new Date().getFullYear(),
      calendarTitle: '',
      monthTrendData: [],
      monthTrendDataRes: [],
    };
  },
  mounted() {
    this.getMonthTrendData();
  },
  methods: {
    getMonthTrendData() {
      window.vaApi.getAirMonthTrendData().then(({ data: { data, status } }) => {
        if (parseInt(status, 10) === 1) {
          this.monthTrendDataRes = data;
          this.monthTrendEchartInit();
        }
      });
    },
    getMonthRangeDateFun() {
      const that = this;
      const monthDay = new Date(that.nowYear, that.nowMonthPre, 0).getDate();
      if (that.nowMonthPre > 9) {
        that.calendarRangeStart = `${that.nowYear}-${that.nowMonthPre}-01`;
        that.calendarRangeEnd = `${that.nowYear}-${that.nowMonthPre}-${monthDay}`;
      } else {
        that.calendarRangeStart = `${that.nowYear}-0${that.nowMonthPre}-01`;
        that.calendarRangeEnd = `${that.nowYear}-0${that.nowMonthPre}-${monthDay}`;
      }
      function getVirtulData(yearv) {
        const year = yearv || this.nowYear;
        const date = +that.$echarts.number.parseDate(`${year}-01-01`);
        const end = +that.$echarts.number.parseDate(`${+year + 1}-01-01`);
        const dayTime = 3600 * 24 * 1000;
        const data = [];
        let index = 0;
        for (let time = date; time < end; time += dayTime) {
          if ((new Date(time).getMonth() + 1) === that.nowMonthPre) {
            data.push([
              that.$echarts.format.formatTime('yyyy-MM-dd', time),
              that.monthTrendDataRes[index],
            ]);
            index += 1;
          } else {
            data.push([
              that.$echarts.format.formatTime('yyyy-MM-dd', time),
              Math.floor(Math.random() * 27) + 7,
            ]);
          }
        }
        return data;
      }
      that.monthTrendData = getVirtulData(2019);
    },
    monthTrendEchartInit() {
      const that = this;
      const echartInstance = that.$echarts.init(document.getElementById('airMonthTrend'));
      that.calendarTitle = `${that.nowMonthPre}月走势（均值）`;
      that.getMonthRangeDateFun();
      const option = {
        backgroundColor: 'rgba(255,255,255,0.4)',
        title: {
          top: 20,
          text: that.calendarTitle,
          // left: '35%',
          textStyle: {
            color: '#0B2E59',
            fontSize: 12,
          },
        },
        tooltip: {
          trigger: 'item',
          position: 'top',
          formatter(obj) {
            return `<div><div>${obj.data[0]}</div><div>PM2.5：${obj.data[1]}μg/m³</div></div>`;
          },
        },
        legend: {
          show: false,
          top: '30',
          left: '60',
          bottom: 4,
          data: ['PM2.5'],
          textStyle: {
            color: '#0B2E59',
          },
        },
        calendar: [{
          orient: 'vertical',
          top: 100,
          cellSize: 45,
          left: 40,
          // bottom: 30,
          range: [that.calendarRangeStart, that.calendarRangeEnd],
          splitLine: {
            show: true,
            lineStyle: {
              color: '#737373',
              width: 1,
              type: 'solid',
            },
          },
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
        }],
        series: [
          {
            name: 'PM2.5 / [μg/m³]',
            type: 'scatter',
            coordinateSystem: 'calendar',
            data: that.monthTrendData,
            symbolSize(val) {
              return val[1] / 2;
            },
            itemStyle: {
              normal: {
                color: '#CD6D72',
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
.air-trend-page{
  width: 100%;
  background: rgba(255,255,255,0.4);
  margin-top: 8px;
}
</style>
