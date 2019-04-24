<template>
  <section class="big-component">
    <div v-for="(item, index) in textIcon"
         :key="item.key"
         :class="['clearfix', {'topBottom30': index === 1 }, {'top10': index === 0 }]">
      <div class="left">
        <i :class="'icon iconfont '+item.iconFont"></i>
      </div>
      <div class="right">
        <div :class="['top', {'numGl': index === 2}]">
          <span v-if="index ===0 ">{{totalEquipNumn}}</span>
          <span v-if="index ===1 ">{{monthWarnNumn}}</span>
          <span v-if="index ===2 ">{{dayWarnNumn}}</span>
        </div>
        <div class="bottom">
          {{item.name}}
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'big-component',
  data() {
    return {
      totalEquipNumn: 0,
      monthWarnNumn: 0,
      dayWarnNumn: 0,
    };
  },
  mounted() {
    this.totalEquipNumn = this.totalEquipNum;
    this.monthWarnNumn = this.monthWarnNum;
    this.dayWarnNumn = this.dayWarnNum;
  },
  props: {
    textIcon: {
      type: Array,
      deep: true,
    },
    totalEquipNum: {
      type: Number,
      default: 0,
    },
    monthWarnNum: {
      type: Number,
      default: 0,
    },
    dayWarnNum: {
      type: Number,
      default: 0,
    },
  },
  watch: {
    totalEquipNum(n) {
      this.totalEquipNumn = n;
    },
    monthWarnNum(n) {
      this.monthWarnNumn = n;
    },
    dayWarnNum(n) {
      this.dayWarnNumn = n;
    },
  },
};
</script>

<style scoped lang="scss">
.big-component{
  width: 200vw;// 200px
  overflow: hidden;
  height:100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  .clearfix:after {
    content:"";
    display: block;
    clear:both;
  }
  >div{
    .left{
      float: left;
      width: 2.5vw;// 50px
      height: 2.5vw;// 50px
      border-radius: 2.5vw;// 50px
      background: #263870;
      margin-top: 0.6vw;// 18px
      text-align: center;
      line-height: 2.5vw;// 50px
      margin-right: 2vw;// 45px
      i {
        font-size: 1.16vw;
        color: #7E92CF;
      }
    }
    .right{
      float: left;
      width: 4vw;
      .numGl{
        color: #FFCC59!important;
      }
      .top{
        font-size: 1.6vw;// 36
        color: #C8D2F0;
        letter-spacing: 0;
        text-align: center;
      }
      .bottom{
        font-size: 0.8vw; // 24
        color: #C8D2F0;
        letter-spacing: 0;
        text-align: center;
      }
    }
  }
}
</style>
