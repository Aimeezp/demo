<template>
  <div id="testList">
    <navHeader/>
    <div class="maincontainer">
      <el-form :inline="true" :model="filterParam" class="demo-form-inline">
        <el-form-item>
          <el-select clearable id="work-order-mng-sel-state" v-model="filterParam.isDone" placeholder="工单状态" @change="getList(1)">
            <el-option
              v-for="(item, index) in workOrderState"
              :key="index"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select clearable id="work-order-sel-mng-type" v-model="filterParam.type" placeholder="工单类型" @change="getList(1)">
            <el-option
              v-for="(item, index) in workOrderType"
              :key="index"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-date-picker
            id="work-order-mng-sel-start-time"
            v-model="filterParam.createTime"
            type="date"
            :picker-options="pickerOptions1"
            placeholder="开始时间">
          </el-date-picker>&nbsp;~&nbsp;
          <el-date-picker
            id="work-order-mng-sel-end-time"
            v-model="filterParam.endTime"
            type="date"
            :picker-options="pickerOptions2"
            placeholder="结束时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-input id="work-order-mng-ipt-search" clearable class="searchInput"
                    v-model.trim="filterParam.keyWords" @keyup.enter.native="getList(1)" maxlength=20 placeholder="请输入内容">
            <template slot="append">
              <div id="work-order-mng-btn-search" @click="getList(1)" style="cursor:pointer;">检索</div>
            </template>
          </el-input>
        </el-form-item>
        <!-- <el-form-item style="float: right;"> <el-button id="work-order-mng-btn-add" type="primary" @click="newTest">新建工单</el-button></el-form-item> -->
      </el-form>
      <div class="tableList">
        <el-table
          height="520"
          :data="tableData"
          style="width: 100%"
          fit
          v-loading="tableLoading" >
          <el-table-column
            prop="projectId"
            label="序号"
            align="center"
            min-width="80px">
          </el-table-column>
          <el-table-column
            label="工单类型"
            align="center">
            <template slot-scope="scope">
              <p v-if="parseInt(scope.row.type, 10) === 1">业务</p>
              <p v-if="parseInt(scope.row.type, 10) === 2">维修</p>
              <p v-if="parseInt(scope.row.type, 10) === 3">安装</p>
              <p v-else-if="parseInt(scope.row.type, 10) === 4">测试</p>
            </template>
          </el-table-column>
          <el-table-column
            prop="isDone"
            label="工单状态"
            align="center">
            <template slot-scope="scope">
              <p v-if="parseInt(scope.row.isDone, 10) === 2" class="weiwancehng">未完成</p>
              <p v-else-if="parseInt(scope.row.isDone, 10) === 1">已完成</p>
            </template>
          </el-table-column>
          <el-table-column
            prop="projectName"
            min-width="160px"
            align="center"
            label="项目名称">
          </el-table-column>
          <el-table-column
            prop="managerName"
            align="center"
            min-width="100px"
            label="项目经理">
          </el-table-column>
          <el-table-column
            prop="address"
            align="center"
            min-width="260px"
            label="工单地址">
          </el-table-column>
          <el-table-column
            prop="deviceCount"
            align="center"
            min-width="80px"
            label="设备数量">
          </el-table-column>
          <el-table-column
            prop="createTime"
            align="center"
            min-width="180px"
            label="派单时间">
          </el-table-column>
          <el-table-column
            prop="updateTime"
            align="center"
            min-width="180px"
            label="完成时间">
          </el-table-column>
          <el-table-column
            prop="supporterName"
            align="center"
            width="120"
            label="施工人员">
          </el-table-column>
          <el-table-column
            prop="operation"
            label="操作"
            width="160"
            align="center">
            <template slot-scope="scope">
              <span id="work-order-mng-spn-info" @click="openDetail(scope.row)"
                    class="infoBtn cursor">查看</span>
              <span id="work-order-mng-spn-unfinish" :class="scope.row.isDone === 1  ? 'disabled' :'cursor' "
                    class="infoBtn " @click="finishFun(scope.row.id)">完成</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!--分页-->
      <pagination :flag="showSizes" ref="turnPage1" :total="total" :paginationFun="getList" :pageSizeFun="pageSizeFun"></pagination>
    </div>

    <!--工单详情-->
    <order-detail ref="orderDetail" :sendDetail="sendDetail" :tableColumnList="tableColumnList"></order-detail>
  </div>
</template>

<script>
import ElOption from 'element-ui/packages/select/src/option';
import dieDataImgSrc from '../assets/images/test.png';
import navHeader from '../components/NavHeader';
import pagination from '../components/Pagination';
import orderDetail from '../components/workOrder/DetailsList';
import bus from '../utils/eventBus';

