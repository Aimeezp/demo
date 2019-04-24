<template>
  <section class="en-big-module">
    <div class="content">
      <div class="top clearfix">
        <div @click="$router.push({path: '/environmental-monitoring/RealTimeMonitor'});" class="left add-pointer">门磁监测</div>
        <div class="right">
          <span>{{`${requestData.smoke && requestData.smoke.lastTimeMsg?requestData.smoke.lastTimeMsg:'1秒'}前更新`}}</span>
        </div>
      </div>
      <div class="bottom clearfix">
        <el-row class="self-el-row">
          <el-col :span="6" class="leftInfo">
            <div class="leafImg">
              <div class="topImg" :style="{  'backgroundImage': 'url(' + doorlockImg + ')' }">
              </div>
              <div class="leafText" :style="doorlockNumStyle">
                <ICountUp
                  :startVal="0"
                  :endVal="parseInt(resData.judgeNum, 10)"
                  :decimals="decimals"
                  :duration="duration"
                  :options="options"
                />
              </div>
            </div>
            <div class="leafName">告警次数</div>
          </el-col>
          <el-col class="center-div" :span="14">
            <div class="echart-div">
              <div class="day-chart-title">当日开关门</div>
              <div id="dayChart" :style="{width: '100%', height: '50%'}"></div>
              <div class="month-chart-title">当月开关门</div>
              <div id="monthChart" :style="{width: '100%', height: '50%'}">2</div>
            </div>
            <div class="time-info">
              <div class="time-start">
                <div class="day-time-title">当日最长开启时间</div>
                <div>开启：{{resData.dayStartData.startTime}}</div>
                <div>闭合：{{resData.dayStartData.closeTime}}</div>
                <div>时长：{{resData.dayStartData.duration}}</div>
              </div>
              <div class="time-close">
                <div class="day-time-title">当日最长关闭时间</div>
                <div>开启：{{resData.dayCloseData.startTime}}</div>
                <div>闭合：{{resData.dayCloseData.closeTime}}</div>
                <div>时长：{{resData.dayCloseData.duration}}</div>
              </div>
            </div>
          </el-col>
          <el-col :span="4">
            <bigCommon
              :totalEquipNum="resData.totalEquipNum"
              :monthWarnNum="resData.monthWarnNum"
              :dayWarnNum="resData.dayWarnNum"
            :textIcon="textIcon"></bigCommon>
          </el-col>
        </el-row>
      </div>
    </div>
  </section>
</template>
<script>
import { mapGetters } from 'vuex';
import ICountUp from 'vue-countup-v2';
import bigCommon from './component/BigComponent';
import doorlockimg from '../../../assets/images/dashboard/doorlock/waringBg.png';
import { getNowMonth6 } from '../../../assets/js/getNowMonth6';

