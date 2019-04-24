<template>
    <section>
      <navHeader/>
      <div class="deviceManage">
        <el-form :inline="true" :model="searchForm" class="deviceSearch">
          <div class="clearfix">
            <el-form-item>
              <el-select clearable v-model="searchForm.deviceStatus" placeholder="请选择设备状态">
                <el-option v-for="(item,index) in selectList.deviceStatusList" :label="item.label" :value="item.value" :key="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-select clearable v-model="searchForm.deviceType" placeholder="请选择设备类型">
                <el-option v-for="(item,index) in selectList.deviceTypeList" :label="item.label" :value="item.value" :key="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-select clearable v-model="searchForm.maker" placeholder="请选择设备品牌">
                <el-option v-for="(item,index) in selectList.makerList" :label="item.label" :value="item.value" :key="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-select clearable v-model="searchForm.projectId" placeholder="请选择项目名称">
                <el-option v-for="(item,index) in selectList.projectNameList" :label="item.label" :value="item.value" :key="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-date-picker v-model="searchForm.startTime" type="date" placeholder="开始时间">
              </el-date-picker>
              <span class="connectText">-</span>
              <el-date-picker v-model="searchForm.endTime" type="date" placeholder="结束时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item class="searchInput">
              <el-input clearable  placeholder="户主|安装地址|联系电话|设备ID|IMEI|型号" v-model.trim="searchForm.keyWord" @keyup.enter.native="getList(1)">
                <template slot="append">
                  <div @click="getList(1)">检索</div>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item class="searchBtn">
              <a id="deviceMaintainDownA" style="display: none;"></a>
              <el-button @click="batchExportFun" type="primary" disabled>批量导出</el-button>
              <el-button @click="batchSingleAddDeviceClick" type="primary" disabled>批量编辑</el-button>
              <el-button  @click="batchSingleAddDeviceClick('addDevice')"  type="primary" disabled>添加设备</el-button>
              <el-button @click="deleteMultiDevice" type="primary" disabled>批量删除</el-button>
            </el-form-item>
          </div>
        </el-form>
        <div class="deviceList tableList">
          <i class="iconfont icon-set cursor" @click="openTitleDialog"></i>
          <el-table :data="tableData" border stripe class="deviceTable" v-loading="tableLoading" height="700" @row-click="logDetail" :row-style="rowStyle" @selection-change="handleSelectionChange">
            <template v-for="(item,index) in colTotalList">
              <el-table-column type="selection" :key="item.deviceId" width="40" v-if="item.label==='序号'">
              </el-table-column>
              <el-table-column :prop="item.prop" :label="item.label" :key="index" align="center" :width="item.width" v-if="item.label==='在线'">
                <template slot-scope="{row}">
                  <span class="deviceCircle" :class="row.onlineState==='online'?'green':'gray'"></span>
                </template>
              </el-table-column>
              <el-table-column :prop="item.prop" :label="item.label" :key="index" align="center" :width="item.width" v-else-if="item.label==='电压/电量'">
                <template slot-scope="{row}">
                  <span>{{row.battery}}{{row.battery && batteryType===1?'V':row.battery && batteryType===2?'A':row.battery && batteryType===0?'未知':''}}</span>
                </template>
              </el-table-column>
              <el-table-column fixed="right" :prop="item.prop" :label="item.label" :key="index" align="center" :width="item.width" v-else-if="item.label==='操作'">
                <template slot-scope="{row}">
                  <div class="tableBtnGroup">
                    <span class="tableBtn" @click="getDevicePosition(row)">定位</span>
                    <span class="tableBtn" @click="getDeviceDetail(row.deviceId, 0)">详情</span>
                    <span class="tableBtn" @click="getDeviceDetail(row.deviceId, 1)">编辑</span>
                    <span class="tableBtn" @click="deleteSingleDevice(row.serialNumber)">删除</span>
                    <span class="tableBtn" @click="startBtn(row.deviceId)" v-if="row.start">启用</span>
                    <span class="tableBtn" @click="startBtn(row.deviceId)" v-else>停用</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column :prop="item.prop" :label="item.label" :key="index" align="center" :width="item.width" v-else>
              </el-table-column>
            </template>
          </el-table>
          <pagination :flag="true" ref="turnPage1" :total="deviceTotal" :paginationFun="getList" :pageSizeFun="pageSizeFun"></pagination>
        </div>
        <DeviceTabTable ref="tabTable" :deviceIMEI="deviceIMEI" :deviceType="deviceType"></DeviceTabTable>

        <el-dialog title="编辑表单" :visible.sync="titleDialogVisible" width="40%" center class="dialog-self">
          <div class="titleList">
            <div v-for="i in Math.ceil(titleDataList.length/4)" class="titleRow" :key="i">
              <el-checkbox v-for="(item, index) in titleDataList.slice(i*4-4,i*4)" v-model="item.show" class="titleCol" :key="index">{{item.label}}</el-checkbox>
              <div class="titleCol" v-if="i===Math.ceil(titleDataList.length/4)" style="margin-left:30px;"></div>
            </div>
          </div>
          <span slot="footer" class="dialog-footer">
        <el-button @click="titleDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="titleSave">保存</el-button>
      </span>
        </el-dialog>

        <el-dialog
          title="提示"
          :visible.sync="errorDialogVisible"
          width="30%"
          :before-close="handleClose">
          <ul class="errorlist">
            <li v-for="(item,index) in errorList" :key="index">
              {{item}}
            </li>
          </ul>
        </el-dialog>

        <!--详情日志tab-->
        <dLog ref="Dlog"></dLog>
        <!--定位-->
        <position ref="local"></position>
        <!--新建设备-->
        <NewDevice ref="newDecive"></NewDevice>
      </div>
    </section>