let thisVue = '';
export default {
  data() {
    return {
      workOrderState: [
        {
          name: '已完成',
          value: 1,
        }, {
          name: '未完成',
          value: 2,
        },
      ],
      workOrderType: [
        {
          name: '业务工单',
          value: 1,
        }, {
          name: '维修工单',
          value: 2,
        }, {
          name: '安装工单',
          value: 3,
        }, {
          name: '测试工单',
          value: 4,
        },
      ],
      filterParam: {
        isDone: '',
        type: '',
        createTime: '', // startTime
        endTime: '',
        keyWords: '',
      },
      workOrderList: [],
      tableData: [],
      websoketData: [],
      timeStamp: '',
      tableLoading: false,
      total: 0,
      pickerOptions1: { // 开始日期
        disabledDate(time) {
          if (thisVue.filterParam.endTime) {
            const v = thisVue.filterParam.endTime.getTime && (time.getTime() > thisVue.filterParam.endTime.getTime());
            return v;
          }
          return false;
        },
      },
      pickerOptions2: { // 结束日期
        disabledDate(time) {
          if (thisVue.filterParam.createTime) {
            const v = thisVue.filterParam.createTime.getTime && (time.getTime() < thisVue.filterParam.createTime.getTime());
            return v;
          }
          return false;
        },
      },
      showSizes: false,
      pageNum: 1,
      pageSize: 10,
      sendDetail: {},
      tableColumnList: [
        {
          prop: 'msgId',
          label: '消息ID',
        },
        {
          prop: 'msgState',
          label: '消息类型',
        },
        {
          prop: 'msgLabel',
          label: '消息主题',
        },
        {
          prop: 'deviceType',
          label: '设备类型',
        },
        {
          prop: 'deviceBrand',
          label: '设备品牌',
        },
        {
          prop: 'deviceMaker',
          label: '设备型号',
        },
        {
          prop: 'deviceImei',
          label: 'IMEI',
        },
        {
          prop: 'deviceAdress',
          label: '安装地址',
          width: '200',
        },
        {
          prop: 'orderType',
          label: '工作状态',
        },
        {
          prop: 'time',
          label: '派单时间',
          width: '200',
        },
        {
          prop: '',
          label: '图片附件',
        },
      ],
    };
  },
  components: {
    pagination,
    orderDetail,
    navHeader,
    ElOption,
  },
  created() {
    this.getList(1);
    bus.$on('sendAlarm', () => {
      this.getList(1);
    });
  },
  mounted() {
    thisVue = this;
  },
  beforeDestroy() {
    bus.$off('sendAlarm');
  },
  methods: {
    getList(currentpage) {
      let websoketOrderData = [];
      if (localStorage.getItem('websoketOrderData')) {
        websoketOrderData = JSON.parse(localStorage.getItem('websoketOrderData'));
      }
      window.vaApi.getworkOrderList().then((res) => {
        const { status, data } = res.data;
        if (parseInt(status, 10) === 1) {
          this.tableData = [];
          for (let i = 0; i < data.length; i += 1) {
            data[i].src = dieDataImgSrc;
          }
          if (currentpage === 1) {
            this.workOrderList = data.concat(websoketOrderData).reverse();
          }
          this.total = this.workOrderList.length;
          this.workOrderList.forEach((v, i) => {
            const obj = v;
            if (i >= (currentpage - 1) * this.pageSize && i < currentpage * this.pageSize) {
              this.tableData.push(obj);
            }
          });
        }
      });
    },
    // watch pagination pageSize
    pageSizeFun() {
      this.getList(this.$refs.turnPage1.currentPage);
    },
    openDetail(detail) {
      this.sendDetail = detail;
      this.$refs.orderDetail.outerVisible = true;
    },
    finishFun(id) {
      this.tableData.forEach((v) => {
        const obj = v;
        if (obj.id === id && obj.isDone !== 1) {
          obj.isDone = 1;
          this.$message({
            message: '工单已完成',
            type: 'success',
            duration: 1000,
          });
        }
      });
    },
  },
};
</script>

<style lang="scss">
@import "~scss_vars";
  #testList{
    .maincontainer{
      margin-top:60px;
      padding-top:20px;
      background:#ECEEF3;
      .tableList{
        .has-gutter{
          tr{
            th{
              background:$list-header-color;
              color:#333;
            }
          }
        }
        .infoBtn{
          color:$color-primary;
          padding-right: 10px;
        }
        .weiwancehng{
          color:#fe9137;
        }
        .disabled{opacity: .3;color:gray;}
      }
    }
  }
</style>
