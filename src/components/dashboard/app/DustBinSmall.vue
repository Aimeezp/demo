<template>
  <SmallComponent type="dustbin"
                  :dataList="dataList"
                  :timeDiffer="requestData.dustbin && requestData.dustbin.lastTimeMsg?requestData.dustbin.lastTimeMsg:'1秒'">
  </SmallComponent>
</template>

<script>
import { mapGetters } from 'vuex';
import SmallComponent from './component/SmallComponent';

export default {
  name: 'dustbin',
  data() {
    return {
      dataList: {},
    };
  },
  components: {
    SmallComponent,
  },
  computed: {
    ...mapGetters(['requestData']),
  },
  mounted() {
    this.getDustBinDataVuex();
  },
  watch: {
    'requestData.dustbin.updateTime': function dustbin() {
      this.getDustBinDataVuex();
    },
  },
  methods: {
    getDustBinDataVuex() {
      if (this.requestData && this.requestData.dustbin && this.requestData.dustbin.data) {
        const {
          totalNum,
          totalEquipNum,
          monthWarnNum,
          dayWarnNum,
        } = this.requestData.dustbin.data.list;
        this.dataList = {
          number: totalNum,
          device: totalEquipNum, // 设备总数
          monthAlarm: monthWarnNum, // 月累计告警
          monthError: dayWarnNum, // 月累计故障
        };
      }
    },
  },
};
</script>