</template>

<script>
import navHeader from '../components/NavHeader';
import moment from 'moment';
import { Local } from '@/utils/storage';
import { deviceTitleList } from '@/storage/localStorage';
import colTotalList from '@/assets/js/DeviceManage/DeviceMaintainTitleDate';
import pagination from '@/components/Pagination';
import dLog from '../components/Device/DeviceListOparetion/EditDevice';
import NewDevice from '@/components/Device/NewDevice';
import position from '@/components/Device/DeviceListOparetion/Position';
import DeviceTabTable from '@/components/Device/DeviceTabTable/TabTable';
import { logList } from '@/mock/data/device';
import { appData } from '@/assets/js/appMapping';

export default {
  data() {
    return {
      deviceIMEI: '',
      deviceType: '',
      searchForm: {
        deviceStatus: '',
        deviceType: this.$route.params.deviceType || '',
        keyWord: '',
        maker: '',
        projectId: this.$route.params.projectId || '',
        startTime: '',
        endTime: '',
      },
      selectListData: [],
      selectList: {
        deviceStatusList: [
          {
            label: '在线',
            value: 'online',
          },
          {
            label: '离线',
            value: 'lost',
          },
        ],
        deviceTypeList: [],
        makerList: [],
        projectNameList: [],
      },
      deviceDeleteList: [],
      colTotalList,
      tableLoading: false,
      tableData: [],
      deviceTotal: 1,
      titleDialogVisible: false,
      titleDataList: [],
      titleKey: `${deviceTitleList}${this.$store.getters.userName}`, // title list localstorage key
      errorDialogVisible: false,
      errorList: [],
    };
  },
  components: {
    navHeader,
    dLog,
    position,
    NewDevice,
    pagination,
    DeviceTabTable,
  },
  created() {
    // get table title list
    const list = Local.get(this.titleKey);
    if (list) {
      this.colTotalList.forEach((v) => {
        const val = v;
        for (let i = 0; i < list.length; i += 1) {
          if (val.label === list[i].label) {
            val.show = list[i].show;
          }
        }
      });
    }
  },
  mounted() {
    this.getDeviceSelectors();
    this.getList();
  },
  watch: {
    'searchForm.deviceType': function type() {
      this.handleSelect();
    },
    'searchForm.maker': function maker() {
      this.handleSelect();
    },
    'searchForm.projectId': function project() {
      this.handleSelect();
    },
  },
  methods: {
    startBtn(deviceId) { // 停用启用
      this.tableData.forEach((item) => {
        const v = item;
        if (v.deviceId === deviceId) {
          v.start = !v.start;
        }
      });
    },
    batchEditFunClick() {
      this.$router.push({ path: '/device-maintain/batch-edit-mng' });
    },
    batchSingleAddDeviceClick(type) {
      if (type === 'addDevice') {
        this.$confirm('添加单个设备，需前往工单模块-新建工单添加。是否立即前往？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          this.$router.push({ path: '/work-order-manage/add' });
        }).catch(() => {
        });
      } else {
        this.$router.push({ path: '/device-maintain/batch-edit-mng' });
      }
    },
    deleteSingleDevice(id) {
      this.tableData.forEach((item, index) => {
        if (item.serialNumber === id) {
          this.tableData.splice(index, 1);
          this.$message({
            type: 'success',
            message: '设备删除成功!',
          });
        }
      });
    },
    deleteMultiDevice() {
      const params = [];
      this.errorList = [];
      this.deviceDeleteList.forEach((v) => {
        params.push(v.imei);
      });
      if (this.deviceDeleteList && this.deviceDeleteList.length < 1) {
        this.$message({
          type: 'info',
          message: '请选择要删除的设备',
        });
      } else {
        this.$confirm('确认删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          this.tableLoading = true;
          window.vaApi.deleteMultiDevice(params).then((res) => {
            this.tableLoading = false;
            const { status, message } = res.data;
            const msgArr = message.slice(1).split(',');
            if (parseInt(status, 10) === 1) {
              this.$message({
                type: 'success',
                message: '删除成功!',
              });
              this.getList();
            }
            if (parseInt(status, 10) !== 1) {
              msgArr.forEach((v) => {
                const value = v.replace(/[0-9]/g, '');
                const imei = parseInt(v, 10);
                if (value.indexOf('device project info is null') !== -1) {
                  this.errorList.push(`${imei},对应项目为空，不能删除该设备`);
                } else if (value.indexOf('no permission denied') !== -1) {
                  this.errorList.push(`${imei},用户没有权限，不能删除该设备`);
                } else if (value.indexOf('DmpUserId/UserPassword Is Null') !== -1) {
                  this.errorList.push(`${imei},DMP账号密码为空，不能删除该设备`);
                } else if (value.indexOf('project source unknown') !== -1) {
                  this.list.push(`${imei},项目资源未知，不能删除该设备`);
                } else if (value.indexOf('Device not found in the system') !== -1) {
                  this.errorList.push(`${imei},在系统中未找到，不能删除该设备`);
                } else if (value.indexOf('no appId') !== -1) {
                  this.errorList.push(`${imei},用户没有AppId，不能删除设备`);
                } else if (value.indexOf('Access Denied') !== -1) {
                  this.errorList.push(`${imei},没有访问权限，不能删除设备`);
                } else if (value.indexOf("User doesn't have group access") !== -1) {
                  this.errorList.push(`${imei},没有组访问权限，不能删除设备`);
                } else if (value.indexOf(`[${imei}]device are not exit`) !== -1 || value.indexOf(`[${imei}]DMP设备不存在`) !== -1) {
                  this.errorList.push(`${imei},设备不存在，不能删除设备`);
                } else if (value.indexOf(`[${imei}]device are not in AEP`) !== -1) {
                  this.errorList.push(`${imei},设备在AEP不存在，不能删除设备`);
                }
              });
              this.errorDialogVisible = true;
            }
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          });
        });
      }
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(() => {
          done();
        })
        .catch(() => {});
    },
    handleSelectionChange(val) {
      this.deviceDeleteList = val;
    },
    // 打开编辑表单弹窗
    openTitleDialog() {
      // 剔除序号，经纬度，其它均可编辑
      const arr = this.colTotalList
        .filter(val => val.label !== '序号' && val.label !== '经度' && val.label !== '纬度')
        .map(val => ({
          label: val.label,
          show: val.show,
        }));
      // 添加经纬度标签
      arr.push({
        label: '经纬度',
        show: this.colTotalList.filter(val => val.label === '经度')[0].show,
      });
      this.titleDataList = arr;
      this.titleDialogVisible = true;
    },
    // 保存标题
    titleSave() {
      this.titleDataList.forEach((v) => {
        if (v.label !== '经纬度') {
          for (let i = 0; i < this.colTotalList.length; i += 1) {
            if (this.colTotalList[i].label === v.label) {
              this.colTotalList[i].show = v.show;
              break;
            }
          }
        } else {
          // 经纬度特殊处理
          for (let k = 0; k < this.colTotalList.length; k += 1) {
            if (
              this.colTotalList[k].label === '经度' || this.colTotalList[k].label === '纬度'
            ) {
              this.colTotalList[k].show = v.show;
            }
          }
        }
        this.titleDialogVisible = false;
        // save table title list
        const locData = {};
        locData[this.titleKey] = this.colTotalList.map(val => ({
          label: val.label,
          show: val.show,
        }));
        Local.set(locData);
      });
    },
    // batch  Export
    batchExportFun() {
      const that = this;
      window.vaApi.batchExport(that.searchForm).then((res) => {
        if (Number(res.status) !== Number(200)) {
          this.$message({
            message: '网络异常,请稍后重试',
            type: 'error',
          });
          return;
        }
        // 创建一个blob对象,file的一种
        const blob = new Blob([res.data]);
        const link = document.querySelector('#deviceMaintainDownA');
        link.href = window.URL.createObjectURL(blob);
        // 配置下载的文件名
        link.download = 'excel.xlsx';
        link.click();
        that.$message({
          type: 'success',
          message: '批量导出Excel成功!',
        });
      });
    },
    // get device selectors
    getDeviceSelectors() {
      window.vaApi.getDeviceSelectors({}).then(({ data: { status, data } }) => {
        if (parseInt(status, 10) === 1) {
          this.selectListData = data || [];
          this.selectListData.forEach((item) => {
            appData.forEach((v) => {
              const i = item;
              if (i.device_type === v.val) {
                i.category = v.text;
              }
            });
          });
          this.handleSelect();
        }
      });
    },
    getList(currentPage = 1) {
      const param = Object.assign({}, this.searchForm);
      param.pageSize = this.$refs.turnPage1.pageSize;
      param.currentPage = currentPage;
      param.startTime = param.startTime ? moment(param.startTime).format('YYYY-MM-DD') : '';
      param.endTime = param.endTime ? moment(param.endTime).format('YYYY-MM-DD') : '';
      this.tableLoading = true;
      window.vaApi.getDeviceList(param).then(({ data: { status, data } }) => {
        if (parseInt(status, 10) === 1) {
          this.tableLoading = false;
          this.tableData = data.list || [];
          this.tableData.forEach((item) => {
            appData.forEach((v) => {
              const i = item;
              if (i.deviceType === v.val) {
                i.category = v.text;
              }
            });
          });
          this.deviceTotal = data.total;
          if (this.tableData.length > 0) {
            // 默认显示当前页第一条设备的日志信息
            const arr = [];
            logList.forEach((item) => {
              if (item.serialNumber === this.tableData[0].serialNumber) {
                arr.push(item);
              }
            });
            this.$refs.tabTable.$refs.logData.tableData = arr;
          }
          this.tableData.forEach((item) => { // 设备默认启用
            const v = item;
            v.start = true;
          });
        }
      });
    },
    // linkage select | xia la lian dong
    handleSelect() {
      const { deviceType, maker, projectId } = this.searchForm;
      const typeSet = new Set();
      const makerSet = new Set();
      const projectSet = new Set();
      this.selectListData.forEach((v) => {
        typeSet.add(v.device_type);
        makerSet.add(v.maker);
        projectSet.add(v.project_id);
      });
      this.selectList.deviceTypeList = [];
      typeSet.forEach((v) => {
        for (let i = 0; i < this.selectListData.length; i += 1) {
          if (v === this.selectListData[i].device_type && !(maker && maker !== this.selectListData[i].maker) && !(projectId && projectId !== this.selectListData[i].project_id)
          ) {
            this.selectList.deviceTypeList.push({
              label: this.selectListData[i].category,
              value: v,
            });
            break;
          }
        }
      });
      this.selectList.makerList = [];
      makerSet.forEach((v) => {
        for (let i = 0; i < this.selectListData.length; i += 1) {
          if (v === this.selectListData[i].maker && !(deviceType && deviceType !== this.selectListData[i].device_type) && !(projectId && projectId !== this.selectListData[i].project_id)
          ) {
            this.selectList.makerList.push({
              label: v,
              value: v,
            });
            break;
          }
        }
      });
      this.selectList.projectNameList = [];
      projectSet.forEach((v) => {
        for (let i = 0; i < this.selectListData.length; i += 1) {
          if (v === this.selectListData[i].project_id && !(deviceType && deviceType !== this.selectListData[i].device_type) && !(maker && maker !== this.selectListData[i].maker)
          ) {
            this.selectList.projectNameList.push({
              label: this.selectListData[i].product_name,
              value: v,
            });
            break;
          }
        }
      });
    },
    pageSizeFun() {
      this.getList();
    },
    getDeviceDetail(deviceId, flag) {
      if (flag === 0) {
        this.$refs.Dlog.title = '设备详情';
        this.$refs.Dlog.isEdit = true;
        this.$refs.Dlog.isEditFlag = true;
      } else {
        this.$refs.Dlog.title = '设备编辑';
        this.$refs.Dlog.isEdit = true;
        this.$refs.Dlog.getProvinceList();
        this.$refs.Dlog.isEditFlag = false;
      }
      this.$refs.Dlog.dialogVisible = true;
      this.$refs.Dlog.getDetailInfo(deviceId);
    },
    getDevicePosition(row) {
      this.$refs.local.open();
      this.$refs.local.getPosition(row);
    },
    logDetail(row) { // 点击设备行获取该设备日志
      const arr = [];
      logList.forEach((item) => {
        if (item.serialNumber === row.serialNumber) {
          arr.push(item);
        }
      });
      this.$refs.tabTable.$refs.logData.tableData = arr;
    },
    rowStyle({ row }) {
      if (row) {
        return 'cursor:pointer';
      }
      return false;
    },
  },
};
</script>

