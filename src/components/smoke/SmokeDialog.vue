<template>
  <div class="smokeDialog">
    <el-dialog
      :title="title"
      :visible.sync="$store.state.smoke.smokeVideoShow"
      :close-on-click-modal="false"
      width="50%">
      <div class="content">
        <div class="player" @click="openVideo">
          <img src="../../assets/images/player.png">
        </div>
      </div>
    </el-dialog>
    <VideoHome ref="video"></VideoHome>
  </div>

</template>

<script>
import bus from '@/utils/eventBus';
import VideoHome from '../mainPage/video/VideoHome';

export default {
  data() {
    return {
      title: '监测点A-320',
      serialNumber: '',
      alarmText: '',
      deviceType: '',
    };
  },
  components: {
    VideoHome,
  },
  created() {
    bus.$on('fullAlarm', this.onAlarm);
  },
  beforeDestroy() {
    window.document.body.style.overflow = 'auto';
    bus.$off('fullAlarm', this.onAlarm);
  },
  methods: {
    openVideo() {
      this.$store.state.smoke.smokeVideoShow = false;
      this.$refs.video.videoDialogVisible = true;
    },
    onAlarm([deviceType, serialNumber, alarmText]) {
      this.$store.state.smoke.smokeVideoShow = true;
      this.serialNumber = serialNumber;
      this.deviceType = deviceType;
      this.alarmText = alarmText;
    },
  },
};
</script>
<style lang="scss">
  .smokeDialog{
    .content{
      background: url("../../assets/images/smokeCAD.png");
      background-size: cover;
      width:100%;
      height:500px;
      position:relative;
      .player{
        position:absolute;
        top:12%;
        left:33%;
        cursor: pointer;
        img{
          width:50px;
        }
      }
    }
    .el-dialog{
      background: #282B52;
      .el-dialog__title{
        font-size: 20px;
        color: #4DA8F3;
      }
      .el-dialog__body {
        padding: 30px 20px 80px 20px;
      }
      .el-dialog__headerbtn .el-dialog__close{
        color:#B0B0B0;
      }
    }
  }
</style>
