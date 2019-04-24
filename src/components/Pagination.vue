<template>
  <el-col :span="24" class="toolbar">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="paginationFun"
      :currentPage.sync="currentPage"
      :page-sizes="[10, 20, 30]"
      :page-size="pageSize"
      :layout="layoutStr"
      :total="total"
      :flag="flag"
      ref="pagination">
      <el-button class="paginationBtn">确定</el-button>
    </el-pagination>
  </el-col>


</template>

<script>
export default {
  name: 'pagination',
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      layoutStr: 'total, sizes, prev, pager, next, jumper',
    };
  },
  props: ['total', 'paginationFun', 'flag'],
  mounted() {
    this.showLayout();
  },
  methods: {
    showLayout() {
      if (this.flag) {
        this.layoutStr = 'total, sizes, prev, pager, next, jumper';
      } else {
        this.layoutStr = 'total, prev, pager, next, jumper';
        // this.pageSize = 6;
      }
    },
    jumpToFirst() {
      if (this.currentPage > 1) this.$refs.pagination.handleCurrentChange(1);
    },
    handleSizeChange(val) {
      this.pageSize = val;
      if (this.$parent.pageSizeFun) this.$parent.pageSizeFun();
      this.$emit('size-change', val);
    },
  },
};
</script>

<style lang="scss">
  @import '~scss_vars';

  $color333: #333333;
  .toolbar {
    margin-top: 15px;
    height: 52px;
    color: $color333;
    /*position:fixed;*/
    /*z-index: 98;*/
    /*bottom:0;*/
    /*right:20px;*/
    .el-pagination {
      // float: right;
      // width:100%;
      text-align: right;
      button{
        min-width:30px;
      }
      .el-pagination__total,.el-pagination__sizes{float:left;}
      .el-pagination__editor.el-input{
        width:30px;
      }
      .el-pager li{
        min-width:30px;
      }
    }
    .btn-prev, .btn-next {
      border: 1px solid #434881;
      border-radius: 4px;
      padding-right: 0;
      padding-left: 0;
    }
    .el-pagination__total, .el-pagination__jump {
      color: $color333;
      margin-left: 0;
    }
    .btn-next {
      margin-right: 10px;
    }
    .el-pager li.active {
      color: $color-primary;
      cursor: default;
    }
    .el-pager li:hover {
      color: $color-primary;
    }
    .paginationBtn {
      margin-left: 10px;
      border: 1px solid #3c3434;
      border-radius: 4px;
    }
  }
</style>
