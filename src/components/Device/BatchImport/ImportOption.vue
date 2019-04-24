<template>
  <!--upload-->
  <div class="upload-file-div">
    <!--:headers="{Authorization: athorization}"-->
    <!--accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"-->
    <el-upload
      id="import-option-upload-file"
      class="el-upload-self"
      :drag="typeCorrect"
      ref="uploadFileRef"
      :show-file-list="false"
      :action="actionUrl"
      :headers="{Authorization: athorization}"
      :limit="1"
      :disabled="disabledV"
      :on-error="uploadFileErr"
      :on-success="uploadSuccessFun"
      :before-upload="beforeAvatarUpload"
      :on-change="selFileFun"
    >
      <!--<i class="el-icon-upload"></i>-->
      <div v-if="parseInt(previewSuccess, 10) === 0" class="el-upload__text">拖拽Excel表格到本区域上传，或者
        <el-button id="import-option-btn-upload" type="text">点击这里</el-button>
        <!--<el-button v-if="!fileName" disabled type="text">点击这里</el-button>-->
        <!--<el-button id="import-option-btn-upload" v-else type="text">点击这里</el-button>-->
        上传
      </div>
      <!--red err-->
      <div v-else-if="parseInt(previewSuccess, 10) === 1" class="errText">
        <div class="">上传内容验证未通过</div>
        <div>请检查表格内容填写是否正确后再重新导入</div>
      </div>
      <!--loading-->
      <div v-else-if="parseInt(previewSuccess, 10) === 2" class="resErr">
        <img :src="loadingImg" alt="加载预览的进度条">
      </div>
    </el-upload>
    <!--<div class="upload-btn-div">-->
    <!--<el-button id="import-option-btn-cancel" v-if="nowPage !== '/work-order-manage/add'" @click="$parent.cancelUploadFun();">取 消</el-button>-->
    <!--<el-button v-else >取 消</el-button>-->
    <!--<el-button type="primary" disabled>上传</el-button>-->
    <!--</div>-->
    <!--err tip-->
    <uploadErrDialog @sendFromErr="receiveErrData" title="校验文件失败" :uploadErrList="uploadErrList"
                     :uploadTableDialogVisible="uploadTableDialogVisible"></uploadErrDialog>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';
import store from '../../../store/index';
import loadImg from '../../../assets/images/loadingL.gif';
import uploadErrDialog from './uploadErrDialog';
import { backendIp } from '../../../config/baseIp';

