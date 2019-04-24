<template>
  <section class="trapState">
    <div v-if="this.totalAll" id="hydrantChartTrap" style="width: 410px;height:340px"></div>
  </section>
</template>

<script>

export default {
  data() {
    return {
      day: [],
      dataList: [],
    };
  },
  props: ['totalAll'],
  watch: {
    totalAll(val) {
      if (val) {
        this.getList();
      }
    },
  },
  mounted() {
    this.getWeek();
    this.getList();
  },
  methods: {
    getWeek() {
      this.day.push(this.getDay(-7), this.getDay(-6), this.getDay(-5), this.getDay(-4), this.getDay(-3), this.getDay(-2), this.getDay(-1));
    },
    getDay(day) {
      const today = new Date();
      today.setTime(today.getTime() + 1000 * 60 * 60 * 24 * day); // 注意，这行是关键代码
      let tMonth = today.getMonth();
      const tDate = today.getDate();
      tMonth += 1;
      return `${tMonth}-${tDate}`;
    },
    getList() {
      window.vaApi.getHydrantWeekTrendData().then((res) => {
        const { status, data } = res.data;
        if (parseInt(status, 10) === 1) {
          if (this.totalAll < 6) {
            this.dataList = data.slice(0, this.totalAll);
          } else {
            this.dataList = data;
          }
          if (this.dataList) {
            this.drawLine();
          }
        }
      });
    },
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      const myChartTrap = this.$echarts.init(document.getElementById('hydrantChartTrap'));
      // 绘制图表
      myChartTrap.setOption({
        title: {
          text: '一周走势',
          textStyle: {
            fontSize: 16,
            color: '#0B2E59',
          },
          y: '0px',
          x: '10px',
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        grid: {
          left: '3%',
          right: '10%',
          bottom: '3%',
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.day,
        },
        yAxis: {
          type: 'value',
        },
        series: this.dataList,
      });
    },
  },
};
</script>


<style scoped lang="scss">
  .trapState{
    width: 100%;
    /*opacity: 0.86;*/
    margin-top: 25px;
    background: rgba(255,255,255,0.4);
  }
</style>
