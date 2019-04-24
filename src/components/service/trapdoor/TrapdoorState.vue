<template>
  <section class="trapState">
    <div id="myChartTrap" style="width: 410px;height:340px"></div>
  </section>
</template>

<script>

export default {
  data() {
    return {
    };
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      const myChartTrap = this.$echarts.init(document.getElementById('myChartTrap'));
      // 绘制图表
      return new Promise((resolve) => {
        window.vaApi.getTrapdoorState().then((res) => {
          const { status, data } = res.data;
          if (parseInt(status, 10) === 1) {
            myChartTrap.setOption({
              title: {
                text: '每日井盖状态(均值)',
                textStyle: {
                  fontSize: 12,
                  color: '#0B2E59',
                },
                y: '0px',
                x: '0px',
              },
              color: ['#00679e', '#f90234'],
              tooltip: {
                trigger: 'axis',
                axisPointer: {
                  type: 'shadow',
                },
              },
              legend: {
                textStyle: {
                  fontSize: 11,
                },
                orient: 'horizontal',
                top: 30,
                itemGap: 5,
                itemWidth: 15, // 设置图例图形的宽
                itemHeight: 10, // 设置图例图形的高
                x: 'left',
                data: ['井盖打开次数', '液位过高次数'],
              },
              toolbox: {
                show: true,
                orient: 'vertical',
                left: 'right',
                top: 'center',
              },
              calculable: true,
              xAxis: [
                {
                  type: 'category',
                  axisTick: { show: false },
                  data: data.day,
                },
              ],
              yAxis: [
                {
                  type: 'value',
                },
              ],
              series: [
                {
                  name: '井盖打开次数',
                  type: 'bar',
                  barGap: 0.2,
                  label: {
                    normal: {
                      show: true,
                      position: 'insideBottom',
                      distance: 3,
                      align: 'left',
                      verticalAlign: 'middle',
                      rotate: 90,
                      formatter: '{c}  {name|{a}}',
                      fontSize: 9,
                      rich: {
                        name: {
                          fontSize: 9,
                          textBorderColor: '#fff',
                        },
                      },
                    },
                  },
                  data: data.openNumber,
                },
                {
                  name: '液位过高次数',
                  type: 'bar',
                  label: {
                    normal: {
                      show: true,
                      position: 'insideBottom',
                      distance: 3,
                      align: 'left',
                      verticalAlign: 'middle',
                      rotate: 90,
                      formatter: '{c}  {name|{a}}',
                      fontSize: 9,
                      rich: {
                        name: {
                          fontSize: 9,
                          textBorderColor: '#fff',
                        },
                      },
                    },
                  },
                  data: data.waterLevel,
                },
              ],
            });
          }
          resolve();
        });
      });
    },
  },
};
</script>


<style scoped lang="scss">
  .trapState{
    width: 100%;
    opacity: 0.86;
    margin-top: 25px;
    background: rgba(255,255,255,0.4);
  }
</style>
