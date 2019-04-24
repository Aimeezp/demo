<template>
  <div class="SmallComponent">
    <div class="topHead clearfix">
      <span @click="$router.push({path: skipUrl})" class="topTitle add-pointer">{{title}}</span>
      <div class="updataTime">{{timeDiffer}}前更新</div>
    </div>
    <div class="centerCount">
      <i class="leftIcon iconfont" :class="iconCls"></i>
      <div class="center">
        <p :class="['numberTi', dataList.number >= 70 ? 'good' : (dataList.number <50 ? 'bad' : 'common')]" v-if="type==='environment'">
          {{envFormat(dataList.number)}}
        </p>
        <p :class="['numberTi', dataList.number >= 70 ? 'good' : (dataList.number <50 ? 'bad' : 'common')]" v-else-if="type==='dust'">
          {{dustFormat(dataList.number)}}
        </p>
        <p class="number" v-else>
          <ICountUp :startVal="startVal" :endVal="parseInt(dataList.number, 10) || 0" :duration="2.5"
            :options="{useEasing: true,useGrouping: true,separator: ''}" />
        </p>
        <p class="bgClass count" v-if="type ==='environment'">环境质量</p>
        <p class="bgClass count" v-else-if="type ==='dust'">颗粒物量</p>
        <p class="bgClass count" v-else-if="type ==='cover'">今日告警</p>
        <p class="bgClass count" v-else>告警次数</p>
      </div>
    </div>
    <ul class="bottomData">
      <li>
        <span class="num">{{dataList.device || 0}}</span>
        <span class="bgClass">设备数</span>
      </li>
      <li>
        <span class="num" v-if="type === 'smoke'">{{dataList.smokeNum || 0}}</span>
        <span class="num" v-else>{{dataList.monthAlarm || 0}}</span>
        <span class="bgClass" v-if="type === 'smoke'">当月烟警</span>
        <span class="bgClass" v-else>当月告警</span>
      </li>
      <li>
        <span class="num" v-if="type === 'smoke'">{{dataList.fireNum || 0}}</span>
        <span class="num" v-else-if="type === 'cover'">{{dataList.lost + dataList.lower || 0}}</span>
        <span class="num" v-else>{{dataList.monthError || 0}}</span>
        <span class="bgClass" v-if="type === 'smoke'">当月火警</span>
        <span class="bgClass" v-else>当月故障</span>
      </li>
    </ul>
  </div>
</template>

<script>
import ICountUp from 'vue-countup-v2';

export default {
  name: 'SmallComponent',
  data() {
    return {
      title: '',
      iconCls: '',
      skipUrl: '',
      startVal: 0,
    };
  },
  props: {
    // 设备类型
    type: {
      type: String,
      required: true,
    },
    timeDiffer: {
      type: String,
      required: true,
    },
    dataList: {
      type: Object,
      required: true,
    },
  },
  components: {
    ICountUp,
  },
  mounted() {
    switch (this.type) {
      case 'smoke': {
        this.title = '智能烟感';
        this.iconCls = 'icon-yanjing';
        break;
      }
      case 'cover': {
        this.title = '井盖监测';
        this.iconCls = 'icon-jinggai';
        break;
      }
      case 'environment': {
        this.title = '环境监测';
        this.iconCls = 'icon-huanjing';
        break;
      }
      case 'doorlock': {
        this.title = '门磁监测';
        this.iconCls = 'icon-menci';
        break;
      }
      case 'dust': {
        this.title = '扬尘监测';
        this.iconCls = 'icon-yangchen';
        break;
      }
      case 'dustbin': {
        this.title = '垃圾箱监测';
        this.iconCls = 'icon-lajitong';
        break;
      }
      default:
        break;
    }
    const allApps = [...this.$router.options.routes[0].children];
    for (let i = 0; i < allApps.length; i += 1) {
      if (this.type === allApps[i].name) {
        this.skipUrl = allApps[i].path;
        break;
      }
    }
  },
  methods: {
    // 环境监测
    envFormat(num) {
      let txt = '';
      if (num >= 70) txt = '舒适';
      else if (num >= 60 && num < 70) txt = '一般';
      else txt = '污染';
      return txt;
    },
    // 扬尘检测
    dustFormat(num) {
      let txt = '';
      if (num >= 70) txt = '正常';
      else if (num >= 60 && num < 70) txt = '一般';
      else txt = '超标';
      return txt;
    },
  },
};
</script>


<style lang="scss">
$fontColor: #c8d2f0;
.SmallComponent {
  $hoverTitle: #6bdef5;
  height: 100%;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  box-sizing: border-box;
  padding: 1vw;
  .topHead {
    width: 100%;
    height: 15%;
    .topTitle {
      float: left;
      font-size: 1.5vw;
    }
    .topTitle:hover {
      color: $hoverTitle;
    }
    .updataTime {
      float: right;
      font-size: 1vw;
      color: $fontColor;
    }
  }
  .centerCount {
    padding-top: 1vw;
    position: relative;
    .leftIcon {
      position: absolute;
      left: 5%;
      top: 20%;
      font-size: 4.5vw;
      color: #586DB2;
    }
    > div {
      p {
        text-align: left;
        font-size: 1vw;
        color: $fontColor;
      }
      .count {
        width: 24%;
        margin: 0 auto;
        text-align: center;
      }
      .number,
      .numberTi {
        height: 3vw;
        line-height: 3vw;
        text-align: center;
        margin-bottom: 0.1vw;
      }
      .number {
        font-size: 3vw;
        color: #ffe639;
      }
      .numberTi {
        font-size: 2.5vw;
        /*color: #50ffcc;*/
      }
      .good{
        color: #50FFCC;
      }
      .common{
        color: #FFE639;
      }
      .bad{
        color: #FF8740;
      }
    }
  }
  .bottomData {
    display: flex;
    > li {
      flex: 1;
      width: 24%;
      margin: 4.6%;
      span {
        font-size: 1vw;
        color: $fontColor;
        display: block;
        text-align: center;
      }
      .num {
        font-size: 2vw;
        margin-bottom: 0.3vw;
      }
    }
  }
  .bgClass {
    opacity: 0.7;
    background: #263870;
    border-radius: 100px;
  }
}
</style>
