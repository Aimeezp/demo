<template>
  <section class="trap-table-page">
  <el-table :data="tableData" :header-cell-style="headerRowStyle" stripe class="tableList sendRecordList" v-loading="tableLoading">
    <el-table-column :show-overflow-tooltip="true" prop="monitoringPoint" align="center" label="监测点" width="90"></el-table-column>
    <el-table-column prop="waterLevel" align="center" label="水位" width="90">
      <template slot-scope="scope">
        <span>{{scope.row.waterLevel}}m</span>
      </template>
    </el-table-column>
    <el-table-column prop="state" align="center" label="状态" width="90">
      <template slot-scope="scope">
        <span :class="scope.row.state==='设备正常' ? 'good' : (scope.row.state === '水位过高' ? 'mid' : (scope.row.state === '电压过低' ? 'mid':(scope.row.state === '设备打开' ? 'bad':'')))">
          {{scope.row.state}}
        </span>
      </template>
    </el-table-column>
    <el-table-column label="处理" align="center">
      <template slot-scope="{row}">
        <div class="tableBtnGroup">
          <span class="tableBtn" @click="$refs.mailingLogRef.open(row.monitoringPoint)">通知</span>
        </div>
      </template>
    </el-table-column>
  </el-table>
    <div v-if="txt === '数据已加载完毕'" class="loading-btn">{{txt}}</div>
    <div v-else @click="getTrapdoorTableData" class="loading-btn">{{txt}}</div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      tableLoading: false,
      txt: '点击加载更多数据',
      pageSize: 5,
      pageNum: 0,
      tableData: [],
    };
  },
  props: ['totalNum'],
  watch: {
    totalNum(val) {
      if (val) {
        this.getTrapdoorTableData();
      }
    },
  },
  mounted() {
    this.getTrapdoorTableData();
  },
  methods: {
    getTrapdoorTableData() {
      this.tableLoading = true;
      this.pageNum += 1;
      // console.log(this.totalNum);
      window.vaApi.getTrapList().then(({ data: { status, data } }) => {
        if (parseInt(status, 10) === 1) {
          this.tableLoading = false;
          if (this.totalNum >= this.pageSize) {
            this.tableData = data.slice(0, this.pageSize * this.pageNum);
          } else {
            this.tableData = data.slice(0, this.totalNum * this.pageNum);
          }
          if (this.tableData.length >= data.length) {
            this.txt = '数据已加载完毕';
          }
        }
      });
    },
    headerRowStyle() {
      return 'borderBottom: 1px solid #EEEFF3';
    },
  },
};
</script>

<style lang="scss">
  .trap-table-page{
    table{
      font-size: 12px;
    }
    .good{
      color: #00BF4D;
    }
    .mid{
      color: #F38715;
    }
    .bad{
      color: red;
    }
    .el-table td, .el-table th.is-leaf{
      border: 0;
    }
    .loading-btn{
      text-align: center;
      color: #9B9CA1;
      cursor: pointer;
    }
  }
</style>
