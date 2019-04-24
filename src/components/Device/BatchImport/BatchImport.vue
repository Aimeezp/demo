<template>
  <div id="batch-import-page">
    <!--breadcrumb-->
    <a id="deviceMaintainDownA" style="display: none;"></a>
    <el-breadcrumb v-show="nowPage !== '/work-order-manage/add' && nowPage !== '/device-maintain/batch-edit-mng'" id="bread-self-class" separator-class="el-icon-arrow-left">
      <el-breadcrumb-item id="batch-import-click-return" :to="{ path: '/device-maintain' }">设备维护</el-breadcrumb-item>
      <el-breadcrumb-item>批量编辑</el-breadcrumb-item>
    </el-breadcrumb>
    <!--step-->
    <div class="step-div" style="position: relative;">
      <div class="step-k">
        <div v-for="(item, index) in stepTextList" :key="index">
          <div class="circle">{{item.num}}</div>
          <span class="text">{{item.text}}</span>
          <el-button id="batch-import-btn-downLoad" @click="downLoadTemplate" v-if="item.hasBtn" plain class="btn">{{item.btnText}}</el-button>
        </div>
      </div>
      <div style="min-width: 100px;position: absolute;top: 0;right: 5%;margin-top: 14px">
        <el-button v-if="importIsShow" disabled style="width: 100%;" type="default" id="preview-table-btn-cancel">取消当前文件，重新上传</el-button>
        <el-button v-else style="width: 100%;" @click="reUploaddFun" type="default" id="preview-table-btn-cancel">取消当前文件，重新上传</el-button>
      </div>
    </div>
    <!--upload file-->
    <importOptionPage ref="importOptionPageRef" v-if="importIsShow" @receiveData="receivePreviewList"></importOptionPage>
    <!--preview file-->
    <previewTablePage v-else @receivePreviewData="receivePreviewTable" :previewList="previewList"></previewTablePage>
  </div>
</template>

<script>
import importOptionPage from './ImportOption';
import previewTablePage from './PreviewTable';

export default {
  name: 'batch-import',
  data() {
    return {
      // step config
      stepTextList: [
        {
          num: 1,
          text: '下载批量导入摸板',
          hasBtn: true,
          btnText: 'Excel模版',
        },
        {
          num: 2,
          text: '按文档要求填充数据',
          hasBtn: false,
        },
        {
          num: 3,
          text: '上传批量导入文档',
          hasBtn: false,
        },
      ],
      previewList: [],
      importIsShow: true,
      nowPage: this.$route.path,
    };
  },
  components: {
    importOptionPage,
    previewTablePage,
  },
  props: ['isShow'],
  watch: {
    isShow() {
      if (this.isShow) this.importIsShow = this.isShow;
    },
  },
  created() {
    if (this.nowPage === '/device-maintain/batch-edit-mng') {
      this.stepTextList = [
        {
          num: 1,
          text: '下载批量编辑摸板',
          hasBtn: true,
          btnText: 'Excel模版',
        },
        {
          num: 2,
          text: '按文档要求填充数据',
          hasBtn: false,
        },
        {
          num: 3,
          text: '上传批量编辑文档',
          hasBtn: false,
        },
      ];
    }
    if (this.isShow) this.importIsShow = this.isShow;
  },
  methods: {
    reUploaddFun() {
      this.importIsShow = true;
    },
    downLoadTemplate() {
      const that = this;
      window.vaApi.downloadTemplate().then((res) => {
        if (Number(res.status) !== Number(200)) {
          this.$message({
            message: '网络异常,请稍后重试',
            type: 'error',
          });
          return;
        }
        // create blob object
        const blob = new Blob([res.data]);
        const link = document.querySelector('#deviceMaintainDownA');
        link.href = window.URL.createObjectURL(blob);
        // configure download file name
        link.download = 'excel.xlsx';
        link.click();
        that.$message({
          type: 'success',
          message: '下载模板成功!',
        });
      });
    },
    receivePreviewList(data) {
      this.previewList = data.previewList;
      this.importIsShow = data.importIsShow;
    },
    receivePreviewTable(data) {
      this.importIsShow = data.importIsShow;
    },
    cancelUploadFun() {
      this.$router.push('/device-maintain');
    },
  },
};
</script>

<style lang="scss">
  @import "~scss_vars";

  #batch-import-page {
    flex: 1;
    $text666: #666;
    $space10px: 10px;
    $colorfff: #fff;
    overflow: hidden;
    /*position: absolute;*/
    /*top: 80px;*/
    /*left: 160px;*/
    /*right: 20px;*/
    /*bottom: 0;*/
    .el-button{
      height: 36px;
      line-height: .5px;
    }
    /* bread*/
    #bread-self-class {
      .el-breadcrumb__inner a, .el-breadcrumb__inner.is-link {
        color: #3F3F3F;
        font-size: 16px;
        font-weight: normal;
        text-decoration: none;
        -webkit-transition: color .2s cubic-bezier(.645, .045, .355, 1);
        transition: color .2s cubic-bezier(.645, .045, .355, 1);
      }
      .el-breadcrumb__inner a, .el-breadcrumb__inner.is-link:hover{
        text-decoration: underline;
      }
      .el-breadcrumb__item:last-child .el-breadcrumb__inner,
      .el-breadcrumb__item:last-child .el-breadcrumb__inner a,
      .el-breadcrumb__item:last-child .el-breadcrumb__inner a:hover,
      .el-breadcrumb__item:last-child .el-breadcrumb__inner:hover {
        font-weight: 400;
        font-size: 16px;
        color: $text666;
        cursor: text;
      }
      .el-breadcrumb__separator {
        margin: 0 9px;
        font-weight: 700;
        color: #3F3F3F;
      }
    }
    /* step*/
    .step-div {
      width: 100%;
      height: 60px;
      background: $colorfff;
      margin-top: $space10px;
      margin-bottom: $space10px;
      padding-left: 20px;
      .step-k {
        width: 40%;
        min-width: 600px;
        height: inherit;
        display: flex;
        align-items: center;
        justify-content: space-between;
        > div {
          display: flex;
          align-items: center;
          > div.circle {
            width: 20px;
            height: 20px;
            text-align: center;
            line-height: 20px;
            margin-right: $space10px;
            border-radius: 20px;
            background: #DCE8F2;
            font-size: 16px;
            color: $color-primary;
          }
          .text {
            font-size: 12px;
            color: $text666;
          }
          .btn {
            margin-left: $space10px;
            border: 1px solid $color-primary;
            border-radius: 3px;
            font-size: 16px;
            color: #00A3EE;
          }
        }
      }
    }
    /* btn*/
    .upload-btn-div{
      width: 30%;
      min-width: 220px;
      margin: 30px auto 0 auto;
      .el-button.is-disabled,
      .el-button.is-disabled:focus,
      .el-button.is-disabled:hover {
        opacity: 0.5;
      }
      .el-button{
        border: 1px solid $color-primary;
        border-radius: 3px;
        font-size: 16px;
        width: 100px;
      }
      .el-button--default{
        color: $color-primary;
      }
      .el-button--primary{
        color: $colorfff;
      }
    }
  }
</style>
