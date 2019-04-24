<template>
  <section class="air-table-page">
    <el-table
      v-loading="airTableLoading"
      :data="riverWayTableData"
      :header-cell-style="headerRowStyle"
      style="width: 100%">
      <el-table-column
        :show-overflow-tooltip="true"
        class="monitorPoint"
        align="center"
        prop="monitorPoint"
        label="监测点">
      </el-table-column>
      <el-table-column
        align="center"
        width="90"
        prop="aqi"
        label="氯">
        <template slot-scope="scope">
          <span>{{scope.row.lu}}mg/L</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        width="70"
        label="氨氮">
        <template slot-scope="scope">
          <span>{{scope.row.anDan}}mg/L</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="opacity"
        width="90"
        label="浑浊度">
        <template slot-scope="scope">
          <span>{{scope.row.opacity}}NTU</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="temperature"
        width="50"
        label="温度">
        <template slot-scope="scope">
          <span>{{scope.row.temperature}}°C</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="CO2"
        width="90"
        label="质量等级">
        <template slot-scope="scope">
          <span v-if="scope.row.opacity <= 0.02" class="better">清澈</span>
          <span v-else-if="scope.row.opacity <= 0.03 && scope.row.opacity >= 0.021" class="good">优质</span>
          <span v-else-if="scope.row.opacity <= 0.04 && scope.row.opacity >= 0.031" class="mildBad">轻度污染</span>
          <span v-else-if="scope.row.opacity <= 0.045 && scope.row.opacity >= 0.041" class="bad">重度污染</span>
        </template>
      </el-table-column>
    </el-table>
    <div v-if="txt === '数据已加载完毕'" class="loading-btn">{{txt}}</div>
    <div v-else @click="getRiverWayTableData" class="loading-btn">{{txt}}</div>
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
      riverWayTableData: [{
        monitorPoint: '西北门',
        aqi: 7,
        pm: 15,
        CO2: '',
        level: '优质',
      }],
    };
  },
  created() {
    this.getRiverWayTableData();
  },
  methods: {
    headerRowStyle() {
      return 'borderBottom: 1px solid #EEEFF3';
      // return 'background: #EEEFF3';
    },
    getRiverWayTableData(type) {
      if (type === 'change') this.pageNum = 0;
      this.airTableLoading = true;
      this.pageNum += 1;
      this.riverWayTableData = [];
      window.vaApi.getRiverWayTable().then(({ data: { data, status, total } }) => {
        if (parseInt(status, 10) === 1) {
          this.airTableLoading = false;
          this.total = total;
          this.totalPageNum = Math.ceil(this.total / this.pageSize);
          this.riverWayTableData = data.slice(0, this.pageSize * this.pageNum);
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
