<template>
  <section class="common-big-module">
    <div class="content">
      <div class="top clearfix">
        <div class="left">设备总览</div>
        <div class="right">
          <span>{{timeDiffer}}</span>前更新
        </div>
      </div>
      <div class="bottom clearfix">
        <el-row style="height: 100%;">
          <el-col class="left-panel" :span="7">
            <div :class="['panel', 'bottom10']">
              <div class="name">设备总数：</div>
              <div class="num">
                <ICountUp
                  :startVal="0"
                  :endVal="parseInt(resData.totalEquipNum, 10)"
                  :decimals="decimals"
                  :duration="duration"
                  :options="options"
                />
              </div>
            </div>
            <div class="panel panel-bottom">
              <div>
                <div class="name">设备在线</div>
                <div class="num">
                  <!--{{resData.onlineNum}}-->
                  <ICountUp
                    :startVal="0"
                    :endVal="parseInt(resData.onlineNum, 10)"
                    :decimals="decimals"
                    :duration="duration"
                    :options="options"
                  />
                </div>
              </div>
              <div>
                <div class="name">设备故障</div>
                <div class="num">
                  <!--{{resData.badNum}}-->
                  <ICountUp
                    :startVal="0"
                    :endVal="parseInt(resData.badNum, 10)"
                    :decimals="decimals"
                    :duration="duration"
                    :options="options"
                  />
                </div>
              </div>
            </div>
          </el-col>
          <el-col class="bottom-center" :span="14">
            <div class="echart-top">
              <div v-for="processItem in processList" :key="processItem.key">
                <el-row style="position: relative;">
                  <el-col class="echart-top-name" style="line-height: 18px;" :span="8">{{processItem.name}}：</el-col>
                  <el-col :span="10">
                    <el-progress :text-inside="true"
                                 :stroke-width="18"
                                 :color="processItem.color"
                                 :show-text="false"
                                 :percentage="processItem.num"></el-progress>
                  </el-col>
                  <el-col :offset="1"
                          style="color: #fff;position: absolute;left: 50%;
    transform: translate(-50%, -50%);
    top: 50%;" :span="4">
                    {{processItem.num}}%
                  </el-col>
                </el-row>
              </div>
            </div>
            <div class="echart-bottom">
              <div id="myChartBar" style="width: 100%;height: 100%;" ></div>
            </div>
          </el-col>
          <el-col class="bottom-right" :span="3">
            <div class="name">综合评分</div>
            <div class="right-img">
              <ICountUp
                :startVal="startVal"
                :endVal="parseInt(scopeNum, 10)"
                :decimals="decimals"
                :duration="duration"
                :options="options"
              />
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </section>
</template>
<script>
import { mapGetters } from 'vuex';
import ICountUp from 'vue-countup-v2';

