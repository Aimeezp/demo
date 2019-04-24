<template>
 <div>
   <el-table :data="tableData"  border stripe v-loading="tableLoading" :default-sort = "{prop: 'reportTime', order: 'descending'}">
     <el-table-column prop="serialNumber" label="IMEI" align="center" width="180px"></el-table-column>
     <el-table-column prop="reportTime" align="center" width="200px" label="消息上报时间" sortable></el-table-column>
     <el-table-column prop="ext2" align="center" width="200px" label="心跳间隔"></el-table-column>
     <el-table-column prop="maker" align="center" label="品牌"></el-table-column>
     <el-table-column prop="productModel" align="center" label="型号"></el-table-column>
     <el-table-column prop="imsi" align="center" label="IMSI"></el-table-column>
     <!--<el-table-column prop="installDate" align="center" width="200px" label="安装日期"></el-table-column>-->
     <!--<el-table-column prop="resourcePath" align="center" width="200px" label="资源url"></el-table-column>-->
     <el-table-column prop="snr" align="center" label="SNR"></el-table-column>
     <el-table-column prop="rsrp" align="center" label="RSRP"></el-table-column>
     <el-table-column prop="voltage" align="center" label="电压"></el-table-column>
     <el-table-column prop="electricity" align="center" label="电量"></el-table-column>
     <el-table-column prop="ext1" align="center" label="消息类型"></el-table-column>
     <el-table-column prop=" ext3" align="center" show-overflow-tooltip width="200px" label="数据值"></el-table-column>
   </el-table>
   <pagination :flag="true" ref="turnPage1" :total="deviceTotal" :paginationFun="getLogList" :pageSizeFun="pageSizeFun"></pagination>
 </div>
</template>

<script>
import moment from 'moment';
import pagination from '@/components/Pagination';

export default {
  data() {
    return {
      tableData: [],
      tableLoading: false,
      deviceTotal: 0,
      imei: '',
      type: '',
    };
  },
  components: {
    pagination,
  },
  props: ['logData'],
  mounted() {
    this.tableData = this.logData;
    // this.deviceTotal = this.logData.length;
  },
  methods: {
    pageSizeFun() {
      this.getLogList();
    },
    getLogList(currentPage) {
      const param = {};
      param.serialNumber = this.$parent.deviceIMEI;// 863703039059480
      param.deviceType = this.$parent.deviceType;// well cover
      param.currentPage = currentPage || 1;
      param.pageSize = this.$refs.turnPage1.pageSize;
      param.startTime = this.$parent.startTime ? moment(this.$parent.startTime).format('YYYY-MM-DD') : '';
      param.endTime = this.$parent.endTime ? moment(this.$parent.endTime).format('YYYY-MM-DD') : '';
      this.tableLoading = true;
      window.vaApi.getLogList(param).then((res) => {
        const { status, data } = res.data;
        if (parseInt(status, 10) === 1) {
          this.tableData = data.list;
          this.tableLoading = false;
          this.deviceTotal = data.total;
          this.$store.commit('SET_DEVICE_LOG_DATA', this.tableData);
        }
      });
    },
  },
};
</script>

<style scoped>

</style>
