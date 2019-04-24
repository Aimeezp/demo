<template>
  <section class="realTimeNoise">
    <div style="font-size: 12px;color: #0B2E59;font-weight: bold;margin-left: 5px">
      <p>实时噪音</p>
    </div>
    <div id="RealTimeNoise" style="width: 390px;height:360px"></div>
  </section>
</template>

<script>

export default {
  // data() {
  //   return {
  //   };
  // },
  mounted() {
    this.drawLine();
  },
  methods: {
    drawLine() {
      window.vaApi.getRealTimeNoise().then(({ data: { data, status } }) => {
        if (parseInt(status, 10) === 1) {
          this.hours = data.hours;
          this.days = data.days;
          this.data = data.data;
          this.realTimeNoise();
        }
      });
    },
    realTimeNoise() {
      const realTimeNoise = this.$echarts.init(document.getElementById('RealTimeNoise'));
      const option = {
        tooltip: {
          position: 'left',
          formatter(obj) {
            const { value } = obj;
            return '<div>'
              + `时间：${(obj.data[0])}:00<br/>噪音分贝：${value[1]}`
              + '<span style="font-size: 12px;">dB</span>'
              + '</div>';
          },
        },
        singleAxis: [],
        series: [],
        graphic: [],
      };
      this.$echarts.util.each(this.days, (day, idx) => {
        option.graphic.push({
          tooltip: {
            trigger: 'item',
            position: 'right',
            formatter: day,
          },
          type: 'text',
          textBaseline: 'middle', // 文本基线
          top: `${(idx + 0.5) * 100 / 4.3}%`,
          x: 0,
          fontSize: 12,
          fontStyle: 200,
          style: {
            text: `${day.substr(0, 3)}...`,
            x: 5,
          },
        });
        option.singleAxis.push({
          left: 60,
          type: 'category',
          boundaryGap: false,
          data: this.hours,
          top: `${idx * 100 / 4.3 + 5}%`,
          height: `${100 / 4.3 - 10}%`,
          axisLabel: {
            interval: 2, // 横坐标的分割份数
          },
        });
        option.series.push({
          singleAxisIndex: idx,
          coordinateSystem: 'singleAxis',
          type: 'scatter', // 散点图
          data: [],
          symbolSize(dataItem) {
            return dataItem[1] / 3.5;
          },
        });
      });
      this.$echarts.util.each(this.data, (dataItem) => {
        option.series[dataItem[0]].data.push([dataItem[1], dataItem[2]]);
      });
      realTimeNoise.setOption(option);
      window.addEventListener('resize', () => {
        realTimeNoise.resize();
      });
    },
  },
};
</script>

<style scoped lang="scss">
  .realTimeNoise{
    width: 100%;
    opacity: 0.86;
    margin-top: 25px;
    background: rgba(255,255,255,0.4);
  }
</style>
