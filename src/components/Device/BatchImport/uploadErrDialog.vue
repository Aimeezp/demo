<template>
  <!--err tip-->
  <el-dialog
    style="min-width: 670px;"
    center
    id="upload-table-err-dialog"
    :show-close="false"
    :title="title"
    :visible.sync="uploadTableDialogVisible"
    width="40%">
    <div class="errList">
      <div class="list-info" v-for="(item, index) in Object.keys(uploadErrList[0])" :key="index">
        <span style="text-align: left;">【报错行数{{item}}】：</span>
        <span v-for="(item2, index) in uploadErrList[0][item]" :key="index">
          {{item2}}
          <span v-if="index < uploadErrList[0][item].length-1">&nbsp;|&nbsp;</span>
        </span>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
    <el-button id="upload-err-dialog-btn-sure" class="sureBtn" type="primary" @click="clickUploadErrDialogBtn">确 定</el-button>
  </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'upload-err-dialog',
  data() {
    return {
    };
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    uploadErrList: {
      type: Array,
      required: true,
      default() {
        return [{}];
      },
    },
    uploadTableDialogVisible: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    clickUploadErrDialogBtn() {
      this.$parent.uploadTableDialogVisible = false;
      this.$emit('sendFromErr', { importIsShow: true });
      // window.location.reload();
    },
  },
};
</script>

<style lang="scss">
  #upload-table-err-dialog{
    overflow: hidden;
    min-width: 900px;
    .el-dialog__body{
      overflow: hidden;
    }
    .errList{
      min-height: 100px;
      min-width: 69px;
      max-height: 300px;
      overflow: auto;
      width: 64%;
      margin: auto;
      .border-btm{
        border-bottom: 1px solid #ccc;
      }
      .list-info{
        white-space: nowrap;
        font-size: 15px;
        text-align: left;
        margin-bottom: 10px;
      }
    }
    .dialog-footer{
      .sureBtn{
        width: 140px;
        font-size: 16px;
      }
    }
  }
</style>