export default {
  name: 'doorlockbig',
  data() {
    return {
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
      doorlockNumStyle: {
        color: '#FFE639',
      },
      doorlockImg: doorlockimg,
      textIcon: [
        {
          iconFont: 'icon-shebei',
          name: '设备数',
        },
        {
          iconFont: 'icon-dangyue',
          name: '当月告警',
        },
        {
          iconFont: 'icon-dangri',
          name: '当月故障',
        },
      ],
      resData: {
        judgeNum: 0,
        dayData: [0, 0, 0, 0, 0, 0, 0],
        monthData: [0, 0, 0, 0, 0, 0, 0],
        dayStartData: {
          startTime: '',
          closeTime: '',
          duration: '',
        },
        dayCloseData: {
          startTime: '',
          closeTime: '',
          duration: '',
        },
        // 左侧通用data
        totalEquipNum: 0,
        monthWarnNum: 0,
        dayWarnNum: 0,
        nowMonthArr: [],
      },
    };
  },
  mounted() {
    this.getBdoorlockDataVuex();
  },
  created() {
    this.nowMonthArr = getNowMonth6();
  },
  components: {
    bigCommon,
    ICountUp,
  },
  computed: {
    ...mapGetters(['requestData']),
  },
  watch: {
    'requestData.doorlock.updateTime': function env() {
      this.getBdoorlockDataVuex();
    },
  },
  methods: {
    // 获取数据
    getBdoorlockDataVuex() {
      if (this.requestData.doorlock && this.requestData.doorlock.data) {
        this.resData = this.requestData.doorlock.data.list;
      }
      this.drawDay();
      this.drawMonth();
    },
    // 当日图
    drawDay() {
      const that = this;
      // 基于准备好的dom，初始化echarts实例
      const myChart = this.$echarts.init(document.getElementById('dayChart'));
      // myChart.showLoading();
      // 绘制图表
      const option = {
        title: {
          text: '频率',
          textStyle: {
            color: '#C8D2F0',
            fontSize: 12,
          },
          x: 'right',
          y: '10%',
          subtext: '',
        },
        grid: {
          left: '0',
          right: '19%',
          top: '2%', // 14
          bottom: '4%',
          containLabel: true,
        },
        tooltip: {
          trigger: 'axis',
        },
        toolbox: {
          show: false,
          feature: {},
        },
        calculable: true,
        xAxis: [
          {
            name: '时间',
            nameTextStyle: {
              color: '#C8D2F0',
              fontSize: that.echartFont, // 14
            },
            type: 'category',
            axisLine: {
              lineStyle: {
                type: 'solid',
                color: '#5E72A9',
                width: '1.5',
              },
            },
            boundaryGap: false,
            data: ['0-2', '3-5', '6-8', '9-11', '12-14', '14-16', '17-23'],
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
            show: false,
            type: 'value',
            axisLine: {
              lineStyle: {
                type: 'solid',
                color: '#5E72A9',
                width: '1.5',
              },
            },
            splitLine: {
              lineStyle: {
                type: 'dashed',
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
            name: '次数',
            type: 'line',
            smooth: true,
            itemStyle: {
              normal: {
                color: '#51E8BC',
                areaStyle: {
                  type: 'default', color: 'rgba(94,231,191,0.18)',
                },
              },
            },
            lineStyle: { color: '#51E8BC', width: 2 },
            data: that.resData.dayData,
          },
        ],
      };
      myChart.setOption(option);
      window.addEventListener('resize', () => {
        myChart.resize();
      });
    },
    // 当月图
    drawMonth() {
      const that = this;
      // 基于准备好的dom，初始化echarts实例
      const myChart = this.$echarts.init(document.getElementById('monthChart'));
      // myChart.showLoading();
      // 绘制图表
      const option = {
        title: {
          text: '频率',
          textStyle: {
            color: '#C8D2F0',
            fontSize: 12,
          },
          x: 'right',
          y: '10%',
          subtext: '',
        },
        grid: {
          left: '0',
          right: '18%',
          top: '4%', // 14
          bottom: '1%',
          containLabel: true,
        },
        tooltip: {
          trigger: 'axis',
        },
        toolbox: {
          show: false,
          feature: {},
        },
        calculable: true,
        xAxis: [
          {
            name: '日期',
            nameTextStyle: {
              color: '#C8D2F0',
              fontSize: that.echartFont, // 14
            },
            type: 'category',
            axisLine: {
              lineStyle: {
                type: 'solid',
                color: '#5E72A9',
                width: '1.5',
              },
            },
            boundaryGap: false,
            data: that.nowMonthArr,
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
            show: false,
            type: 'value',
            axisLine: {
              lineStyle: {
                type: 'solid',
                color: '#5E72A9',
                width: '1.5',
              },
            },
            splitLine: {
              lineStyle: {
                type: 'dashed',
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
            name: '次数',
            type: 'line',
            smooth: true,
            itemStyle: {
              normal: {
                color: '#51E8BC',
                areaStyle: { type: 'default', color: 'rgba(94,231,191,0.18)' },
              },
            },
            lineStyle: { color: '#51E8BC', width: 2 },
            data: that.resData.monthData,
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
<style scoped lang="scss">
  $hoverTitle: #6bdef5;
  .en-big-module {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 1vw;
    .content {
      flex-direction: column;
      height: 100%;
      .top {
        height: 15%;
        .left {
          float: left;
          font-size: 1.4vw;
          color: #ffffff;
          &:hover {
            color: $hoverTitle;
          }
        }
        .right {
          float: right;
          font-size: 0.9vw;
          color: #c8d2f0;
        }
      }
      .bottom {
        height:84%;
        .self-el-row {
          height: 100%;
        }
        .el-col {
          position: relative;
          height: 100%;
        }
        .leftInfo {
          height: 100%;
          flex-direction: column;
          .leafImg {
            box-sizing: border-box;
            height: 80%;
            padding: 6%;
            position: relative;
            .topImg {
              width: 100%;
              height: 100%;
              background-size: contain;
              background-repeat: no-repeat;
              background-position: center bottom;
            }
            .leafText {
              font-family: PingFangTC-Medium;
              font-size: 2.5vw;
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
            }
          }
          .leafName {
            font-size: 0.8vw;
            color: #c8d2f0;
            width: 8vw;
            height: 1.8vw;
            line-height: 1.8vw;
            margin: 0 auto;
            margin-top: 6%;
            background: #2b3c71;
            border-radius: 1vw;
            text-align: center;
          }
        }
        .center-div{
          display: flex;
          height: 100%;
          >div{
            height: 100%;
          }
          .echart-div{
            flex: 1;
            position: relative;
            .day-chart-title,
            .month-chart-title{
              font-family: PingFangTC-Regular;
              font-size: .9vw;
              color: #C8D2F0;
            }
            .day-chart-title{
              position: absolute;
              top: 4%;
              left: 0;
            }
            .month-chart-title{
              position: absolute;
              top: 54%;
              left: 0;
            }
          }
          .time-info{
            width: 40%;
            margin-left: 5%;
            .day-time-title{
              font-family: PingFangTC-Regular;
              font-size: .9vw!important;
              color: #C8D2F0;
              margin-bottom: .4vw;
              /*margin-bottom: 1vw;*/
            }
            >div{
              height: 45%;
            }
            .time-close,
            .time-start{
              >div{
                height: 24%;
                font-size: .8vw;
                color: #C8D2F0;
                /*margin-bottom: .4vw;*/
              }
            }
            .time-close{
              margin-top: 8%;
            }
          }
        }
      }
    }
  }
</style>