export default {
  name: 'import-option',
  data() {
    return {
      // upload variable
      disabledV: false,
      // 预览是否成功：0- 默认显示上传文件， 1-红色报错，2- 加载条显示
      previewSuccess: 0,
      typeCorrect: true,
      dialogVisible: false,
      fileName: '',
      actionUrl: '',
      athorization: '',
      uploadData: [],
      // loading
      fullscreenLoading: false,
      loadingImg: loadImg,
      // preview data
      previewList: [],
      uploadTableDialogVisible: false,
      uploadErrList: [{}],
      nowPage: this.$route.path,
    };
  },
  components: {
    uploadErrDialog,
  },
  computed: {
    ...mapGetters(['batchEditNewDeviceData']),
  },
  created() {
    this.athorization = store.getters.token ? `Bearer ${store.getters.token}` : '';
    this.actionUrl = `http://${backendIp}/unicom-iot/uploadDeviceFile`;
    if (this.batchEditNewDeviceData.length > 0 && this.nowPage === '/work-order-manage/add') {
      this.uploadSuccessFun({
        data: this.batchEditNewDeviceData,
        status: 1,
        message: '批量编辑里监测到的新设备',
      });
    }
  },
  methods: {
    ...mapMutations(['SET_WORK_ORDER_UPLOAD_DATA_LIST']),
    // count down
    threeCountDown() {
      let num = 2;
      const interval = setInterval(() => {
        if (parseInt(num, 10) === 0) {
          clearInterval(interval);
          this.previewSuccess = 0;
          this.typeCorrect = true;
        }
        num -= 1;
      }, 1000);
    },
    // select upload file
    selFileFun(file) {
      this.fileName = file.name;
    },
    // check file format
    beforeAvatarUpload(file) {
      const isExcel = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
      if (!isExcel) {
        this.disabledV = false;
        this.previewSuccess = 1;
        this.typeCorrect = false;
        this.fileName = '';
        this.threeCountDown();
      } else {
        this.previewSuccess = 2;
        this.disabledV = false;
        this.fileName = file.name;
        this.actionUrl = `http://${backendIp}/unicom-iot/uploadDeviceFile`;
      }
      return isExcel;
    },
    // upload fail
    uploadFileErr() {
      this.previewSuccess = 0;
      this.fileName = '';
      // setTimeout(() => { // use
      // window.location.reload();// use
      // this.fileName = '';
      // this.disabledV = false;
      // this.previewSuccess = 0;
      // this.typeCorrect = false;
      // }, 3000);// use
      this.$alert('预览Excel出现未知错误，请检查文件重新上传', '错误提示', {
        confirmButtonText: '确定',
        center: true,
        customClass: 'selfErrSure',
        callback: () => {
          this.typeCorrect = true;
          this.disabledV = false;
          this.previewSuccess = 0;
          this.dialogVisible = false;
          this.uploadTableDialogVisible = false;
          this.$refs.uploadFileRef.clearFiles();
          // window.location.reload();
        },
      });
    },
    // upload success
    uploadSuccessFun(res) {
      const that = this;
      const { data, status, message } = res;
      if (parseInt(status, 10) === 1 && res.data && res.data.length > 0) {
        setTimeout(() => {
          that.fileName = '';
          that.uploadData = res.data;
          that.previewSuccess = 0;
          that.typeCorrect = true;
          that.disabledV = false;
        }, 1000);
        that.previewList = res.data || [];
        that.sendPat();
        if (that.nowPage === '/work-order-manage/add' || that.nowPage === '/device-maintain/batch-edit-mng') that.SET_WORK_ORDER_UPLOAD_DATA_LIST(that.previewList);
        return;
      } if (parseInt(status, 10) === 1 && res.data && res.data.length <= 0) {
        this.$message({
          type: 'error',
          message: '上传文件为空，请重新上传',
          duration: 3000,
        });
      } else if (data) {
        that.uploadErrList = data;
        that.uploadTableDialogVisible = true;
        return;
      } else if (parseInt(status, 10) !== 1 && parseInt(status, 10) !== 0) {
        this.$message({
          type: 'error',
          message: '系统异常，请检查文件重新上传',
          duration: 5000,
        });
      } else {
        this.$message({
          type: 'error',
          message,
          duration: 5000,
        });
      }
      this.typeCorrect = true;
      this.disabledV = false;
      this.previewSuccess = 0;
      this.dialogVisible = false;
      this.uploadTableDialogVisible = false;
      this.$refs.uploadFileRef.clearFiles();
      // setTimeout(() => window.location.reload(), 6000);
    },
    sendPat() {
      this.$emit('receiveData', { previewList: this.previewList, importIsShow: false });
    },
    receiveErrData(data) {
      this.typeCorrect = true;
      this.disabledV = false;
      this.previewSuccess = 0;
      this.dialogVisible = false;
      this.uploadTableDialogVisible = false;
      this.$refs.uploadFileRef.clearFiles();
      this.$emit('receiveData', { importIsShow: data.importIsShow });
    },
    clickUploadBtn() {
      // setTimeout(() => this.$parent.$children[9].queryProject(), 1000);
    },
  },
  beforeDestroy() {
    this.typeCorrect = true;
    this.disabledV = false;
    this.previewSuccess = 0;
    this.dialogVisible = false;
    this.uploadTableDialogVisible = false;
    this.$refs.uploadFileRef.clearFiles();
  },
};
</script>

<style lang="scss">
  @import "~scss_vars";
  /* upload file*/
  .selfErrSure{
    .el-button{
      width: 100px;
      border-radius: 3px;
      font-size: 16px;
      background-color: $color-primary;
      border-color: $color-primary;
    }
  }
  .upload-file-div{
    $colorfff: #fff;
    background-color: $colorfff;
    width: 40%;
    height: 136px;
    margin: auto;
    margin-top: 8%;
    /*width: 40%;*/
    /*height: 260px;*/
    /*margin: auto;*/
    /*margin-top: 10%;*/
    /*<!--position: absolute;-->*/
    /*<!--left: 50%;-->*/
    /*<!--top: 50%;-->*/
    /*<!--transform: translate(-50%, -50%);-->*/
    .el-upload-list{
      /*width: 0;*/
    }
    /* upload k*/
    .el-upload-self{
      background-color: $colorfff;
      width: 100%;
      .el-upload{
        position: relative;
        padding-left: 10px;
        padding-right: 10px;
        box-sizing: border-box;
        width: 100%;
        height: 180px;
        display: flex;
        justify-content: center;
        align-items: center;
        .errText{
          font-size: 18px;
          text-align: center;
          color: #E70000;
        }
        .resErr{
          /*line-height: 180px;*/
        }
        .el-upload-dragger{
          position: absolute;
          top: 38%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
          height: 38px;
          border: 0;
          .el-upload__text{
            font-size: 18px;
            /*line-height: 180px;*/
            color: #333333;
            .el-button--text {
              font-size: 18px;
              color: #00A3EE;
            }
          }
        }
      }
    }
  }
</style>
