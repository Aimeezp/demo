<template>
  <el-dialog
    class="video-home-dialog-page"
    title=""
    :visible.sync="videoDialogVisible"
    :close-on-click-modal="false"
    width="46%"
    :before-close="handleVideoClose">
    <div class="video-monitor-home-page">
      <section class="content-btm">
        <!--<div class="nav-left">-->
          <!--<el-menu-->
            <!--:default-openeds="videoOpeneds"-->
            <!--default-active="1-1-1"-->
            <!--class="el-menu-vertical-demo el-menu-video-home">-->
            <!--<el-submenu index="1">-->
              <!--<template slot="title">-->
                <!--<span class="list-icon"></span>-->
                <!--<span>监控列表</span>-->
              <!--</template>-->
              <!--<el-submenu id="monitor-el-submenu"-->
                          <!--v-for="(item1, index1) in videoMonitorTreeData"-->
                          <!--:index="`'1-'${(index1+1).toString()}`"-->
                          <!--:key="index1">-->
                <!--<template slot="title">{{item1.name}}</template>-->
                <!--<el-menu-item @click="handleNodeClick(item2)" v-for="(item2, index2) in item1.child"-->
                              <!--:index="`'1-'${(index1+1).toString()}-${(index2+1).toString()}`" :key="index2">-->
                  <!--{{item2.name}}</el-menu-item>-->
              <!--</el-submenu>-->
            <!--</el-submenu>-->
          <!--</el-menu>-->
        <!--</div>-->
        <div class="content-right">
          <div class="video-title-div">
            <div class="addr-left">{{videoAddr}}</div>
            <div class="btn-right">
              <div @click="nowSwitch = 1;" :class="['left', 'cursor',  parseInt(nowSwitch, 10) === 1 ? 'switchGL' : '']">直播</div>
              <div class="right cursor">回放</div>
            </div>
          </div>
          <div v-show="recordLoadingBefore || (!recordLoadingVideo && !recordVideoPause && progressValue > 0)"
               :style="{'background-color': (recordLoadingBefore || (mediaSpaceInstance && !recordLoadingVideo || !recordTimeChange)  !== undefined) ? 'black' : '#1D1F41'}"
               class="zdc" ></div>
          <div id='player' style="width: 100%;">
            <div v-if="!recordTimeChange && recordClickTree" style="margin-top: 120px; text-align: center;">{{videoTxt}}</div>
          </div>
          <div v-show="parseInt(nowSwitch, 10) === 2" class="time">
            <!--:disabled="videoId === '' && !recordLoadingVideo"-->
            <el-slider v-model="progressValue"
                       :disabled="videoId === ''"
                       @change="progressChange"
                       :format-tooltip="progressFormatTime"
                       :max="progressMaxNum"></el-slider>
            <div class="progress-option">
              <div class="back-div" @click="handleNodeClick('后退')"></div>
              <div @click="playPauseFun" class="play-pause-div" :style="{
             background: `url(${playBackPng}) center center no-repeat`,
             'background-size': 'contain',
          }"></div>
              <div class="come-div" @click="handleNodeClick('前进')"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </el-dialog>
</template>


<script>
import { formatDateDate } from '../../../assets/js/formatDateAll';
// import playBackVideo from '../../components/videoMonitor/PlayBackVideo';
import playPng from '../../../assets/images/videoMonitor/play.png';
import pausePng from '../../../assets/images/videoMonitor/pause.png';
import { videoIp } from '../../../config/baseIp';

