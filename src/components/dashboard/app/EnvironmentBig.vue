<template>
  <section class="en-big-module">
    <div class="content">
      <div class="top clearfix">
        <div @click="$router.push({path: '/environmental-monitoring/RealTimeMonitor'});" class="left add-pointer">环境监测</div>
        <div class="right">
          <span>{{`${requestData.smoke && requestData.smoke.lastTimeMsg?requestData.smoke.lastTimeMsg:'1秒'}前更新`}}</span>
        </div>
      </div>
      <div class="bottom clearfix">
        <el-row style="height: 100%;">
          <el-col :span="6" class="leftInfo">
            <div class="leafImg">
              <div class="topImg" :style="{  'backgroundImage': resData.judgeNum >= 70 ?
             'url(' + greenLeaf + ')' : (resData.judgeNum < 70 && resData.judgeNum >= 50 ?
              'url(' + commonLeaf + ')' : 'url(' + badLeaf + ')') }">
              </div>
              <div class="leafText" :style="{'color':
             resData.judgeNum >= 70 ? goodColor :
              (resData.judgeNum < 70 && resData.judgeNum >= 50 ? commonColor :
               badColor)}">{{judgeText}}</div>
            </div>
            <div class="leafName">环境质量</div>
          </el-col>
          <el-col :span="14">
            <div id="envChart" :style="{width: '100%', height: '100%'}"></div>
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
import bigCommon from './component/BigComponent';
import goodLeaf from '../../../assets/images/dashboard/bigEnviron/ss.png';
import commonLeaf from '../../../assets/images/dashboard/bigEnviron/yb.png';
import badLeaf from '../../../assets/images/dashboard/bigEnviron/wr.png';
import { getNowMonth6 } from '../../../assets/js/getNowMonth6';

export default {
  data() {
    return {
      greenLeaf: goodLeaf,
      commonLeaf,
      badLeaf,
      commonColor: '#FFE639',
      badColor: '#FF8740',
      goodColor: '#50FFCC',
      judgeNum: 80,
      judgeText: '',
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
        // 甲醛
        formaldehydeData: [0, 0, 0, 0, 0, 0, 0],
        coData: [0, 0, 0, 0, 0, 0, 0],
        temperatureData: [0, 0, 0, 0, 0, 0, 0],
        // 左侧通用data
        totalEquipNum: 0,
        monthWarnNum: 0,
        dayWarnNum: 0,
      },
    };
  },
  mounted() {
    this.getBEnvDataVuex();
  },
  components: {
    bigCommon,
  },
  computed: {
    ...mapGetters(['requestData']),
  },
  watch: {
    'requestData.environment.updateTime': function env() {
      this.getBEnvDataVuex();
    },
  },
  methods: {
    // 获取数据
    getBEnvDataVuex() {
      if (this.requestData.environment && this.requestData.environment.data) {
        this.resData = this.requestData.environment.data.list;
      }
      this.drawLine();
      this.numTextFun();
    },
    // 判断图里的文字
    numTextFun() {
      if (this.resData.judgeNum >= 70) this.judgeText = '舒适';
      else if (this.resData.judgeNum < 70 && this.resData.judgeNum >= 50) {
        this.judgeText = '一般';
      } else this.judgeText = '污染';
    },
    // 绘图
    drawLine() {
      const that = this;
      // 基于准备好的dom，初始化echarts实例
      const environmrntChart = this.$echarts.init(document.getElementById('envChart'));
      // myChart.showLoading();
      // 绘制图表
      const option = {
        title: {
          text: '',
          subtext: '',
        },
        grid: {
          left: '0',
          right: '5%',
          top: '20%',
          bottom: '2%',
          containLabel: true,
        },
        tooltip: {
          trigger: 'axis',
        },
        legend: {
          orient: 'horizontal',
          textStyle: { color: '#C8D2F0', fontSize: '14' },
          selected: {
            // '二氧化碳' : false
          },
          data: [
            '温度',
            {
              name: '甲醛',
              textStyle: { fontWeight: 'bold' },
            },
            '二氧化碳',
          ],
        },
        toolbox: {
          show: false,
          feature: {},
        },
        calculable: true,
        xAxis: [
          {
            type: 'category',
            axisLine: {
              lineStyle: {
                type: 'solid',
                color: '#5E72A9',
                width: '1.5',
              },
            },
            boundaryGap: false,
            data: getNowMonth6(),
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
            name: '甲醛',
            type: 'line',
            smooth: true,
            itemStyle: {
              normal: { areaStyle: { type: 'default', color: '#51E8BC' } },
            },
            lineStyle: { color: '#51E8BC', width: 4 },
            data: that.resData.formaldehydeData,
          },
          {
            name: '二氧化碳',
            type: 'line',
            smooth: true,
            itemStyle: {
              normal: { areaStyle: { type: 'default', color: '#32CEFF' } },
            },
            lineStyle: { color: '#32CEFF', width: 4 },
            data: that.resData.coData,
          },
          {
            name: '温度',
            type: 'line',
            smooth: true,
            itemStyle: {
              normal: {
                areaStyle: {
                  type: 'default',
                  color: '#FFE639',
                },
              },
            },
            lineStyle: {
              color: '#FFD639',
              width: 4,
            },
            data: that.resData.temperatureData,
          },
        ],
      };
      environmrntChart.setOption(option);
      window.addEventListener('resize', () => {
        environmrntChart.resize();
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
    overflow: hidden;
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
      > div {
        display: flex;
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
          padding: 2%;
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
            font-size: 2vw;
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
    }
  }
}
</style>
