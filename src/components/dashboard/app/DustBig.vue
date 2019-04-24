<template>
  <section class="en-big-module">
    <div class="content">
      <div class="top clearfix">
        <div @click="$router.push({path: '/dust/DustMonitoring'});" class="left add-pointer">扬尘监测</div>
        <div class="right">
          <span>{{`${requestData.smoke && requestData.smoke.lastTimeMsg?requestData.smoke.lastTimeMsg:'1秒'}前更新`}}</span>
        </div>
      </div>
      <div class="bottom clearfix">
        <el-row style="height: 100%;">
          <el-col :span="6" class="leftInfo">
            <div class="leafImg">
              <div class="topImg" :style="{  'backgroundImage': resData.number >= 70 ?
             'url(' + greenLeaf + ')' : (resData.number < 70 && resData.number >= 50 ?
              'url(' + commonLeaf + ')' : 'url(' + badLeaf + ')') }">
              </div>
            </div>
            <div class="leafName">颗粒物量</div>
          </el-col>
          <el-col :span="14">
            <div class="dustChart">
              <div id="dustChart" :style="{width: '100%', height: '100%'}"></div>
            </div>

          </el-col>
          <el-col :span="4">
            <bigCommon
              :totalEquipNum="resData.device"
              :monthWarnNum="resData.monthAlarm"
              :dayWarnNum="resData.dayAlarm"
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
import goodLeaf from '../../../assets/images/dashboard/dust/good.png';
import commonLeaf from '../../../assets/images/dashboard/dust/general.png';
import badLeaf from '../../../assets/images/dashboard/dust/bad.png';
import restore from '../../../assets/images/dashboard/dust/restore.png';

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
      restoreIcon: restore,
      resData: {
        number: 0,
        // 折线图data
        heighter: [0, 0, 0, 0, 0, 0, 0],
        lowest: [0, 0, 0, 0, 0, 0, 0],
        average: [0, 0, 0, 0, 0, 0, 0],
        xAxis: [0, 0, 0, 0, 0, 0, 0],
        // 左侧通用data
        totalEquipNum: 0,
        monthWarnNum: 0,
        dayWarnNum: 0,
      },
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
    };
  },
  mounted() {
    this.getDustDataVuex();
  },
  components: {
    bigCommon,
  },
  computed: {
    ...mapGetters(['requestData', 'editAble']),
  },
  watch: {
    'requestData.dust.updateTime': function env() {
      this.getDustDataVuex();
    },
    editAble: function edit() {
      this.drawLine();
    },
  },
  methods: {
    // 获取数据
    getDustDataVuex() {
      if (this.requestData.dust && this.requestData.dust.data) {
        this.resData = this.requestData.dust.data.list;
      }
      this.drawLine();
    },
    // 绘图
    drawLine() {
      const that = this;
      // 基于准备好的dom，初始化echarts实例
      const dustChart = this.$echarts.init(document.getElementById('dustChart'));
      // myChart.showLoading();
      // 绘制图表
      const option = {
        title: {
          text: '',
          subtext: '',
        },
        grid: {
          left: '1%',
          right: '8%',
          top: '20%', // 14
          bottom: '20%',
          containLabel: true,
        },
        tooltip: {
          trigger: 'axis',
        },
        legend: {
          orient: 'horizontal', // 'vertical'
          textStyle: { color: '#C8D2F0', fontSize: '14' },
          selected: {
          },
          data: [
            '最高值',
            {
              name: '平均值',
              textStyle: { fontWeight: 'bold' }, // #C8D2F0
            },
            '最低值',
          ],
        },
        toolbox: {
          show: true,
          // showTitle: false,
          width: 100,
          height: 100,
          right: 25,
          feature: {
            restore: {
              // icon: `image://${that.restoreIcon}`,
              iconStyle: {
                borderColor: '#32A2EB',
                borderWidth: 2,
              },
            },
          },
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
            data: that.resData.xAxis,
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
            minInterval: '20',
            type: 'value',
            nameGap: 30,
            interval: 20,
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
        dataZoom: [
          {
            type: 'slider',
            show: !this.editAble,
            start: 0,
            end: 10,
            bottom: 0,
            backgroundColor: 'rgba(43, 60, 113, 1)',
            fillerColor: '#32A2EB',
            borderColor: 'rgba(43, 60, 113, 1)',
            showDetail: false,
            handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
            handleSize: '80%',
            handleStyle: {
              color: '#32A2EB ',
              shadowBlur: 3,
              shadowColor: '#fff', // rgba(43, 60, 113, 1)
              shadowOffsetX: 0,
              shadowOffsetY: 0,
            },
          },
        ],
        series: [
          {
            name: '最高值',
            type: 'line',
            smooth: true,
            areaStyle: {
              color: '#E167FF',
            },
            lineStyle: { color: '#E167FF', width: 4 },
            data: that.resData.heighter,
          },
          {
            name: '平均值',
            type: 'line',
            smooth: true,
            areaStyle: {
              color: '#FDB458',
            },
            lineStyle: { color: '#FDB458', width: 4 },
            data: that.resData.average,
          },
          {
            name: '最低值',
            type: 'line',
            smooth: true,
            areaStyle: {
              color: '#32FFFE',
            },
            lineStyle: {
              color: '#32FFFE',
              width: 4,
            },
            data: that.resData.lowest,
          },
        ],
      };
      dustChart.setOption(option);
      window.addEventListener('resize', () => {
        dustChart.resize();
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
    display: flex;
    flex-direction: column;
    height: 100%;
    .top {
      height:15%;
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
        font-size: 0.9vw; // 24
        color: #c8d2f0;
      }
    }
    .bottom {
      height:85%;
      /*flex: 1;*/
      > div {
        display: flex;
        height: 100%;
      }
      .el-col {
        position: relative;
        height: 100%;
      }
      .leftInfo {
        /*display: flex;*/
        /*flex-direction: column;*/
        height: 85%;
        .leafImg {
          height: 80%;
          /*flex: 1;*/
          padding: 1.2vw;
          position: relative;
          .topImg {
            width: 100%;
            height: 100%;
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center bottom;
          }
          .leafText {
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
          background: #2b3c71;
          border-radius: 1vw; // 100px
          text-align: center;
        }
      }
      .dustChart{
        height:100%;
        .reBtn{
          background: #32A2EB;
          border-radius: 100px;
          color:#fff;
          width:80px;
          text-align: center;
          line-height: 25px;
          position:absolute;
          top:0;
          right:10%;
        }
      }
    }
  }
}
</style>
