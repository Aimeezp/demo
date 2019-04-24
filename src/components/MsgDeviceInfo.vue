<template>
  <el-dialog
    class="msgDeviceInfoDialog"
    :visible.sync="msgDeviceInfoDialogVisible"
    :close-on-click-modal="false"
    width="30%"
    center
    :before-close="msgDeviceInfoDialogHandleClose">
    <div class="self-title">
      <div :class="msgGLFlag ? 'gl-div' : ''" @click="msgGLFlag = true;">消息详情</div>
      <div :class="!msgGLFlag ? 'gl-div' : ''" @click="msgGLFlag = false;">设备详情</div>
    </div>
    <div class="self-body">
      <ul v-if="msgGLFlag">
        <li><span>消息序号&nbsp;：&nbsp;</span><span>{{msgDeviceInfoData.index}}</span></li>
        <li><span>消息类型&nbsp;：&nbsp;</span>
          <span
            :class="msgDeviceInfoData.resultStatus === '已确认'?'disabled'
            :msgDeviceInfoData.resultStatus !== '已确认'&&msgDeviceInfoData.msgType === 1?'red'
            :msgDeviceInfoData.resultStatus !== '已确认'&&msgDeviceInfoData.msgType === 2?'green'
            :msgDeviceInfoData.resultStatus !== '已确认'&&msgDeviceInfoData.msgType === 3?'blue':'orange'">
            {{msgDeviceInfoData.msgType === 1?'告警':msgDeviceInfoData.msgType === 2?'业务':msgDeviceInfoData.msgType === 3?'系统':'故障'}}
          </span>
        </li>
        <li><span>发送时间&nbsp;：&nbsp;</span><span>{{msgDeviceInfoData.time}}</span></li>
        <li><span>消息主题&nbsp;：&nbsp;</span><span>{{msgDeviceInfoData.msgLabel}}</span></li>
        <li>
          <span>通知方式&nbsp;：&nbsp;</span>
          <span v-if="msgDeviceInfoData.noticeType[0].type === '语音已通知'
           || msgDeviceInfoData.noticeType[0].type === '短信已通知'" class="bk-span">
            {{msgDeviceInfoData.noticeType[0].type}}&nbsp;|&nbsp;
            {{msgDeviceInfoData.noticeType[0].mode | telFilter(msgDeviceInfoData.noticeType[0].mode)}}
          </span>
          <span v-else-if="msgDeviceInfoData.noticeType[0].type === '邮件已通知'" class="bk-span">
            {{msgDeviceInfoData.noticeType[0].type}}&nbsp;|&nbsp;
            {{msgDeviceInfoData.noticeType[0].mode | emailFilter(msgDeviceInfoData.noticeType[0].mode)}}
          </span>
          <span v-else class="bk-span">
            {{msgDeviceInfoData.noticeType[0].type}}&nbsp;|&nbsp;
            {{msgDeviceInfoData.noticeType[0].mode}}
          </span>
          <div>
            <template v-for="(item, index) in msgDeviceInfoData.noticeType">
              <div
                v-if="index > 0 && (item.type === '语音已通知' || item.type === '短信已通知')"
                :key="index">
                <span>{{item.type}}&nbsp;|&nbsp;{{item.mode | telFilter(item.mode)}}</span>
              </div>
              <div v-else-if="index > 0 && item.type === '邮件已通知'" :key="index">
                <span>{{item.type}}&nbsp;|&nbsp;{{item.mode | emailFilter(item)}}</span>
              </div>
              <div v-else-if="index > 0" :key="index">
                <span>{{item.type}}&nbsp;|&nbsp;{{item.mode}}</span>
              </div>
              <!--<template v-if="index > 0"><br/></template>-->
            </template>
          </div>
        </li>
        <li>
          <span>业务状态&nbsp;：&nbsp;</span><span>{{msgDeviceInfoData.resultStatus}}</span>
          <span>
             <el-button
               v-if="judgeShowMsgBtn() || msgDeviceInfoData.dispatchStatus !== 1" disabled
               class="dispatchBtn dispatchDis-btn" id="msgDeviceInfoDispatchBtn">派单</el-button>
        <el-button v-else v-loading="dispatchFlag" @click="msgInfoDispatch" class="dispatchBtn dispatch-btn" id="msgDeviceInfoDispatchBtn">派单</el-button>
          </span>
        </li>
      </ul>
      <ul v-else>
        <li><span>设备类型&nbsp;：&nbsp;</span><span>{{deviceTxt}}</span></li>
        <li><span>设备品牌&nbsp;：&nbsp;</span><span>{{msgDeviceInfoData.deviceBrand}}</span></li>
        <li><span>设备型号&nbsp;：&nbsp;</span><span>{{msgDeviceInfoData.deviceMaker}}</span></li>
        <li><span>安装地址&nbsp;：&nbsp;</span><span>{{msgDeviceInfoData.deviceAdress}}</span></li>
        <li><span>消息数据&nbsp;：&nbsp;</span><span>
          {{msgDeviceInfoData.msgType === 1?'告警':msgDeviceInfoData.msgType === 2?'业务':msgDeviceInfoData.msgType === 3?'系统':'故障'}}
        </span></li>
        <!--<li style="position: relative"><span>消息内容&nbsp;：&nbsp;</span>-->
          <!--<div class="msg-content-div">{{msgDeviceInfoData.msgLabel}}</div></li>-->
      </ul>
    </div>
    <span slot="footer" class="dialog-footer">
      <template v-if="msgGLFlag">
        <el-button
          v-if="judgeShowMsgBtn()" disabled
          id="msgDeviceInfoMsgConfirmBtn" class="sure-or-cancleDis-btn">消息确认</el-button>
        <el-button v-else v-loading="msgConfirmFlag" @click="msgInfoConfirmOrCancel(1)" class="sure-or-cancle-btn"
                   id="msgDeviceInfoMsgConfirmBtn">消息确认</el-button>
        <el-button v-if="judgeShowMsgBtn()" disabled class="sure-or-cancleDis-btn">消息取消</el-button>
        <el-button v-else v-loading="msgCancelFlag" @click="msgInfoConfirmOrCancel(2)" class="sure-or-cancle-btn">消息取消</el-button>
      </template>
  </span>
  </el-dialog>
