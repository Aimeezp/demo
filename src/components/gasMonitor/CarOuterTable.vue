<template>
    <section class="caroutList">
      <el-table
        :data="carData"
        :header-cell-style="headerRowStyle"
        style="width: 100%">
        <el-table-column
          prop="carNum"
          label="车牌号">
        </el-table-column>
        <el-table-column
          prop="type"
          label="类型">
        </el-table-column>
        <el-table-column
          prop="inTime"
          label="离场时间">
        </el-table-column>
        <el-table-column
          prop="totalMoney"
          label="计费">
        </el-table-column>
      </el-table>
      <p class="moreBtn" @click="getCarOuterList">{{moreText}}</p>
    </section>
</template>

<script>
export default {
  name: 'car-table',
  data() {
    return {
      loading: false,
      moreText: '点击加载更多',
      carData: [],
      index: 0,
    };
  },
  mounted() {
    this.getCarOuterList();
  },
  props: ['totalCarOuter'],
  watch: {
    totalCarOuter(val) {
      if (val) {
        this.getCarOuterList();
      }
    },
  },
  methods: {
    getCarOuterList() {
      this.loading = true;
      window.vaApi.getCarOuterList().then((res) => {
        const { status, data } = res.data;
        if (parseInt(status, 10) === 1) {
          this.loading = false;
          this.index += 1;
          this.totalCarOuter = this.$parent.total;
          const carOuterData = data.splice(0, this.totalCarOuter);
          this.carData = carOuterData.slice(0, 6 * this.index);
          if (this.carData.length >= carOuterData.length) {
            this.moreText = '数据已加载完毕';
          } else {
            this.moreText = '点击加载更多';
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
  .caroutList{
    .moreBtn{
      text-align: center;
      color: #9B9CA1;
      cursor: pointer;
      background: #fff;
    }
    .el-table td, .el-table th.is-leaf{
      border: 0;
    }
  }
</style>
