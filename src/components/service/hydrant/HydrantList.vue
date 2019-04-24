<template>
  <section class="trap-table-page">
  <el-table :data="tableData" :header-cell-style="headerRowStyle" stripe class="tableList sendRecordList" v-loading="tableLoading">
    <el-table-column prop="monitoringPoint" align="center" label="监测点" width="90">
    </el-table-column>
    <el-table-column prop="waterLevel" align="center" label="水压" width="90">
      <template slot-scope="scope">
        <span>
          {{scope.row.waterLevel}}MPa
        </span>
      </template>
    </el-table-column>
    <el-table-column prop="state" align="center" label="状态" width="90">
      <template slot-scope="scope">
        <span :class="scope.row.state==='设备正常' ? 'good' : (scope.row.state === '水压过高' || scope.row.state === '水压过低' || scope.row.state === '电压过高' || scope.row.state === '电压过低') ? 'mid' : scope.row.state === '设备倾倒' ? 'bad':''">
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
  <div v-if="this.totalAll>6">
    <div v-if="txt==='点击加载更多数据'" @click="getList" class="loading-btn">{{txt}}</div>
    <div v-else class="loading-btn">{{txt}}</div>
  </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      tableLoading: false,
      txt: '点击加载更多数据',
      tableData: [],
      pageSize: 6,
      pageNum: 0,
    };
  },
  props: ['totalAll'],
  watch: {
    totalAll(val) {
      if (val) {
        this.getList();
      }
    },
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      if (this.totalAll) {
        this.tableLoading = true;
        this.pageNum += 1;
        window.vaApi.getHydrantList().then(({ data: { status, data } }) => {
          this.tableLoading = false;
          if (parseInt(status, 10) === 1) {
            if (this.totalAll > this.pageSize) {
              this.tableData = data.slice(0, this.pageSize * this.pageNum);
              if (this.tableData.length >= data.length) {
                this.txt = '数据已加载完毕';
              }
            } else {
              this.tableData = data.slice(0, this.totalAll);
            }
          }
        });
      }
    },
    headerRowStyle() {
      return 'background: #EEEFF3';
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
      color: #f90234;
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