</template>

<script>
import { valueArr, deviceTypeTxt } from '../assets/js/appMapping';
import bus from '../utils/eventBus';
import dataFilters from '../assets/js/dataFilters';

export default {
  mixins: [dataFilters],
  name: 'msg-device-info',
  data() {
    return {
      dispatchFlag: false,
      msgConfirmFlag: false,
      msgCancelFlag: false,
      msgGLFlag: true,
      msgDeviceInfoDialogVisible: false,
      msgDeviceInfoData: {
        id: '5560',
        msgType: '告警',
        sendTime: '2018-06-26 15:42:29',
        theme: '火警',
        noticeType: [{
          type: '语音已通知',
          mode: '13999887766',
        }, {
          type: '短信已通知',
          mode: '13999887766',
        }],
        status: '未确认',
        // device info
        deviceType: 'smoke-sensor',
        brand: '昊想',
        model: 'H5',
        address: '上海市长宁区长宁路1033号',
        msgData: '010712841d00000ed599babe',
        content: '火警',
      },
      deviceTxt: '',
    };
  },
  props: {
    nowMsgInfo: {
      type: Object,
    },
  },
  created() {
    bus.$on('receiveMsgInfo', (data) => {
      this.msgDeviceInfoData = data;
      this.getMsgDeviceInfo();
      this.judgeShowMsgBtn();
    });
  },
  methods: {
    judgeShowMsgBtn() {
      // const flag = this.msgDeviceInfoData.deviceType2 === 'smoke-sensor'
      //   || this.msgDeviceInfoData.deviceType2 === 'gas-monitor'
      //   || this.msgDeviceInfoData.deviceType2 === 'infra-red'
      //   || this.msgDeviceInfoData.deviceType2 === 'dustbin'
      //   || this.msgDeviceInfoData.deviceType2 === 'fire-hydrant'
      //   || this.msgDeviceInfoData.deviceType2 === 'well-cover'
      //   || this.msgDeviceInfoData.deviceType2 === 'geo-mnt';
      const flag = this.msgDeviceInfoData.deviceType2 === 'air-quality'
        || this.msgDeviceInfoData.deviceType2 === 'water-monitor'
        || this.msgDeviceInfoData.deviceType2 === 'noise'
        || this.msgDeviceInfoData.deviceType2 === 'light';
      return flag;
    },
    getMsgDeviceInfo() {
      this.deviceTxt = deviceTypeTxt[valueArr.indexOf(this.msgDeviceInfoData.deviceType2)];
    },
    msgDeviceInfoDialogHandleClose() {
      this.msgGLFlag = true;
      this.msgDeviceInfoDialogVisible = false;
    },
    msgInfoDispatch() {
      this.dispatchFlag = true;
      window.vaApi.msgInfoDispatch().then(({ data: { status } }) => {
        if (parseInt(status, 10) === 1) {
          this.$message({
            message: '消息派单成功',
            type: 'success',
          });
          this.msgDeviceInfoDialogVisible = false;
          this.$parent.msgTableData.filter(item => item.index === this.msgDeviceInfoData.index)[0].dispatchStatus = 0;
          this.dispatchFlag = false;
        }
      });
    },
    msgInfoConfirmOrCancel(type) {
      if (type === 1) this.msgConfirmFlag = true;
      else this.msgCancelFlag = true;
      window.vaApi.msgInfoConfirmOrCancel().then(({ data: { status } }) => {
        if (parseInt(status, 10) === 1) {
          let message = '';
          if (type === 1) {
            this.msgConfirmFlag = false;
            message = '消息确认成功';
            this.$parent.msgTableData.filter(item => item.index === this.msgDeviceInfoData.index)[0].resultStatus = '已确认';
          } else {
            this.msgCancelFlag = false;
            message = '消息取消成功';
            this.$parent.msgTableData.filter(item => item.index === this.msgDeviceInfoData.index)[0].resultStatus = '待确认';
          }
          this.msgDeviceInfoDialogVisible = false;
          this.$message({
            message,
            type: 'success',
          });
        }
      });
    },
  },
};
</script>

