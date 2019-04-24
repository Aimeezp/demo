<template>
  <div class="tabTable">
    <div class="selectData">
      <el-date-picker v-model="startTime" type="date" placeholder="开始时间">
      </el-date-picker>
      <span class="connectText">-</span>
      <el-date-picker v-model="endTime" type="date" placeholder="结束时间">
      </el-date-picker>
      <el-button type="primary" @click="$refs.logData.getLogList(1)">检索</el-button>
      <el-button type="primary" @click="logExportFun" style="float:right" disabled>导出设备日志</el-button>
    </div>
    <div class="tableList">
      <ul class="tabCons">
        <li v-for="(item, index) in tabList" :key="index" @click="tabChange(item.value)" :class=" tabValue === item.value ? 'selectedBtn' : ''">{{item.name}}</li>
      </ul>
      <deviceLog v-if="tabValue === 0" ref="logData" :logData="deviceLogData"></deviceLog>
      <SignalStrength v-if="tabValue === 1" ref="singnal" :signalData="deviceLogData"></SignalStrength>
      <VoltagePower v-if="tabValue === 2" ref="voltage" :powerData="deviceLogData"></VoltagePower>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import deviceLog from './DeviceLog';
import SignalStrength from './SignalStrength';
import VoltagePower from './VoltagePower';

export default {
  data() {
    return {
      startTime: '',
      endTime: '',
      tabValue: 0,
      tabList: [
        {
          name: '设备日志',
          value: 0,
        },
        {
          name: '信号强度',
          value: 1,
        },
        {
          name: '电压电量',
          value: 2,
        },
      ],
      VoltageList: [],
      BatteryList: [],
      logDataList: [],
    };
  },
  props: ['deviceIMEI', 'deviceType'],
  components: {
    deviceLog,
    SignalStrength,
    VoltagePower,
  },
  computed: { ...mapGetters(['deviceLogData']) },
  mounted() {
  },
  methods: {
    tabChange(v) {
      this.tabValue = v;
    },
    logExportFun() {
      const param = {};
      param.deviceType = this.deviceType;
      param.serialNumber = this.deviceIMEI;
      window.vaApi.logsExport(param).then((res) => {
        if (Number(res.status) !== Number(200)) {
          this.$message({
            message: '网络异常,请稍后重试',
            type: 'error',
          });
          return;
        }
        // creat blob object
        const blob = new Blob([res.data]);
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        // file name
        link.download = 'excel.xlsx';
        link.click();
        this.$message({
          type: 'success',
          message: '导出设备日志成功!',
        });
      });
    },
  },
};
</script>

<style lang="scss">
@import "~scss_vars";
.tabTable{
  .tableList{
    margin-top: 10px;
    .tabCons{
      width:20%;
      display: flex;
      background:$color-primary;border-radius:8px 8px 0 0;
      li{flex:1;text-align: center;height:40px;line-height: 40px;cursor: pointer;color:#fff;}
      li.selectedBtn{background:#fff;border-radius:8px 8px 0 0;color:$color-primary;}
    }
  }

}
</style>
