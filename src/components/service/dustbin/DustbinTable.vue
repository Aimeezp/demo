<template>
  <section class="dustbin-table-page">
  <el-table :data="tableData" :header-cell-style="headerRowStyle" stripe class="tableList sendRecordList" v-loading="tableLoading">
    <el-table-column :show-overflow-tooltip="true" prop="monitoringPoint" align="center" label="监测点" width="90"></el-table-column>
    <el-table-column prop="number" align="center" label="数量" width="90"></el-table-column>
    <el-table-column prop="capacity" align="center" label="容量" v-model="tableData.capacity">
      <template slot-scope="{row}">
        <el-progress :text-inside="true" :stroke-width="14" :percentage="row.capacity" :color="row.capacity>='75' ? 'red' : (row.capacity >='50' ? '#f38715' : (row.capacity >='25' ? '#FFE639' :'00BF4D'))" ></el-progress>
      </template>
    </el-table-column>
    <el-table-column label="清扫" align="center">
      <template slot-scope="{row}">
        <div class="tableBtnGroup">
          <span class="tableBtn" @click="$refs.mailingLogRef.open(row.monitoringPoint)">通知</span>
        </div>
      </template>
    </el-table-column>
  </el-table>
    <div v-if="txt === '数据已加载完毕'" class="loading-btn">{{txt}}</div>
    <div v-else @click="getDustbinTableData" class="loading-btn">{{txt}}</div>
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
        this.getDustbinTableData();
      }
    },
  },
  mounted() {
    this.getDustbinTableData();
  },
  methods: {
    getDustbinTableData() {
      this.tableLoading = true;
      this.pageNum += 1;
      window.vaApi.getDustbinList().then(({ data: { status, data } }) => {
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
  .dustbin-table-page{
    table{
      font-size: 12px;
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