<style lang="scss">
  $colorGL: #4DA8F3;
  $colorDispatch: #F38715;
  $colorBk: #ECEEF3;
  $colorTxt: #496277;
  $colorTxtMain: #333333;
  $colorMsgType: #F68277;
.msgDeviceInfoDialog{
  .el-dialog__body{
    height: 300px;
    padding: 0 20px;
  }
  .self-title{
    color: $colorTxtMain;
    display: flex;
    >div{
      cursor: pointer;
      flex: 1;
    }
    :first-child{
      text-align: right;
      padding-right: 20px;
    }
    :last-child{
      text-align: left;
      padding-left: 20px;
    }
    .gl-div{
      color: $colorGL;
    }
  }
  .self-body{
    color: $colorTxtMain;
    >ul>li{
      margin-bottom: 14px;
      .red{
        color:#F35C4D;
      }
      .blue{
        color:#2AA0E8;
      }
      .green{
        color:#00BF4D;
      }
      .orange{
        color:#F38715;
      }
      .gray{
        color:#9B9B9B;
      }
      .disabled{
        opacity: .3;
        color:gray;
      }
      .msg-content-div{
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
      }
      .msgTypeGl {
        color: $colorMsgType;
      }
      span,
      div{
        word-wrap: break-word;
      }
      .dispatchBtn{
        display: inline-block;
        padding: 0;
        font-size: 13px;
        width: 60px;
        height: 25px;
        border-radius: 3px;
        margin-left: 10px;
      }
      .dispatchDis-btn{
        border-color: #8E9EAB;
        color: #8E9EAB;
      }
      .dispatch-btn{
        border-color: $colorDispatch;
        color: $colorDispatch;
      }
      &>span:first-child{
        display: inline-block;
        width: 80px;
      }
      &>div{
        width: auto;
        padding-left: 80px;
        span{
          display: inline-block;
          margin-bottom: 6px;
          background-color: $colorBk;
          color: $colorTxt;
        }
      }
      .bk-span{
        display: inline-block;
        background-color: $colorBk;
        color: $colorTxt;
        margin-bottom: 6px;
      }
    }
  }
  .el-dialog__footer{
    height: 66px;
    .dialog-footer{
      button{
        padding: 0;
        font-size: 16px;
        width: 90px;
        height: 36px;
        border-radius: 3px;
      }
      .sure-or-cancle-btn{
        background-color: $colorGL;
        color: #fff;
        border-color: $colorGL;
      }
      .sure-or-cancleDis-btn{
        background: #8E9EAB;
        color: #FFFFFF;
        border-color: #8E9EAB;
      }
    }
  }
}
</style>
