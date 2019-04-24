<template>
   <div id="testList">
    <navHeader/>
    <div class="maincontainer">
      <el-form :inline="true" :model="filterParam" class="demo-form-inline">
        <el-form-item>
          <el-select clearable id="msg-notice-state" v-model="filterParam.msgStatus" placeholder="全部消息状态">
            <el-option
              v-for="(item, index) in msgStatus"
              :key="index"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select style="width:140px;" clearable id="msg-notice-type" v-model="filterParam.msgType" placeholder="消息类型">
            <el-option
              v-for="(item, index) in msgType"
              :key="index"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select style="width:140px;" clearable id="msg-device-type" v-model="filterParam.deviceType" placeholder="设备类型">
            <el-option
              v-for="(item, index) in deviceType"
              :key="index"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select style="width:140px;" clearable id="msg-brand-type" v-model="filterParam.deviceBrand" placeholder="品牌类型">
            <el-option
              v-for="(item, index) in deviceBrand"
              :key="index"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select style="width:140px;" clearable id="msg-work-type" v-model="filterParam.resultStatus" placeholder="业务状态">
            <el-option
              v-for="(item, index) in resultStatus"
              :key="index"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-date-picker
            id="msg-sel-start-time"
            v-model="filterParam.createTime"
            type="date"
            :picker-options="pickerOptions1"
            placeholder="开始时间">
          </el-date-picker>&nbsp;~&nbsp;
          <el-date-picker
            id="msg-sel-end-time"
            v-model="filterParam.endTime"
            type="date"
            :picker-options="pickerOptions2"
            placeholder="结束时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-input id="work-order-mng-ipt-search" clearable class="searchInput"
                    v-model.trim="filterParam.keyWords" maxlength=20 placeholder="请输入内容">
            <template slot="append">
              <div id="msg-btn-search" style="cursor:pointer;">检索</div>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button v-if="multipleSelection.length > 0" v-loading="msgConfirmFlag" @click="msgInfoConfirmOrCancel(1)" id="msg-sure-btn" type="primary">消息确认</el-button>
          <el-button v-else class="sure-or-cancleDis-btn" disabled id="msg-sure-btn" type="primary">消息确认</el-button>
          <el-button v-if="multipleSelection.length > 0" v-loading="msgCancelFlag" @click="msgInfoConfirmOrCancel(2)" id="msg-cancel-btn" type="primary">确认取消</el-button>
          <el-button v-else id="msg-cancel-btn" class="sure-or-cancleDis-btn" disabled type="primary">确认取消</el-button>
        </el-form-item>
      </el-form>
      <div class="tableList">
        <el-table
          :data="msgTableData"
          style="width: 100%"
          height="520"
          align="center"
          ref="msgManageRefs"
          fit
          @selection-change="handleSelectionChange"
          >
          <el-table-column type="selection" width="50"></el-table-column>
          <el-table-column prop="index" label="序号" width="80">
            <template slot-scope="{row}">
              <div :class="row.resultStatus === '已确认'?'disabled':''">{{row.index}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="msgType" label="消息类型" align="center">
            <template slot-scope="{row}">
              <div :class="row.resultStatus === '已确认'?'disabled':row.resultStatus !== '已确认'&&row.msgType === 1?'red':row.resultStatus !== '已确认'&&row.msgType === 2?'green':row.resultStatus !== '已确认'&&row.msgType === 3?'blue':'orange'">{{row.msgType === 1?'告警':row.msgType === 2?'业务':row.msgType === 3?'系统':'故障'}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="msgLabel" label="消息主题" align="center">
            <template slot-scope="{row}">
              <div :class="row.resultStatus === '已确认'?'disabled':''">{{row.msgLabel}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="deviceType" label="设备类型" align="center">
            <template slot-scope="{row}">
              <div :class="row.resultStatus === '已确认'?'disabled':''">{{row.deviceType}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="deviceBrand" label="设备品牌" align="center">
            <template slot-scope="{row}">
              <div :class="row.resultStatus === '已确认'?'disabled':''">{{row.deviceBrand}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="deviceMaker" label="设备型号" align="center">
            <template slot-scope="{row}">
              <div :class="row.resultStatus === '已确认'?'disabled':''">{{row.deviceMaker}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="deviceImei" label="IMEI" width="180" align="center">
            <template slot-scope="{row}">
              <div :class="row.resultStatus === '已确认'?'disabled':''">{{row.deviceImei}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="deviceAdress" label="安装地址" width="260" align="center">
            <template slot-scope="{row}">
              <div :class="row.resultStatus === '已确认'?'disabled':''">{{row.deviceAdress}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="time" label="发送时间" width="180" align="center">
            <template slot-scope="{row}">
              <div :class="row.resultStatus === '已确认'?'disabled':''">{{row.time}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="resultStatus" label="业务状态" align="center">
            <template slot-scope="{row}">
              <div :class="row.resultStatus === '已确认'?'disabled':''">{{row.resultStatus}}</div>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="180" align="center">
            <template slot-scope="scope">
              <span class="tableBtnGroup" @click="msgInfoFun(scope.row)">详情</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <msgInfo ref="msgInfoRefs" />
      <!--分页-->
      <pagination :flag="showSizes" ref="turnPage1" :total="total" :paginationFun="getList" :pageSizeFun="pageSizeFun"></pagination>
    </div>
  </div>
</template>
<script>
import pagination from '../components/Pagination';
import navHeader from '../components/NavHeader';
import msgInfo from '../components/MsgDeviceInfo';
import bus from '../utils/eventBus';

let thisVue = '';
export default {
  data() {
    return {
      msgConfirmFlag: false,
      msgCancelFlag: false,
      multipleSelection: [],
      msgStatus: [
        {
          name: '已读',
          value: 1,
        }, {
          name: '未读',
          value: 2,
        },
      ],
      msgType: [
        {
          name: '告警',
          value: 1,
        }, {
          name: '业务',
          value: 2,
        }, {
          name: '系统',
          value: 3,
        }, {
          name: '故障',
          value: 4,
        },
      ],
      deviceType: [
        {
          name: '烟感',
          value: 'smoker',
        },
        {
          name: '井盖',
          value: 'cover',
        },
        {
          name: '地磁',
          value: 'geoMonitor',
        },
        {
          name: '门磁',
          value: 'doorlock',
        },
        {
          name: '栓帽',
          value: 'hydrant',
        },
        {
          name: '扬尘',
          value: 'dust',
        },
        {
          name: '环境',
          value: 'airQuality',
        },
        {
          name: '垃圾桶',
          value: 'dustbin',
        },
        {
          name: '一键呼叫',
          value: 'alarmBtn',
        },
      ],
      deviceBrand: [
        {
          name: '铂钰',
          value: 'boyu',
        },
        {
          name: '苏通',
          value: 'st',
        },
        {
          name: '七弦',
          value: 'qx',
        },
        {
          name: '申欣',
          value: 'shx',
        },
        {
          name: '玖海',
          value: 'jh',
        },
        {
          name: '昊想',
          value: 'hx',
        },
      ],
      resultStatus: [
        {
          name: '已确认',
          value: '1',
        },
        {
          name: '待确认',
          value: '2',
        },
        {
          name: '已取消',
          value: '3',
        },
      ],
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
      filterParam: {
        msgStatus: '',
        msgType: '',
        deviceType: '', // startTime
        deviceBrand: '',
        resultStatus: '',
        createTime: '',
        endTime: '',
        keyWords: '',
      },
      msgTableData: [],
      tableLoading: false,
      total: 0,
      showSizes: false,
      pageNum: 1,
      pageSize: 10,
      websoketMsgData: [],
      msgOrderList: [],
    };
  },
  components: {
    pagination,
    navHeader,
    msgInfo,
  },
  created() {
    bus.$on('sendAlarm', () => {
      this.getList(1);
    });
  },
  mounted() {
    thisVue = this;
    this.getList(1);
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    msgInfoConfirmOrCancel(type) {
      if (type === 1) this.msgConfirmFlag = true;
      else this.msgCancelFlag = true;
      window.vaApi.msgInfoConfirmOrCancel().then(({ data: { status } }) => {
        if (parseInt(status, 10) === 1) {
          let message = '';
          if (type === 1) {
            this.msgConfirmFlag = false;
            message = '消息确认成功';
            this.multipleSelection.forEach((item2) => {
              this.msgTableData.filter(item => item.index === item2.index)[0].resultStatus = '已确认';
            });
          } else {
            this.msgCancelFlag = false;
            message = '消息取消成功';
            this.multipleSelection.forEach((item2) => {
              this.msgTableData.filter(item => item.index === item2.index)[0].resultStatus = '待确认';
            });
          }
          this.$refs.msgManageRefs.clearSelection();
          this.$message({
            message,
            type: 'success',
          });
        }
      });
    },
    msgInfoFun(row) {
      bus.$emit('receiveMsgInfo', row);
      this.$refs.msgInfoRefs.msgDeviceInfoDialogVisible = true;
    },
    getList(currentpage) {
      let websoketMsgData = [];
      if (localStorage.getItem('websoketMsgData')) {
        websoketMsgData = JSON.parse(localStorage.getItem('websoketMsgData'));
      }
      window.vaApi.getMsgList().then((res) => {
        const { status, data } = res.data;
        if (parseInt(status, 10) === 1) {
          this.msgTableData = [];
          if (currentpage === 1) {
            this.msgOrderList = data.concat(websoketMsgData).reverse();
          }
          this.total = this.msgOrderList.length;
          this.msgOrderList.forEach((v, i) => {
            const obj = v;
            if (i >= (currentpage - 1) * this.pageSize && i < currentpage * this.pageSize) {
              this.msgTableData.push(obj);
            }
          });


          // this.msgOrderList.forEach((v, i) => {
          //   const obj = v;
          //   if (currentpage === 1) {
          //     if (i >= (currentpage - 1) * this.pageSize && i < 10 - localNum) {
          //       this.msgTableData.push(obj);
          //     }
          //   } else if (i >= (currentpage - 1) * this.pageSize - localNum && i < currentpage * this.pageSize - localNum) {
          //     this.msgTableData.push(obj);
          //   }
          // });
        }
      });
    },
    pageSizeFun() {
      this.getList(this.$refs.turnPage1.currentPage);
    },
  },
};
</script>
<style lang="scss" scoped>
@import "~scss_vars";
  #testList{
    .maincontainer{
      margin-top:60px;
      padding-top:20px;
      background:#ECEEF3;
      .sure-or-cancleDis-btn{
        background: #8E9EAB;
        color: #FFFFFF;
        border-color: #8E9EAB;
      }
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
        .red{color:#F35C4D;}
        .blue{color:#2AA0E8,}
        .green{color:#00BF4D;}
        .orange{color:#F38715;}
        .gray{color:#9B9B9B;}
        .disabled{opacity: .3;color:gray;}
        .tableBtnGroup{color:#2AA0E8;margin-right:10px;cursor: pointer;}
      }
    }
  }
</style>
