<template>
  <!--<div>-->
    <!--<div id="myChartWeek" :style="{width: '300px', height: '300px',left:'50%',marginLeft:'-150px'}"></div>-->
  <!--</div>-->
  <section class="weekState">
    <div id="myChartWeek" style="width: 410px;height:340px"></div>
  </section>
</template>

<script>
// import { projectSuportData } from 'static/monthReportData/operationData';

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
      const myChartWeek = this.$echarts.init(document.getElementById('myChartWeek'));
      // 绘制图表
      return new Promise((resolve) => {
        window.vaApi.getWeekTrapdoorState().then((res) => {
          const { status, data } = res.data;
          if (parseInt(status, 10) === 1) {
            myChartWeek.setOption({
              title: {
                text: '一周状态汇总',
                textStyle: {
                  fontSize: 12,
                  color: '#0B2E59',
                },
                y: '0px',
                x: '0px',
              },
              color: ['#00679e', '#f90234', '#ffdb39'],
              tooltip: {
                trigger: 'item',
                formatter: '{b}: {c}次 ({d}%)',
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
                data: ['井盖打开次数', '液位过高次数', '低电提示次数'],
              },
              graphic: [{
                tooltip: {
                  trigger: 'item',
                  position: [20, 35],
                  formatter: '上海市长宁区水城路1014号',
                },
                type: 'text',
                style: {
                  text: '上海市长...',
                  x: 70,
                  y: 70,
                  textAlign: 'center',
                  fill: '#000',
                },
              }, {
                tooltip: {
                  trigger: 'item',
                  position: [35, 35],
                  formatter: '上海市长宁区水城路966号',
                },
                type: 'text',
                style: {
                  text: '上海市长...',
                  x: 185,
                  y: 70,
                  textAlign: 'center',
                  fill: '#000',
                  width: 30,
                  height: 30,
                },
              }, {
                tooltip: {
                  trigger: 'item',
                  position: [145, 35],
                  formatter: '上海市长宁区水城路902号',
                },
                type: 'text',
                style: {
                  text: '上海市长...',
                  x: 302,
                  y: 70,
                  textAlign: 'center',
                  fill: '#000',
                  width: 30,
                  height: 30,
                },
              }, {
                tooltip: {
                  trigger: 'item',
                  position: [20, 180],
                  formatter: '上海市长宁区水城路858号',
                },
                type: 'text',
                style: {
                  text: '上海市长...',
                  x: 70,
                  y: 215,
                  textAlign: 'center',
                  fill: '#000',
                  width: 30,
                  height: 30,
                },
              }, {
                tooltip: {
                  trigger: 'item',
                  position: [35, 180],
                  formatter: '上海市长宁区天山路460号',
                },
                type: 'text',
                style: {
                  text: '上海市长...',
                  x: 185,
                  y: 215,
                  textAlign: 'center',
                  fill: '#000',
                  width: 30,
                  height: 30,
                },
              }, {
                tooltip: {
                  trigger: 'item',
                  position: [75, 180],
                  formatter: '上海市长宁区天山路488号',
                },
                type: 'text',
                style: {
                  text: '上海市长...',
                  x: 302,
                  y: 215,
                  textAlign: 'center',
                  fill: '#000',
                  width: 30,
                  height: 30,
                },
              },
              ],
              series: [
                {
                  // name: '西北门',
                  type: 'pie',
                  radius: ['18%', '26%'],
                  center: ['16%', '40%'],
                  avoidLabelOverlap: false,
                  // hoverAnimation: { radius: '19%' },
                  label: {
                    normal: {
                      show: false,
                      position: 'center',
                    },
                    emphasis: {
                      show: true,
                      textStyle: {
                        fontSize: '10',
                        fontWeight: 'bold',
                      },
                    },
                  },
                  labelLine: {
                    normal: {
                      show: false,
                    },
                  },
                  data: data.add1,
                },
                {
                  // name: '西北门',
                  type: 'pie',
                  radius: ['18%', '26%'],
                  center: ['45%', '40%'],
                  avoidLabelOverlap: false,
                  label: {
                    normal: {
                      show: false,
                      position: 'center',
                    },
                    emphasis: {
                      show: true,
                      textStyle: {
                        fontSize: '10',
                        fontWeight: 'bold',
                      },
                    },
                  },
                  labelLine: {
                    normal: {
                      show: false,
                    },
                  },
                  data: data.add2,
                },
                {
                  // name: '西北门',
                  type: 'pie',
                  radius: ['18%', '26%'],
                  center: ['74%', '40%'],
                  avoidLabelOverlap: false,
                  label: {
                    normal: {
                      show: false,
                      position: 'center',
                    },
                    emphasis: {
                      show: true,
                      textStyle: {
                        fontSize: '10',
                        fontWeight: 'bold',
                      },
                    },
                  },
                  labelLine: {
                    normal: {
                      show: false,
                    },
                  },
                  data: data.add3,
                },
                {
                  // name: '西北门',
                  type: 'pie',
                  radius: ['18%', '26%'],
                  center: ['16%', '84%'],
                  avoidLabelOverlap: false,
                  label: {
                    normal: {
                      show: false,
                      position: 'center',
                    },
                    emphasis: {
                      show: true,
                      textStyle: {
                        fontSize: '10',
                        fontWeight: 'bold',
                      },
                    },
                  },
                  labelLine: {
                    normal: {
                      show: false,
                    },
                  },
                  data: data.add4,
                },
                {
                  // name: '西北门',
                  type: 'pie',
                  radius: ['18%', '26%'],
                  center: ['45%', '84%'],
                  avoidLabelOverlap: false,
                  label: {
                    normal: {
                      show: false,
                      position: 'center',
                    },
                    emphasis: {
                      show: true,
                      textStyle: {
                        fontSize: '10',
                        fontWeight: 'bold',
                      },
                    },
                  },
                  labelLine: {
                    normal: {
                      show: false,
                    },
                  },
                  data: data.add5,
                },
                {
                  // name: '西北门',
                  type: 'pie',
                  radius: ['18%', '26%'],
                  center: ['74%', '84%'],
                  avoidLabelOverlap: false,
                  label: {
                    normal: {
                      show: false,
                      position: 'center',
                    },
                    emphasis: {
                      show: true,
                      textStyle: {
                        fontSize: '10',
                        fontWeight: 'bold',
                      },
                    },
                  },
                  labelLine: {
                    normal: {
                      show: false,
                    },
                  },
                  data: data.add6,
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
  .weekState{
    width: 100%;
    opacity: 0.86;
    margin-top: 25px;
    background: rgba(255,255,255,0.4);
  }
</style>
