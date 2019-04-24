<template>
  <section class="smokeList">
    <el-table
      :data="smokeList"
      ref="table"
      @row-click="expandFun"
      :row-style="rowStyle"
      :header-cell-style="headerRowStyle"
      :cell-style="cellStyle"
      v-loading="loading"
      style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <ul>
            <li v-for="(item, index) in props.row.dataList"
                :key='index'
                @click="videoShow(item.status)"
                :class="['liCons',item.status === '告警'?'alarm':'']">
              <span>{{ item.id }}</span>
              <span>{{ item.status }}</span>
              <span class="timeClass">{{ item.reportTime }}</span>
              <span>{{ item.info }}</span>
            </li>
          </ul>
          <!--<el-form-->
            <!--label-position="left"-->
            <!--inline-->
            <!--:class="['demo-table-expand',item.status === '告警'?'alarm':'']"-->
            <!--v-for="(item, index) in props.row.dataList"-->
            <!--:key="index">-->
            <!--<el-form-item>-->
              <!--<span>{{ item.id }}</span>-->
            <!--</el-form-item>-->
            <!--<el-form-item>-->
              <!--<span @click="videoShow(item.status)">{{ item.status }}</span>-->
            <!--</el-form-item>-->
            <!--<el-form-item>-->
              <!--<span>{{ item.reportTime }}</span>-->
            <!--</el-form-item>-->
            <!--<el-form-item>-->
              <!--<span>{{ item.info }}</span>-->
            <!--</el-form-item>-->
          <!--</el-form>-->
        </template>
      </el-table-column>
      <el-table-column
        label="监测点"
        align="center"
        width="100px"
        prop="name">
      </el-table-column>
      <el-table-column
        label="状态"
        align="center"
      >
      </el-table-column>
      <el-table-column
        label="上报时间"
        align="center"
      >
      </el-table-column>
      <el-table-column
        label="通知"
        align="center"
      >
      </el-table-column>
    </el-table>
    <p class="moreBtn" @click="getSmokeList">{{moreText}}</p>
  </section>

</template>

<script>
export default {
  data() {
    return {
      smokeList: [],
      moreText: '点击加载更多',
      loading: true,
      index: 0,
    };
  },
  created() {
    this.getSmokeList();
  },
  props: ['totalSmoke'],
  watch: {
    totalSmoke(val) {
      if (val) {
        this.getSmokeList();
      }
    },
  },
  methods: {
    getSmokeList() {
      this.loading = true;
      window.vaApi.getSmokeList().then((res) => {
        const { status, data } = res.data;
        if (parseInt(status, 10) === 1) {
          this.loading = false;
          this.totalSmoke = this.$parent.total;
          const smokeData = data.splice(0, this.totalSmoke);
          this.index += 1;
          this.smokeList = smokeData.slice(0, 6 * this.index);
          if (this.smokeList.length >= smokeData.length) {
            this.moreText = '数据已加载完毕';
          } else {
            this.moreText = '点击加载更多';
          }
        }
      });
    },
    videoShow(v) {
      if (v === '告警') {
        this.$store.commit('SET_SMOKE_VIDEO_SHOW', true);
      }
    },
    expandFun(row) {
      this.$refs.table.toggleRowExpansion(row);
    },
    rowStyle(row) {
      if (row) {
        return 'cursor:pointer';
      }
      return false;
    },
    cellStyle(row) {
      if (row) {
        return 'color:#4DA8F3; border:none';
      }
      return false;
    },
    headerRowStyle() {
      return 'text-align:left';
    },
  },
};
</script>
<style lang="scss">
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 25%;
    text-align: center;
  }
  .smokeList{
    .el-table--scrollable-x .el-table__body-wrapper{
      overflow-x: hidden;
    }
    .el-table::before{
      background: none;
    }
    .moreBtn{
      text-align: center;
      color: #9B9CA1;
      cursor: pointer;
      background: #fff;
    }
    .liCons{
      display: flex;
      justify-content: space-between;
      line-height: 40px;
      .timeClass{
        overflow: hidden;
        text-overflow: ellipsis;
        width: 100px;
        white-space: nowrap;
      }
    }
    .alarm{
      span{
        color:#F35C4D;
        cursor: pointer;
      }
    }
    .normal{
      color:#4DA8F3;
    }
    .el-table .cell{
      padding-left: 0;
      text-align: left;
    }
    .el-table__expanded-cell[class*=cell] {
      padding: 0 30px 0 50px;
    }
    .el-table__expand-icon>.el-icon{
      display:none;
    }
    .el-table .cell {
      height:25px;
      overflow: hidden;
    }
    .el-form--inline .el-form-item__content span{
      height: 28px;
      overflow: hidden;
      display: inline-block;
    }
  }
</style>