window.player = '';
window.thisVue = '';
let onJSBridge = '';
export default {
  name: 'direct-broadcast',
  data() {
    return {
      videoAddr: '监测点A-302',
      videoDialogVisible: false,
      recordTd: false,
      recordZbUrl: '',
      recordTimeChange: false,
      videoTxt: '视频正在加载中。。。',
      playBackPng: pausePng,
      videoUrl: '',
      isInited: false,
      recordVideoComplate: false,
      recordVideoSuccess: false,
      videoStartTime: '',
      videoEndTime: '',
      progressFormatTimeV: '',
      mediaSpaceInstance: undefined,
      recordPlayBackNumChange: false,
      recordPlayBackNum: 0,
      playBackVideoData: {},
      playBackVideoUrlList: [],
      recordClickTree: false,
      recordVideoPause: false,
      recordLoadingBefore: false,
      recordLoadingVideo: false,
      playBackSectionTotal: 0,
      totalDuration: 0,
      intervalInstance: undefined,
      progressChangeIntervalInstance: undefined,
      progressValue: 0,
      progressMaxNum: 100,
      videoType: '',
      // videoUrl: '',
      videoFile: '',
      timeType: 1,
      videoId: '',
      backVideoId: '',
      videoOpeneds: ['1', '1-1'],
      nowSwitch: 1, // 1-直播，2-回放
      isMapHome: true,
      height: '560', // `${window.innerHeight - 102}`,
      width: '840', // `${window.innerWidth - 300}`,
      videoMonitorTreeData: [{
        label: 'NVR',
        id: 1,
        name: 'NVR',
        ip: '192.168.0.102',
        port: 80,
        account: 'admin',
        password: '12345678',
        maker: '宇视',
        lng: null,
        lat: null,
        addr: null,
        model: '',
        type: 2,
        url: 'rtmp://10.203.128.40/oflaDemo',
        parent: 0,
        channelid: 0,
        children: [{
          id: 2,
          label: '摄像头-1',
          name: '摄像头',
          ip: '10.203.128.21',
          port: 554,
          account: 'admin',
          password: '123456',
          maker: '宇视',
          lng: null,
          lat: null,
          addr: null,
          model: null,
          type: '2',
          url: 'rtmp://10.203.128.21/oflaDemo',
          file: 'hello-1',
          parent: 1,
          channelid: 1,
        }],
      }],
      defaultProps: {
        children: 'children',
        label: 'label',
      },
    };
  },
  created() {
    window.thisVue = this;
    const nowDate = formatDateDate(new Date() - (24 * 60 * 60 * 1000)).split(' ')[0];
    this.videoStartTime = `${nowDate} 00:00:00`;
    this.videoEndTime = `${nowDate} 24:00:00`;
    if (this.videoDialogVisible) {
      this.handleNodeClick();
    }
    // this.getVideoMonitorTreeList();
  },
  components: {
    // playBackVideo,
  },
  watch: {
    totalDuration() {
      this.progressMaxNum = this.totalDuration;
    },
    recordPlayBackNum() {
      this.recordPlayBackNumChange = true;
    },
    nowSwitch() {
      this.initVariableFun();
      if (this.videoId) this.handleNodeClick();
    },
    mediaSpaceInstance() {
      if (this.mediaSpaceInstance) this.destroyIntervalInstanceFun();
    },
    recordVideoPause() {
      // if (this.recordVideoPause) this.destroyIntervalInstanceFun();
    },
    recordVideoComplate() {
      // if (this.recordVideoComplate) this.destroyIntervalInstanceFun();
    },
    videoDialogVisible() {
      if (this.videoDialogVisible) {
        this.handleNodeClick();
      }
    },
  },
  methods: {
    resetVideo() {
      const { getGrindPlayerScript, handleNodeClick } = this;
      getGrindPlayerScript().then(handleNodeClick);
    },
    getGrindPlayerScript() {
      if (!window.swfobject) {
        window.swfobject = {};
        window.swfobject.self_preloader = new Promise((resolve) => {
          const $script = document.createElement('script');
          window.document.body.appendChild($script);
          $script.src = '../../../../public/videoMonitor/swfobject.min.js';
          window.self_initGrindInstance = function selfInitGrindInstanceFun() {
            resolve(window.swfobject);
            window.document.removeChild($script);
            window.swfobject.self_preloader = null;
            window.self_initGrindInstance = null;
          };
        });
        return window.swfobject.self_preloader;
      } if (!window.swfobject.self_preloader) {
        return Promise.resolve(window.swfobject);
      }
      return window.swfobject.self_preloader;
    },
    handleVideoClose() {
      this.videoDialogVisible = false;
      // this.videoStopFun({ driveId: this.videoId });
    },
    initVariableFun() {
      this.recordPlayBackNum = 0;
      this.playBackVideoData = {};
      this.playBackVideoUrlList = [];
      this.recordClickTree = false;
      this.recordVideoPause = false;
      this.recordLoadingBefore = false;
      this.recordLoadingVideo = false;
      this.recordTimeChange = false;
      this.playBackSectionTotal = 0;
      this.totalDuration = 0;
    },
    playPauseFun() {
      const that = this;
      if (!that.videoId) {
        this.$message({
          message: '请先选择摄像头',
          type: 'warning',
        });
        return;
      }
      that.destroyIntervalInstanceFun();
      /**
         * pausePng 暂停
         * playPng  播放
         * nowSwitch:
         * 1-直播
         * 2-回放
         * 直播停止传driveId,重播停止传videoId
         */
      if (window.thisVue.recordVideoPause) {
        that.handleNodeClick();
        return;
      }
      let params = {};
      if (parseInt(that.nowSwitch, 10) === 1 && !that.videoId) return;
      if (!that.backVideoId) return;
      if (parseInt(that.nowSwitch, 10) === 1) {
        params = {
          driveId: that.videoId,
        };
      } else {
        params = {
          videoId: that.backVideoId,
        };
      }
      that.videoStopFun(params);
    },
    videoStopFun(params) {
      const that = this;
      return new Promise((resolve) => {
        window.vaApi.videoMonitorStopFun(params).then(({ data: { status } }) => {
          if (parseInt(status, 10) === 1) {
            if (parseInt(that.nowSwitch, 10) === 2) {
              this.playBackPng = pausePng;
              window.thisVue.recordVideoPause = true;
            }
            resolve();
          }
        });
      });
    },
    initGrindInstance(url) {
      const that = this;
      window.thisVue = this;
      onJSBridge = function onJSBridgeName(playerId, event) {
        // if (parseInt(window.thisVue.nowSwitch, 10) === 2 || !url) return;
        switch (event) {
          case 'onJavaScriptBridgeCreated':
            // reference to player
            window.player = document.getElementById(playerId);
            window.thisVue.recordLoadingBefore = true;
            break;

            // player state change
          case 'ready':
            break;
          case 'loading':
            break;
          case 'playing':
            window.thisVue.recordVideoSuccess = true;
            window.thisVue.recordClickTree = false;
            window.thisVue.intervalInstance = window.thisVue.setIntervalInstanceFun();
            window.thisVue.recordLoadingVideo = true;
            window.thisVue.recordLoadingBefore = false;
            // init
            window.thisVue.recordVideoPause = false;
            window.thisVue.recordVideoComplate = false;
            window.thisVue.playBackPng = playPng;
            break;
          case 'timeChange':
            window.thisVue.recordTimeChange = true;
            break;
          case 'paused':
            window.thisVue.recordVideoPause = true;
            window.thisVue.recordTimeChange = false;
            window.thisVue.playBackPng = pausePng;
            // window.thisVue.recordVideoComplate = true;
            // window.thisVue.recordLoadingVideo = false;
            // window.thisVue.recordLoadingBefore = false;
            break;
          case 'buffering':
            break;
            // other events
          case 'mediaSize':
            break;

          case 'seeking':
            break;
          case 'seeked':
            break;
          case 'volumeChange':
            break;
          case 'durationChange':
            break;
          case 'progress': // for progressive download only
            break;
          case 'complete':
            window.thisVue.playBackPng = pausePng;
            window.thisVue.recordVideoComplate = true;
            window.thisVue.recordLoadingVideo = false;
            window.thisVue.recordLoadingBefore = false;
            window.thisVue.recordTimeChange = false;
            window.thisVue.progressValue = 0;
            window.thisVue.totalDuration = 0;
            break;
          case 'advertisement':
          default:
            break;
        }
      };
      if (!url) {
        window.thisVue.playBackPng = playPng;
      }
      const flashvars = {
        src: url,
        controlBarAutoHide: true,
        controlBarAutoHideTimeout: 0,
        javascriptCallbackFunction: onJSBridge,
      };
      const params = {
        allowFullScreen: true,
        allowScriptAccess: 'always',
        bgcolor: '#000000',
        videoHeight: that.height,
        videoWidth: that.width,
      };
      const attrs = {
        name: 'player',
      };
      window.swfobject.embedSWF('GrindPlayer.swf', 'player', that.width, that.height, '10.2', null, flashvars, params, attrs);
      // const onMediaError = function () {
      //   console.log(arguments.callee.name, arguments);
      //   // start media again
      //   // player.load();
      // }
      // player.addEventListener('mediaError', 'onMediaError');
    },
    progressChange() {
      const that = this;
      that.recordTd = true;
      that.recordPlayBackNumChange = true;
      if (that.recordLoadingVideo || that.progressValue < that.totalDuration) {
        that.progressChangeIntervalInstance = that.setIntervalInstanceFun();
      }
      if (parseInt(that.nowSwitch, 10) === 2) {
        that.videoStartTime = `${that.videoStartTime.split(' ')[0]} ${that.progressFormatTimeV}`;
        that.handleNodeClick();
      }
    },
    progressFormatTime() {
      const that = this;
      const it = parseInt(that.progressValue, 10);
      const h = parseInt(it / (60 * 60), 10);
      const m = parseInt((it % 3600) / 60, 10);
      const s = parseInt(it % 60, 10);
      that.progressFormatTimeV = `${(h < 10 ? '0' : '') + h}:${(m < 10 ? '0' : '') + m}:${s < 10 ? '0' : ''}${s}`;
      that.videoStartTime = `${that.videoStartTime.split(' ')[0]} ${that.progressFormatTimeV}`;
      if (that.progressValue !== 0 && that.progressValue >= that.totalDuration) {
        that.removeMediaSpaceInstance();
      } else if (
        that.progressValue < that.totalDuration
          && that.recordPlayBackNumChange
          && parseInt(that.progressValue, 10) !== 0
          && that.progressValue >= that.playBackSectionTotal
          && parseInt(that.nowSwitch, 10) === 2
      ) {
        that.removeMediaSpaceInstance();
        if (parseInt(that.nowSwitch, 10) === 2) that.handleNodeClick();
      } else {
        that.progressChangeIntervalInstance = that.setIntervalInstanceFun();
      }
      that.recordPlayBackNumChange = false;
      return that.progressFormatTimeV;
    },
    getVideoMonitorTreeList() {
      // const that = this;
      // window.vaApi.getVideoMonitorTreeList().then(({ data: { data, status } }) => {
      //   if (parseInt(status, 10) === 1) {
      //     that.videoMonitorTreeData = data;
      //   }
      // });
    },
    handleNodeClick() {
      const that = this;
      // rtmp://10.228.19.109/oflaDemo/hello-1 10.228.19.109   10.228.19.109
      that.videoUrl = `rtmp://${videoIp}/oflaDemo/hello-1`;
      that.videoId = 2;
      that.recordZbUrl = `rtmp://${videoIp}/oflaDemo/hello-1`;
      let params = {};
      let resType = '';
      if (parseInt(that.nowSwitch, 10) === 1) {
        params = {
          driveId: that.videoId,
          width: that.width,
          height: that.height,
        };
        resType = window.vaApi.videoMonitorLiveBroadcast(params);
      } else {
        params = {
          driveId: that.videoId,
          startDate: that.videoStartTime,
          endDate: that.videoEndTime,
          width: that.width,
          height: that.height,
        };
        resType = window.vaApi.videoMonitorPlayBack(params);
      }
      that.destroyIntervalInstanceFun();
      that.removeMediaSpaceInstance();
      that.recordClickTree = true;
      that.recordLoadingBefore = false;
      // init
      that.recordVideoSuccess = false;
      window.thisVue.recordVideoPause = false;
      window.thisVue.recordTimeChange = false;
      // resType.then(({ data: { status, data } }) => {
      //   if (parseInt(status, 10) === 1) {
      //     if (parseInt(that.nowSwitch, 10) === 2) {
      //       that.removeMediaSpaceInstance();
      //       that.playBackVideoData = data;
      //       that.playBackVideoUrlList = data.datelist;
      //       that.videoUrl = data.url;
      //       that.backVideoId = data.videoId;
      //       // that.sliceUrlFile(data.url);
      //       that.playBackVideoUrlList.forEach((itemList) => {
      //         that.totalDuration += (itemList.endDate - itemList.startDate);
      //       });
      //       that.progressMaxNum = that.totalDuration;
      //       that.playBackNumChangeFun();
      //     } else {
      //       that.videoUrl = that.recordZbUrl;
      //       that.initGrindInstance(that.videoUrl);
      //       // that.loadingVideoInstanceFun();
      //     }
      //   }
      // });
      resType.then(({ data: { status, data } }) => {
        if (parseInt(status, 10) === 1) {
          if (parseInt(that.nowSwitch, 10) === 2) {
            that.removeMediaSpaceInstance();
            that.playBackVideoData = data;
            that.playBackVideoUrlList = data.datelist;
            that.videoUrl = data.url;
            that.backVideoId = data.videoId;
            // that.sliceUrlFile(data.url);
            that.playBackVideoUrlList.forEach((itemList) => {
              that.totalDuration += (itemList.endDate - itemList.startDate);
            });
            that.progressMaxNum = that.totalDuration;
            that.playBackNumChangeFun();
          } else {
            that.videoUrl = that.recordZbUrl;
            that.initGrindInstance(that.videoUrl);
            // that.loadingVideoInstanceFun();
          }
        }
      });
      // that.videoStopFun({ driveId: that.videoId }).then(() => {
      //   setTimeout(() => {
      //     resType.then(({ data: { status, data } }) => {
      //       if (parseInt(status, 10) === 1) {
      //         if (parseInt(that.nowSwitch, 10) === 2) {
      //           that.removeMediaSpaceInstance();
      //           that.playBackVideoData = data;
      //           that.playBackVideoUrlList = data.datelist;
      //           that.videoUrl = data.url;
      //           that.backVideoId = data.videoId;
      //           // that.sliceUrlFile(data.url);
      //           that.playBackVideoUrlList.forEach((itemList) => {
      //             that.totalDuration += (itemList.endDate - itemList.startDate);
      //           });
      //           that.progressMaxNum = that.totalDuration;
      //           that.playBackNumChangeFun();
      //         } else {
      //           that.videoUrl = that.recordZbUrl;
      //           that.initGrindInstance(that.videoUrl);
      //           // that.loadingVideoInstanceFun();
      //         }
      //       }
      //     });
      //   }, 3000);
      // });
    },
    playBackNumChangeFun() {
      const that = this;
      that.initGrindInstance();// destroy old video
      let nowItem = that.playBackVideoUrlList[that.recordPlayBackNum];
      that.playBackSectionTotal = (nowItem.endDate - nowItem.startDate);
      for (let i = 0; i < that.recordPlayBackNum; i += 1) {
        const timeCell = that.playBackVideoUrlList[i].endDate - that.playBackVideoUrlList[i].startDate;
        that.playBackSectionTotal += timeCell;
      }
      if (parseInt(that.progressValue, 10) !== 0 && that.progressValue >= that.playBackSectionTotal) {
        that.recordPlayBackNum += 1;
        nowItem = that.playBackVideoUrlList[that.recordPlayBackNum];
        that.playBackSectionTotal += (nowItem.endDate - nowItem.startDate);
      }
      if (parseInt(nowItem.exists, 10) === 0) {
        this.$confirm('该时间段没有视频，是否跳过直接播放下一段视频？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          center: true,
          showCancelButton: false,
          showClose: false,
          closeOnClickModal: false,
        }).then(() => {
          that.progressValue += that.playBackSectionTotal;
          that.initGrindInstance(that.videoUrl);
        });
        //   .catch(() => {
        //   console.log('取消了');
        //   that.recordLoadingVideo = true;
        //   that.intervalInstance = that.setIntervalInstanceFun();
        //   that.initGrindInstance();
        // });
      } else {
        that.recordLoadingVideo = false;
        that.initGrindInstance(that.videoUrl);
        // that.loadingVideoInstanceFun();
      }
    },
    setIntervalInstanceFun() {
      const that = this;
      that.destroyIntervalInstanceFun();
      if (
        (that.progressValue > 0 && that.progressValue >= that.totalDuration) || (!that.recordVideoSuccess && !that.recordLoadingVideo)
      ) {
        // that.$message({
        //   message: '视频正在加载中或已播放完成',
        //   type: 'success',
        // });
        return '';
      }
      return setInterval(() => {
        if (
          (window.thisVue.progressValue > 0 && window.thisVue.progressValue >= window.thisVue.totalDuration)
            || window.thisVue.recordVideoPause
            || window.thisVue.recordLoadingBefore
            || !window.thisVue.recordTimeChange
        ) {
          that.destroyIntervalInstanceFun();
          return;
        }
        that.progressValue += 0.5;
      }, 500);
    },
    sliceUrlFile(url) {
      const urlArr = url.split('//');
      const urlArr2 = urlArr[urlArr.length - 1].split('/');
      this.videoFile = urlArr2[urlArr2.length - 1];
      const url1 = urlArr2.slice(0, urlArr2.length - 1).join('/');
      this.videoUrl = `${urlArr[0]}//${url1}`;
    },
    removeMediaSpaceInstance() {
      // if (this.mediaSpaceInstance && this.recordVideoSuccess) {
      //   this.mediaSpaceInstance.remove();
      //   this.mediaSpaceInstance = undefined;
      //   this.destroyIntervalInstanceFun();
      // }
    },
    destroyIntervalInstanceFun() {
      if (window.thisVue.intervalInstance) {
        clearInterval(window.thisVue.intervalInstance);
        window.thisVue.intervalInstance = undefined;
      }
      if (window.thisVue.progressChangeIntervalInstance) {
        clearInterval(window.thisVue.progressChangeIntervalInstance);
        window.thisVue.progressChangeIntervalInstance = undefined;
      }
    },
  },
  destroyed() {
    this.destroyIntervalInstanceFun();
    this.removeMediaSpaceInstance();
  },
};
</script>

