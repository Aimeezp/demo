<template>
  <section class="noise-table-page">
    <el-table :data="tableData" :header-cell-style="headerRowStyle" stripe class="tableList sendRecordList" v-loading="tableLoading">
      <el-table-column :show-overflow-tooltip="true" prop="monitoringPoint" align="center" label="监测点" width="90"></el-table-column>
      <el-table-column prop="monitoringTime" align="center" label="监测时间" width="90"></el-table-column>
      <el-table-column prop="monitoringData" align="center" label="监测数值" width="90">
        <template slot-scope="scope">
          <span>{{scope.row.monitoringData}}dB</span>
        </template>
      </el-table-column>
      <el-table-column prop="qualityLevel" align="center" label="质量等级" width="90">
        <template slot-scope="scope">
        <span :class="scope.row.qualityLevel==='舒适' ? 'good' : (scope.row.qualityLevel === '安静' ? 'midPre' : (scope.row.qualityLevel === '吵闹' ? 'mid' :'bad'))">
          {{scope.row.qualityLevel}}
        </span>
        </template>
      </el-table-column>
    </el-table>
    <div v-if="txt === '数据已加载完毕'" class="loading-btn">{{txt}}</div>
    <div v-else @click="getNoiseTableData" class="loading-btn">{{txt}}</div>
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
        this.getNoiseTableData();
      }
    },
  },
  mounted() {
    this.getNoiseTableData();
  },
  methods: {
    getNoiseTableData() {
      this.tableLoading = true;
      this.pageNum += 1;
      window.vaApi.getNoiseList().then(({ data: { status, data } }) => {
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
  .noise-table-page{
    table{
      font-size: 12px;
    }
    .good{
      color: #00BF4D;
    }
    .midPre{
      color: #FFE639;
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
