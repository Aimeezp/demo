<template>
<section class="week-opacity-page">
  <div class="title">一周浑浊度（均值）</div>
  <div id="riverWayWeekOpacity" style="width: 500px;height:370px;"></div>
</section>
</template>

<script>
export default {
  name: 'week-trend',
  data() {
    return {
      weekOpacityData: [],
    };
  },
  mounted() {
    this.getWeekOpacityData();
  },
  methods: {
    getWeekOpacityData() {
      window.vaApi.getRiverWayWeekOpacity().then(({ data: { data, status } }) => {
        if (parseInt(status, 10) === 1) {
          this.weekOpacityData = data;
          this.weekOpacityInt();
        }
      });
    },
    weekOpacityInt() {
      const that = this;
      const echartInstance = that.$echarts.init(document.getElementById('riverWayWeekOpacity'));
      const hours = ['1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00',
        '8:00', '9:00', '10:00', '11:00', '12:00',
        '13:00', '14:00', '15:00', '16:00', '17:00', '18:00',
        '19:00', '20:00', '21:00', '22:00', '23:00', '24:00'];
      const days = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
      // ['Saturday', 'Friday', 'Thursday','Wednesday', 'Tuesday', 'Monday', 'Sunday']
      const data = that.weekOpacityData;
      const option = {
        backgroundColor: 'rgba(255,255,255,0.4)',
        tooltip: {
          position: 'top',
          formatter(obj) {
            const { value } = obj;
            return '<div>'
              + `时间：${(obj.data[0] + 1)}:00<br/>浊度：${value[1]}`
              + '<span style="font-size: 6px;">NTU</span>'
              + '</div>';
          },
        },
        title: [],
        singleAxis: [],
        series: [],
      };
      const pointColor = ['#3AB4E4', '#00D1EF', '#9FECC1', '#FFDC44', '#FF9D7C', '#FF84A6', '#EFC4F5'];
      that.$echarts.util.each(days, (day, idx) => {
        option.title.push({
          textBaseline: 'middle',
          top: `${(idx + 0.5) * 100 / 7}%`,
          text: day,
          textStyle: {
            fontStyle: 'normal',
            fontWeight: 'normal',
            fontSize: 12,
          },
        });
        option.singleAxis.push({
          left: 50,
          right: 160,
          type: 'category',
          boundaryGap: false,
          data: hours,
          top: `${idx * 100 / 7 + 5}%`,
          height: `${100 / 7 - 10}%`,
          axisLabel: {
            interval: 2,
          },
        });
        option.series.push({
          color: pointColor[idx],
          singleAxisIndex: idx,
          coordinateSystem: 'singleAxis',
          type: 'scatter',
          data: [],
          symbolSize(dataItem) {
            return dataItem[1] * 1;
          },
        });
      });
      that.$echarts.util.each(data, (dataItem) => {
        option.series[dataItem[0]].data.push([dataItem[1], dataItem[2]]);
      });
      echartInstance.setOption(option);
      window.addEventListener('resize', () => {
        echartInstance.resize();
      });
    },
  },
};
</script>

<style scoped lang="scss">
.week-opacity-page{
  width: 100%;
  margin-top: 4px;
  background: rgba(255,255,255,0.4);
  box-sizing: border-box;
  padding-top: 4px;
  padding-bottom: 14px;
  .title{
    background: rgba(255,255,255,0.4);
    margin-left: 8px;
    font-size: 12px;
    color: #0B2E59;
    font-weight: 600;
  }
}
</style>