<style lang="scss">
  $bkMain: #282B52;
  $colorBlue: #2AA0E8;
  $bkBtn: #1D1F41;
  $px20: 20px;
  $fontSize16: 16px;
  $videoTressTxt: #9DC7E1;
  .video-home-dialog-page{
    /*.el-dialog__header,*/
    /*.el-dialog__body{*/
      /*min-width: 440px;*/
    /*}*/
    .el-dialog__body{
      overflow: auto;
    }
    .el-dialog__header, .el-dialog__body{
      background-color: $bkBtn;
    }
    .video-monitor-home-page{
      /*height: 100%;*/
      height: 500px;
      background: $bkMain;
      font-size: $fontSize16;
      display: flex;
      flex-direction: column;
      .content-btm{
        flex: 1;
        /*padding-top: 100px;*/
        display: flex;
        font-size: $fontSize16;
        .el-menu {
          border: 0;
          font-size: $fontSize16;
          .el-submenu__title{
            padding-left: 5px!important;
          }
          #monitor-el-submenu{
            .el-submenu__title{
              color: $videoTressTxt;
              padding-left: 25px!important;
              background-color: $bkMain!important;
            }
            /*.el-submenu__icon-arrow{*/
            /*left: 20px!important;*/
            /*}*/
          }
          .el-menu-item{
            font-size: $fontSize16;
            color: $videoTressTxt;
            margin-top: 10px;
            margin-bottom: 10px;
          }
          /*下拉框样式*/
          .el-select{
            .el-input__inner{
              padding-left: 25px;
              font-size: $fontSize16;
              background-color: $bkBtn;
              border-color: $bkBtn;
              color: $colorBlue;
              border-radius: 18px;
            }
          }
          .el-menu-item.is-active {
            color: #fff;
            background-color: $colorBlue!important;
          }
          /*add over*/
          .menuItem {
            padding: 0 !important;
            /*<!--width: $navWidth;-->*/
            /*<!--min-width: $navWidth;-->*/
            a {
              color: #9dc7e1;
              text-decoration: none;
              display: block;
              width: 100%;
              height: 100%;
            }
            .router-link-active {
              color: #fff;
              background-color: $bkMain;
              &::after {
                content: "";
                position: absolute;
                right: 0;
                top: 50%;
                width: 0;
                height: 0;
                border-top: 7px solid transparent;
                border-right: 7px solid $bkMain;
                border-bottom: 7px solid transparent;
                transform: translateY(-50%);
              }
            }
            .menuitem{
              padding-left: $px20;
            }
            .menuItem{
              text-indent: 28px;
            }
          }
          .el-menu-item:focus,
          .el-menu-item:hover,
          .el-submenu__title:focus,
          .el-submenu__title:hover,
          .el-menu-item.is-active,
          .menuItem {
            background-color: $bkMain;
          }
        }
        .el-menu-video-home{
          .el-menu-item{
            padding-left: 35px!important;
          }
        }
        .el-menu-video-video-home,
        .el-menu-video-bitStream-home{
          .el-menu-item{
            padding-left: 18px!important;
          }
        }
        .el-menu-video-time-home{
          .el-menu-item{
            padding-left: 0px!important;
          }
          .el-form-item__label{
            color: $videoTressTxt;
          }
          .el-input__inner{
            font-size: 16px;
            color: $colorBlue;
            padding-right: 0;
            background-color: $bkBtn;
            border-color: $bkBtn;
            border-radius: 18px;
          }
        }
        .el-menu-video-time-home,
        .el-menu-video-video-home,
        .el-menu-video-bitStream-home{
          .el-menu-item{
            padding-right: 15px!important;
          }
          .el-menu-item.is-active {
            background-color: $bkMain!important;
          }
        }
        .el-dropdown-menu__item--divided:before,
        .el-menu, .el-menu--horizontal>.el-menu-item:not(.is-disabled):focus,
        .el-menu--horizontal>.el-menu-item:not(.is-disabled):hover,
        .el-menu--horizontal>.el-submenu .el-submenu__title:hover{
          background: $bkMain!important;
        }
        .nav-left{
          width: 300px;
          overflow: auto;
          .el-menu-video-home,
          .el-menu-video-time-home,
          .el-menu-video-video-home,
          .el-menu-video-bitStream-home{
            .el-submenu__title{
              color: #fff;
              background-color: $bkBtn!important;
              height: 42px;
              line-height: 42px;
              font-size: $fontSize16;
            }
            .el-submenu__title i{
              color: #fff;
            }
            .list-icon{
              background: url("../../../assets/images/videoMonitor/list.png") no-repeat center center;
            }
            .video-icon{
              background: url("../../../assets/images/videoMonitor/video.png") no-repeat center center;
            }
            .bitStream-icon{
              background: url("../../../assets/images/videoMonitor/bitStream.png") no-repeat center center;
            }
            .list-icon,
            .video-icon,
            .bitStream-icon{
              display: inline-block;
              width: 40px;
              height: 30px;
              background-size: 40%;
            }
            .el-tree,
            .el-tree-node__content:hover,
            .el-tree-node:focus>.el-tree-node__content{
              position: relative;
              cursor: default;
              background: $bkMain;
              color: $videoTressTxt;
            }
            .el-tree-node__children{
              margin-top: 14px;
              .el-tree-node{
                height: 40px;
                border: 1px solid red;
              }
            }
          }
        }
        .content-right{
          flex: 1;
          background-color: #1D1F41;
          color: #fff;
          display: flex;
          .video-title-div{
            position: absolute;
            left: 20px;
            right: 50px;
            top: 12px;
            display: flex;
            >div{
              flex: 1;
            }
            .addr-left{
              text-align: left;
              box-sizing: border-box;
              line-height: 40px;
              font-family: PingFangTC-Medium;
              font-size: 20px;
              color: #4DA8F3;
            }
            .btn-right{
              position: absolute;
              top:50%;
              left:52%;
              width:100%;
              transform:translate(-50%,-50%);
              width: 220px;
              color: $videoTressTxt;
              display: flex;
              >div{
                background: #282B52;
                height: inherit;
                font-size: 18px;
                text-align: center;
                line-height: 40px;
                border: 1px solid $colorBlue;
                flex: 1;
              }
              .switchGL{
                color: #fff;
                background: $colorBlue;
              }
              .left{
                border-radius: 100px 0 0 100px;
              }
              .right{
                border-radius: 0 100px 100px 0;
              }
            }
          }
          .zdc{
            position: absolute;
            z-index: 1999;
            top: 0;
            left: 0;
            width: 100%;
            /*width: 300px;*/
            height: 100%;
            color: #fff;
          }
          #mediaspace{
            position: relative;
            height: 100%!important;
            width: 100%!important;
            flex: 1;
            padding-bottom: 100px;
            box-sizing: border-box;
            z-index: 99;
          }
          #mediaspace_wrapper{
            height: 100%!important;
            width: 100%!important;
            padding-bottom: 100px;
            box-sizing: border-box;
          }
          .time{
            padding-left:20px;
            padding-right:20px;
            box-sizing: border-box;
            position: absolute;
            z-index: 2000;
            bottom: 0;
            width: 100%;
            height: 140px;
            background-color: $bkBtn;
            justify-content: space-around;
            .el-slider__button{
              background: #1191DF;
              border-radius: 4px;
              width: 25px;
            }
            .el-slider__bar{
              height: 10px;
            }
            .el-slider__runway{
              background:#3E416E;
              height: 10px;
              border-radius: 10px;
            }
            >div:first-child{
              width: 100%;
            }
            .progress-option{
              width: 20%;
              min-width: 200px;
              height: 80px;
              margin: 5px auto 0 auto;
              display: flex;
              >div{
                flex: 1;
                cursor: pointer;
              }
              .back-div{
                background: url("../../../assets/images/videoMonitor/back.png") center center no-repeat;
              }
              .come-div{
                background: url("../../../assets/images/videoMonitor/come.png") center center no-repeat;
              }
              .back-div,
              .come-div{
                background-size: 40%;
              }
              .play-pause-div{
                background-size: contain!important;
              }
            }
          }
        }
      }
    }
  }
</style>
