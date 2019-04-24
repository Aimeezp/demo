<template>
    <div id="preview-table-page">
      <el-table class="tableList"
                :data="previewList" v-loading="tableLoading" stripe highlight-current-row>
        <el-table-column type="index" align="center" label="序号">
        </el-table-column>
        <el-table-column min-width="140" align="center" label="项目名称" prop="projectName">
        </el-table-column>
        <el-table-column min-width="120" align="center" label="设备类型" prop="deviceType">
        </el-table-column>
        <el-table-column align="center" label="设备厂商" prop="maker">
        </el-table-column>
        <el-table-column align="center" label="设备型号" prop="productModel">
        </el-table-column>
        <el-table-column min-width="180" align="center" label="IMEI" prop="serialNumber">
        </el-table-column>
        <el-table-column min-width="180" align="center" label="厂商设备号" prop="deviceNum">
        </el-table-column>
        <el-table-column min-width="140" align="center" label="MSISDN" prop="msisdn">
        </el-table-column>
        <el-table-column min-width="140" align="center" label="IMSI" prop="imsi">
        </el-table-column>
        <el-table-column min-width="140" align="center" label="经度" prop="lng">
        </el-table-column>
        <el-table-column min-width="140" align="center" label="纬度" prop="lat">
        </el-table-column>
        <el-table-column min-width="240" label="安装地址" prop="addr">
        </el-table-column>
        <!--v-if="nowPage != '/work-order-manage/add'"-->
        <el-table-column min-width="100" align="center" label="备注" prop="remak">
        </el-table-column>
        <!--<el-table-column v-else min-width="140" align="center" label="操作">-->
          <!--<template slot-scope="scope">-->
            <!--<span class="infoBtn cursor">编辑</span>-->
            <!--<span @click="delWorkOrderFun" class="infoBtn cursor">删除</span>-->
          <!--</template>-->
        <!--</el-table-column>-->
      </el-table>
      <div v-show="nowPage !== '/work-order-manage/add' && nowPage !== '/device-maintain/batch-edit-mng'"  class="upload-btn-div">
        <el-button id="preview-table-btn-cancel" @click="$parent.cancelUploadFun();">取 消</el-button>
        <el-button  id="preview-table-btn-upload" type="primary" @click="clickUploadBtn">上传</el-button>
      </div>
      <!--err tip-->
      <uploadErrDialog title="批量导入设备错误" :uploadErrList="uploadErrList"
                       :uploadTableDialogVisible="uploadTableDialogVisible"></uploadErrDialog>
    </div>
</template>

<script>
import uploadErrDialog from './uploadErrDialog';

export default {
  name: 'preview-table',
  data() {
    return {
      uploadTableDialogVisible: false,
      uploadErrList: [{ }],
      nowPage: this.$route.path,
    };
  },
  props: {
    tableLoading: {
      type: Boolean,
      default: false,
    },
    previewList: {
      type: Array,
      default: function defaultFun() {
        return [];
      },
    },
  },
  components: {
    uploadErrDialog,
  },
  watch: {
    previewList: {
      handler: function watchFun() {
      },
      deep: true,
    },
  },
  methods: {
    clickUploadBtn() {
      const that = this;
      window.vaApi.uploadFile(that.previewList).then((res) => {
        const { status, data, message } = res.data;
        // const { message } = res;
        if (parseInt(status, 10) === 1) {
          that.$message({
            type: 'success',
            message: '上传成功!',
            duration: 2000,
          });
          if (that.nowPage !== '/work-order-manage/add') setTimeout(() => that.$router.push({ path: '/device-maintain' }), 2000);
          return;
        } if (data) {
          this.uploadErrList = data;
          this.uploadTableDialogVisible = true;
          return;
        } if (parseInt(status, 10) !== 1 && parseInt(status, 10) !== 0) {
          this.$message({
            type: 'error',
            message: '系统异常，请检查文件重新上传',
            duration: 5000,
          });
        } else {
          this.$message({
            type: 'error',
            message,
          });
        }
        this.$emit('receivePreviewData', { importIsShow: true });
        // setTimeout(() => window.location.reload(), 6000);
      });
    },
    delWorkOrderFun() {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!',
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除',
        });
      });
    },
  },
};
</script>

<style scoped lang="scss">
@import "~scss_vars";

#preview-table-page{
  .infoBtn{
    color:$color-primary;
    padding-right: 10px;
  }
}
</style>
