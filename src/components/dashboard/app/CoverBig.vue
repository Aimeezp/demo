<template>
  <section class="en-big-module">
    <div class="content">
      <div class="top clearfix">
        <div @click="$router.push({path: '/holecover/equipment-monitoring'});" class="left add-pointer">井盖监测</div>
        <div class="right">
          <span>{{timeDiffer}}</span>前更新
        </div>
      </div>
      <div class="bottom clearfix">
        <el-row style="height: 100%;">
          <el-col :span="8" class="leftInfo">
            <div class="leafImg">
              <div class="topImg" :style="{  'backgroundImage':
             'url(' + greenLeaf + ')'}">
              </div>
              <div class="leafText">
                <ICountUp :startVal="0" :endVal="parseInt(coverData.dayWater + coverData.dayWarn, 10) || 0" :duration="2.5" :options="{useEasing: true,useGrouping: true,separator: ''}"/>
              </div>
              <div class="leafName">今日告警</div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="centerData">
              <div class="warnData">
                <div class="warnDataBox">
                  <div class="dayWater" :style="{height: `${coverCenterData.dayWaterHeight}px`}">
                    <p class="num">{{coverData.dayWater}}</p>
                  </div>
                  <p class="text">今日水位告警</p>
                </div>
                <div class="warnDataBox">
                  <div class="dayWarn" :style="{height: `${coverCenterData.dayWarnHeight}px`}">
                    <p class="num">{{coverData.dayWarn}}</p>
                  </div>
                  <p class="text">今日开启告警</p>
                </div>
              </div>
              <ul class="solved">
                <li>
                  <div class="resolved">
                    <span class="icon" :style="'background-image:url('+resovedIcon+')'">{{coverData.resoved}}</span>
                    <span>已解决</span>
                  </div>
                </li>
                <li>
                  <div class="unresolved">
                    <span class="icon" :style="'background-image:url('+unresovedIcon+')'">{{coverData.unresoved}}</span>
                    <span>未解决</span>
                  </div>
                </li>
              </ul>
            </div>
          </el-col>
          <el-col :span="3">
            <div class="cons-top-text">
              <span class="text">失联设备</span>
              <span class="num">{{coverData.lost}}</span>
            </div>
            <div class="cons-top-text">
              <span class="text">低电量设备</span>
              <span class="num">{{coverData.lower}}</span>
            </div>
          </el-col>
          <el-col :span="3">
            <div class="cons-img">
              <img src="../../../assets/images/dashboard/bigCover/slsb.png" alt="">
            </div>
            <div class="cons-img">
              <img src="../../../assets/images/dashboard/bigCover/dlsb.png" alt="">
            </div>
          </el-col>
          <el-col :span="4">
            <bigCommon
              :totalEquipNum="coverData.device"
              :monthWarnNum="coverData.monthAlarm"
              :dayWarnNum="coverData.lost + coverData.lower"
              :textIcon="textIcon"></bigCommon>
          </el-col>
        </el-row>
      </div>
    </div>
  </section>
</template>
<script>
import ICountUp from 'vue-countup-v2';
import bigCommon from './component/BigComponent';
import timeDiffer from '../../../assets/js/dashboard/timeDiffer';
import goodLeaf from '../../../assets/images/dashboard/bigCover/jgjcsj.png';
import resovedIcon from '../../../assets/images/dashboard/bigCover/yjj.png';
import unresovedIcon from '../../../assets/images/dashboard/bigCover/wjj.png';

export default {
  data() {
    return {
      greenLeaf: goodLeaf,
      coverCenterData: {
        dayWaterHeight: 70, // 每日水位高度
        dayWarnHeight: 20, // 每日告警高度
      },
      resovedIcon,
      unresovedIcon,
      timeDiffer: 0,
      coverData: {},
      textIcon: [
        {
          iconFont: 'icon-shebei',
          name: '设备数',
        },
        {
          iconFont: 'icon-shuiwei',
          name: '当月告警',
        },
        {
          iconFont: 'icon-dangyue',
          name: '当月故障',
        },
      ],
    };
  },
  created() {
    const nowTime = new Date();
    const frontTime = nowTime.setMinutes(nowTime.getMinutes() - 1);
    this.timeDiffer = timeDiffer(Date.now(), frontTime);
  },
  mounted() {
    this.getCoverData();
  },
  components: {
    bigCommon,
    ICountUp,
  },
  methods: {
    getCoverData() {
      const param = {};
      window.vaApi.coverData(param).then(({ data: { status, data } }) => {
        if (parseInt(status, 10) === 1) {
          this.coverData = data.list;
        }
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
        /*flex: 1;*/
        height:84%;
        > div {
          display: flex;
          height:100%;
        }
        .cons-top-text{
          color:#C8D2F0;
          line-height: 2vw;
          margin-top: 34%;
          font-size: 1vw;
          .text{
            display:block;
          }
          .num{
            font-size: 1.5vw;
          }
        }
        .cons-img{
          width:50%;
          margin-top: 35%;
          img{width:100%}
        }
        .el-col {
          position: relative;
          height: 100%;
        }
        .leftInfo {
          /*display: flex;*/
          /*flex-direction: column;*/
          height: 87%;
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
              font-size: 2.5vw;
              position: absolute;
              color:#ffe639;
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
            margin-top: 5px;
          }
        }
      }
      .centerData{
        padding:0 2vw 0 0;
        /*display:flex;*/
        /*flex-direction: column;*/
        /*justify-content: space-around;*/
        height:100%;
        .warnData{
          display:flex;
          flex-direction: row;
          justify-content: space-between;
          height: 40%;
          >div{
            position: relative;
            width: 120px;
            >div{
              margin: auto;
              position: absolute;
              left: 0;
              right: 0;
              bottom: 20px;
              .num{
                font-size: 1vw;
                position: absolute;
                left: 0;
                right: 0;
                top: 0;
                bottom: 0;
                margin: auto;
                width: 40px;
                height: 20px;
                line-height: 20px;
                text-align: center;
                color:#fff;
              }
            }
            p{
              text-align: center;
              color: #C8D2F0;
            }
            .text{
              font-size: 1vw;
              position: absolute;
              bottom: -10px;
              left: 0;
              right: 0;
            }
          }
          .dayWater{
            width:4vw;
            background-color: #32CEFF;
          }
          .dayWarn{
            width:4vw;
            background-color: #FF7B2D;
          }
        }
        .solved{
          display:flex;
          margin-top: 2vw;
          flex-direction: row;
          justify-content: space-between;
          /*height: 30%;*/
          li{color:#C8D2F0;font-size:0.8vw;text-align: center;width:120px;
            .resolved .icon,.unresolved .icon{
              background-repeat: no-repeat;
              background-position: center bottom;
              background-size: 100%;
              width:60px;height:60px;line-height:60px;
              font-size: 1vw;
            }
            span{display: block;text-align: center;margin: auto}
            .perDiv{position:relative;
              span{margin-top:-3px;}
            }
            span.percentTxt{
              width:100%;
              height:60px;
              line-height:60px;
              text-align:center;
              position: absolute;
              top:0;
              left:0;
              margin-top:0;
            }
          }
        }
      }
    }
  }
</style>