export default {
  data() {
    return {
      timeDiffer: '1秒',
      processList: [
        {
          name: '在线率',
          num: 0,
          color: '#51E8BC',
        },
        {
          name: '故障率',
          num: 0,
          color: '#FF7B2D',
        },
      ],
      scopeNum: 0,
      startVal: 0,
      decimals: 0,
      duration: 2.5,
      options: {
        useEasing: true,
        useGrouping: true,
        separator: '',
        decimal: '.',
        prefix: '',
        suffix: '',
      },
      resData: {
        totalEquipNum: 0,
        echartData: [0, 0, 0, 0, 0, 0],
        // x轴刻度
        monthList: ['4月', '5月', '6月', '7月', '8月', '9月'],
        // 在线率
        onlineRate: 0,
        // 故障率
        badRate: 0,
        // 设备在线数
        onlineNum: 593,
        // 设备故障数
        badNum: 145,
        // 综合评分
        scopeNum: 0,
      },
      screenHeight: 0,
      echartTop: '6%',
      echartFont: 12,
      countNum: 0,
    };
  },
  created() {
    this.screenHeight = window.innerHeight;
    if (this.screenHeight <= 768) {
      this.echartTop = '4%';
      this.echartFont = 10;
    } else {
      this.echartTop = '6%';
      this.echartFont = 12;
    }
  },
  mounted() {
    this.getCommonDataVuex();
  },
  components: {
    ICountUp,
  },
  computed: {
    ...mapGetters(['requestData']),
  },
  watch: {
    'requestData.common.updateTime': function common() {
      this.getCommonDataVuex();
    },
  },
  methods: {
    getCommonDataVuex() {
      if (this.requestData.common && this.requestData.common.data) {
        this.resData = this.requestData.common.data.list;
        this.processList[0].num = this.resData.onlineRate;
        this.processList[1].num = this.resData.badRate;
        this.scopeNum = this.resData.scopeNum;
        this.timeDiffer = this.requestData.common.lastTimeMsg;
      }
      this.drawLine();
    },
    // echart
    drawLine() {
      const that = this;
      // 基于准备好的dom，初始化echarts实例
      const myChart = this.$echarts.init(document.getElementById('myChartBar'));
      // myChart.showLoading();
      // 绘制图表
      const option = {
        title: {
          // text: '报警次数',
          x: '86%',
          y: that.echartTop,
          textStyle: {
            fontSize: that.echartFont,
            color: '#C8D2F0',
          },
        },
        color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        grid: {
          left: '10%',
          right: '16%',
          bottom: '14%', // 5
          top: '10%', // 14
          containLabel: true,
        },
        xAxis: [
          {
            // name: '月份',
            nameTextStyle: {
              color: '#C8D2F0',
              fontSize: that.echartFont,
            },
            axisLine: {
              lineStyle: {
                type: 'solid',
                color: '#5E72A9',
                width: '1.5',
              },
            },
            type: 'category',
            data: that.resData.monthList,
            axisTick: {
              alignWithLabel: true,
            },
            axisLabel: {
              textStyle: {
                color: '#C8D2F0',
                fontSize: 12,
              },
            },
          },
        ],
        yAxis: [
          {
            type: 'value',
            splitLine: {
              lineStyle: {
                type: 'dashed',
                color: '#5E72A9',
                width: '1.5',
              },
            },
            axisLine: {
              lineStyle: {
                type: 'solid',
                color: '#5E72A9',
                width: '1.5',
              },
            },
            axisLabel: {
              textStyle: {
                color: '#C8D2F0',
                fontSize: 12,
              },
            },
          },
        ],
        series: [
          {
            name: '在线次数', // 报警次数
            type: 'bar',
            barWidth: '14',
            itemStyle: {
              normal: {
                // 柱形图圆角，初始化效果
                barBorderRadius: [10, 10, 0, 0],
                color(params) {
                  const colorList = [
                    '#51E8BC', '#51E8BC', '#51E8BC', '#51E8BC', '#51E8BC', '#51E8BC',
                  ];
                  return colorList[params.dataIndex];
                },
              },
            },
            data: that.resData.echartData,
          },
          {
            name: '故障次数',
            type: 'bar',
            barWidth: '14',
            itemStyle: {
              normal: {
                // 柱形图圆角，初始化效果
                barBorderRadius: [10, 10, 0, 0],
                color(params) {
                  const colorList = [
                    '#FF7B2D', '#FF7B2D', '#FF7B2D', '#FF7B2D', '#FF7B2D', '#FF7B2D',
                  ];
                  return colorList[params.dataIndex];
                },

              },
            },
            data: that.resData.echartBadData,
          },
        ],
      };
      myChart.setOption(option);
      window.addEventListener('resize', () => {
        myChart.resize();
      });
    },
  },
};
</script>
<style lang="scss">
  .common-big-module{
    width: 95%;
    height: 86%;
    padding: 1vw 1vw;// 24px 40px
    /*<!--$hoverTitle: #6BDEF5;-->*/
    .el-progress-bar__outer{
      background: #2B3C71;
    }
    .clearfix:after {
      content:"";
      display: block;
      clear:both;
    }
    .greenText{
      color: #51E8BC;
    }
    .content{
      height: 100%;
      .top{
        height: 12%;
        margin-bottom: 2%;
        .left{
          float: left;
          font-size: 1.4vw;
          color: #FFFFFF;
          /*<!--&:hover{-->*/
            /*<!--color: $hoverTitle;-->*/
          /*<!--}-->*/
        }
        .right{
          float: right;
          font-size: 0.9vw;
          color: #C8D2F0;
        }
      }
      .bottom{
        height: 84%;
        >div{
          display: flex;
        }
        .name{
          font-size: 1.4vw;
          color: #C8D2F0;
        }
        .left-panel{
          height: 100%;
          >div{
            height: 46%;
          }
          .bottom10{
            margin-bottom: 6.5%;
          }
          .panel{
            background: rgba(255,255,255,0.08);
            border-radius: 4px;
            display: flex;
            >div{
              text-align: center;
              display: table-cell;
              margin: auto;
            }
            .name{
              width: 50%;
            }
            .num{
              width: 45%;
              text-align: left;
              font-family: PingFangTC-Medium;
              font-size: 2.4vw;
              color: #FFD639;
            }
          }
          .panel-bottom{
            display: flex;
            >div{
              flex: 1;
            }
            .name{
              font-size: 1.2vw;
              width: 100%;
            }
            .num{
              width: 100%;
              text-align: center;
              font-family: PingFangTC-Medium;
              font-size: 1.8vw;
              color: #FFD639;
            }
          }
        }
        .bottom-center{
          height: 100%;
          background: rgba(255,255,255,0.08);
          padding-top: 1.2vw;
          margin-left: 1vw;
          margin-right: 1vw;
          .echart-top{
            width: 97%;
            height: 10%;
            margin-left: 3%;
            font-size: .9vw;
            color: #C8D2F0;
            text-align: left;
            line-height: 1vw;
            >div{
              width: 46%;
              float: left;
            }
          }
          .echart-bottom{
            height: 90%;
            #myChartBar{

            }
          }
        }
        .bottom-right{
          height: 100%;
          background: rgba(255,255,255,0.08);
          padding-top: 1.2vw;
          overflow: hidden;
          text-align: center;
          .right-img{
            height: 6vw;
            text-align: center;
            line-height: 6vw;
            font-family: PingFangTC-Medium;
            font-size: 2vw;
            color: #50FFCC;
            margin-top: 20%;
            background: url('../../../assets/images/dashboard/commonBg.png') no-repeat top center;
            background-size: contain;
          }
        }
      }
    }
  }
</style>