<style lang="scss">
@import "~scss_vars";

.deviceManage{
  margin-top:60px;
  padding:20px;
  background:#ECEEF3;
  .deviceSearch {
    .searchBtn {
      float: right;
    }
    .connectText {
      display: inline-block;
      height: 40px;
      line-height: 40px;
      width: 4px;
      text-align: center;
    }
    .searchInput{
      width:26.3%;
      cursor:pointer;
      .el-form-item__content{
        width:100%;
      }
    }
  }
  .deleteBtn{margin-bottom:20px;}
  .deviceList {
    position: relative;
    .icon-set {
      position: absolute;
      top: 12px;
      right: 12px;
      z-index: 5;
      color: #333;
      font-size: 18px;
    }
    .deviceTable {
      .deviceCircle {
        display: block;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        margin: 0 auto;
        &.gray {
          background-color: #c0c0c0;
        }
        &.green {
          background-color: #71dc00;
        }
      }
      .cell {
        white-space: nowrap;
        word-break: keep-all;
        text-overflow: ellipsis;
      }
      .el-table__header-wrapper{
        background-color: $list-header-color;
      }
      .el-table__fixed-right-patch{
        background-color: $list-header-color;
      }
    }
  }

  /*编辑表单    start*/
  .titleList {
    padding: 0 125px 0 45px;
    .titleRow {
      display: flex;
      margin-bottom: 20px;
      .titleCol {
        flex: 1;
      }
    }
  }
  /*编辑表单    end*/
  .errorlist{
    li{
      line-height: 24px;
    }
  }
  .tableList{
    .tableBtnGroup {
      .tableBtn {
        color: #2AA0E8;
        margin-right: 10px;
        cursor: pointer;
      }
    }
  }
}
</style>
