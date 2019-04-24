<template>
    <section class="carinterList">
      <el-table
        :data="carData"
        :header-cell-style="headerRowStyle"
        v-loading="loading"
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
          label="进场时间">
        </el-table-column>
        <el-table-column
          prop="totalMoney"
          label="计费">
        </el-table-column>
      </el-table>
      <p class="moreBtn" @click="getCarInterList">{{moreText}}</p>
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
    this.getCarInterList();
  },
  props: ['totalCarInter'],
  watch: {
    totalCarInter(val) {
      if (val) {
        this.getCarInterList();
      }
    },
  },
  methods: {
    getCarInterList() {
      this.loading = true;
      window.vaApi.getCarInterList().then((res) => {
        const { status, data } = res.data;
        if (parseInt(status, 10) === 1) {
          this.loading = false;
          this.index += 1;
          this.totalCarInter = this.$parent.total;
          const carInterData = data.splice(0, this.totalCarInter);
          this.carData = carInterData.slice(0, 6 * this.index);
          if (this.carData.length >= carInterData.length) {
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
  .carinterList{
    .el-table td, .el-table th.is-leaf{
      border: 0;
    }
    .moreBtn{
      text-align: center;
      color: #9B9CA1;
      cursor: pointer;
      background: #fff;
    }
  }
</style>
