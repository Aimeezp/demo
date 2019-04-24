<template>
  <section class="big-module">
    <div class="content">
      <div class="top clearfix">
        <div class="left add-pointer" @click="$router.push({path: dustBinTitle.url});">{{dustBinTitle.title}}</div>
        <div class="right">
          <span>{{`${sendBigData && sendBigData.lastTimeMsg?sendBigData.lastTimeMsg:'1秒'}前更新`}}</span>
        </div>
      </div>
      <div class="bottom clearfix">
        <el-row>
          <el-col :span="6">
            <div class="totalNumDiv">
              <slot name="dashboardBigLeftIcon">
              </slot>
              <div class="leafName">告警次数</div>
            </div>
          </el-col>
          <el-col :span="14">
            <slot name="dashboardBigCenter"></slot>
          </el-col>
          <el-col :span="4">
            <slot name="dashboardBigRight"></slot>
          </el-col>
        </el-row>
      </div>
    </div>
  </section>
</template>
<script>
// import SmokeBigCenter from '../SmokeBigCenter';

export default {
  props: {
    textIcon: {
      required: true,
    },
    sendBigData: {
      required: true,
    },
    dustBinTitle: {
      required: true,
    },
  },
  // components: {
  //   SmokeBigCenter,
  // },
};
</script>
<style scoped lang="scss">
.big-module {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 1vw;
  $hoverTitle: #6bdef5;
  .clearfix:after {
    content: "";
    display: block;
    clear: both;
  }
  .content {
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
        font-size: 0.9vw; // 24
        color: #c8d2f0;
      }
    }
    .bottom {
      height: 85%;
      .el-row {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
      }
      .el-col,
      .el-row {
        height: 100%;
      }
      .totalNumDiv {
        height: 100%;
        padding: 8%;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        .leafImg {
          margin: 0 auto;
          width: 100%;
          height: 75%;
          // background: url(${this.leftIcon})
          //   no-repeat center bottom;
          background-size: contain;
          font-family: PingFangTC-Medium;
          font-size: 2vw;
          color: #ffe639;
          position: relative;
          div {
            position: absolute;
            left: 50%;
            top: 54%;
            transform: translate(-50%, -50%);
          }
        }
        .leafName {
          font-size: 0.8vw;
          color: #c8d2f0;
          width: 8vw; // 140px
          height: 1.8vw; // 32px
          line-height: 1.8vw;
          position: relative;
          top: 6%;
          margin: 0 auto;
          background: #2b3c71;
          border-radius: 1vw; // 100px
          text-align: center;
        }
      }
    }
  }
}
</style>
