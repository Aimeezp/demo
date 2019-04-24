<template>
  <section class="SmokeBigCenter">
    <div class="gjDiv">
      <img :src="smokeWarnIcon">
      <span>今日烟警告警</span>
      <div>
        <el-progress id="circleProgress2" :show-text="false" :text-inside="true" :stroke-width="10" :percentage="smokePer" color="#32CEFF"></el-progress>
      </div>
      <span class="numStyle blue">{{smokeBigCenterData.smokeNum}}</span>
    </div>
    <div class="gjDiv">
      <img :src="fireWarnIcon">
      <span>今日火警告警</span>
      <div>
        <el-progress id="circleProgress3" :show-text="false" :text-inside="true" :stroke-width="10" :percentage="firePer" color="#FF7B2D"></el-progress>
      </div>
      <span class="numStyle orange">{{smokeBigCenterData.fireNum}}</span>
    </div>
    <ul>
      <li>
        <div class="resolved">
          <span class="icon" :style="'background-image:url('+resovedIcon+')'">{{smokeBigCenterData.resolvedNum}}</span>
          <span>已解决</span>
        </div>
      </li>
      <li>
        <div class="unresolved">
          <span class="icon" :style="'background-image:url('+unresovedIcon+')'">{{smokeBigCenterData.unsolvedNum}}</span>
          <span>未解决</span>
        </div>
      </li>
      <li>
        <div class="perDiv">
          <el-progress id="circleProgress1" :show-text="false" :stroke-width="4" :width="60" type="circle" :percentage="smokeBigCenterData.errNum" color="#7E92CF">
          </el-progress><span class="percentTxt">{{smokeBigCenterData.errNum+'%'}}</span><span>故障率</span>
        </div>
      </li>
    </ul>
  </section>
</template>
<script>
import { mapGetters } from 'vuex';
import fireWarnIcon from '../../../assets/images/dashboard/bigSmoke/hjjb.png';
import smokeWarnIcon from '../../../assets/images/dashboard/bigSmoke/yjjb.png';
import resovedIcon from '../../../assets/images/dashboard/bigSmoke/yjj.png';
import unresovedIcon from '../../../assets/images/dashboard/bigSmoke/wjj.png';

export default {
  data() {
    return {
      fireWarnIcon,
      smokeWarnIcon,
      resovedIcon,
      unresovedIcon,
      smokeWarnTotal: 100,
      smokePer: 0,
      fireWarnTotal: 100,
      firePer: 0,
      smokeBigCenterData: {},
    };
  },
  computed: {
    ...mapGetters(['requestData']),
  },
  watch: {
    'requestData.smoke.updateTime': function smoke() {
      this.formatData();
    },
  },
  mounted() {
    this.formatData();
    this.setProgress();
  },
  methods: {
    formatData() {
      if (this.requestData.smoke && this.requestData.smoke.data) {
        this.smokeBigCenterData = this.requestData.smoke.data.list.centerList;
        const smokeNums = this.smokeBigCenterData.smokeNum * 100;
        const smokeAll = this.smokeWarnTotal;
        this.smokePer = parseInt(smokeNums / smokeAll, 10);
        const fireNums = this.smokeBigCenterData.fireNum * 100;
        const fireAll = this.fireWarnTotal;
        this.firePer = parseInt(fireNums / fireAll, 10);
      }
    },
    setProgress() {
      const prs1 = document.getElementById('circleProgress1');
      const prs2 = document.getElementById('circleProgress2');
      const prs3 = document.getElementById('circleProgress3');
      prs1.querySelector('.el-progress-circle__track').setAttribute('stroke', '#2B3C71');
      prs2.querySelector('.el-progress-bar__outer').style.backgroundColor = '#2B3C71';
      prs3.querySelector('.el-progress-bar__outer').style.backgroundColor = '#2B3C71';
    },
  },
};
</script>
<style scoped lang="scss">
  .SmokeBigCenter{
    padding-right:4vw;
    height:100%;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    justify-content: space-around;
    .clearfix:after {
      content:"";
      display: block;
      clear:both;
    }
    .gjDiv{
      width:100%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      img{width:1.2vw;height:1.2vw;}
      span{font-size: 1.1vw;color:#C8D2F0;margin-top:-3px;}
      div{width:60%;padding:0 1vw;margin-top:3px;
        div{width:100%;}
      }
      .numStyle{font-size: 0.8vw;text-align:right;margin-top:1px;}
      .blue{color:#32CEFF};
      .orange{color:#FF7B2D;}
    }
    ul{
      display:flex;
      flex-direction: row;
      justify-content: space-between;
      li{color:#C8D2F0;font-size:0.8vw;text-align: center;
        .resolved .icon,.unresolved .icon{
          background-repeat: no-repeat;
          background-position: center bottom;
          background-size: 100%;
          width:60px;height:60px;line-height:60px;
        }
        span{display: block;text-align: center;}
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
</style>
