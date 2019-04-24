<template>
    <section class="air-table-page">
      <el-table
        v-loading="airTableLoading"
        :data="airTableData"
        :header-cell-style="headerRowStyle"
        style="width: 100%">
        <el-table-column
          :show-overflow-tooltip="true"
          align="center"
          prop="monitorPoint"
          label="监测点">
        </el-table-column>
        <el-table-column
          align="center"
          width="60"
          prop="aqi"
          label="AQI">
        </el-table-column>
        <el-table-column
          align="center"
          label="PM2.5">
          <template slot-scope="scope">
            <span>{{scope.row.pm}}μg/m³</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="CO2"
          label="CO2">
          <template slot-scope="scope">
            <span>{{scope.row.CO2}}μg/m³</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="level"
          label="质量等级">
          <template slot-scope="scope">
            <span v-if="scope.row.pm <= 10" class="better">适合外出</span>
            <span v-if="scope.row.pm <= 15 && scope.row.pm > 10" class="good">适当防护</span>
            <span v-if="scope.row.pm <= 20 && scope.row.pm > 15" class="mildBad">轻度污染</span>
            <span v-if="scope.row.pm <= 25 && scope.row.pm > 20" class="bad">重度污染</span>
          </template>
        </el-table-column>
      </el-table>
      <div v-if="txt === '数据已加载完毕'" class="loading-btn">{{txt}}</div>
      <div v-else @click="getAirTableData" class="loading-btn">{{txt}}</div>
    </section>
</template>

<script>
export default {
  name: 'air-table',
  data() {
    return {
      airTableLoading: false,
      txt: '点击加载更多数据',
      pageSize: 5,
      pageNum: 0,
      total: 0,
      totalPageNum: 0,
      airTableData: [{
        monitorPoint: '西北门',
        aqi: 7,
        pm: 15,
        CO2: '',
        level: '优质',
      }],
    };
  },
  created() {
    this.getAirTableData();
  },
  methods: {
    headerRowStyle() {
      return 'borderBottom: 1px solid #EEEFF3';
      // 'background: #EEEFF3';
    },
    getAirTableData(type) {
      if (type === 'change') this.pageNum = 0;
      this.airTableLoading = true;
      this.pageNum += 1;
      window.vaApi.getAirList().then(({ data: { data, status, total } }) => {
        if (parseInt(status, 10) === 1) {
          this.airTableLoading = false;
          this.total = total;
          this.totalPageNum = Math.ceil(this.total / this.pageSize);
          this.airTableData = data.slice(0, this.pageSize * this.pageNum);
          if (this.pageNum >= this.totalPageNum) {
            this.txt = '数据已加载完毕';
          } else {
            this.txt = '点击加载更多数据';
          }
        }
      });
    },
  },
};
</script>

<style lang="scss">
.air-table-page{
  table{
    font-size: 12px;
  }
  .better{
    color: #4DA8F3;
  }
  .good{
    color: #00BF4D;
  }
  .mildBad{
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
