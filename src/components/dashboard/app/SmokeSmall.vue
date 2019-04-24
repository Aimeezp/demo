<template>
  <SmallComponent type="smoke" :dataList="dataList" :timeDiffer="requestData.smoke && requestData.smoke.lastTimeMsg?requestData.smoke.lastTimeMsg:'1秒'"></SmallComponent>
</template>
<script>
import { mapGetters } from 'vuex';
import SmallComponent from './component/SmallComponent';

export default {
  name: 'smoke',
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
    this.formatData();
  },
  watch: {
    'requestData.smoke.updateTime': function smoke() {
      this.formatData();
    },
  },
  methods: {
    formatData() {
      if (this.requestData.smoke && this.requestData.smoke.data) {
        const {
          totalNum,
          totalEquipNum,
          smokeNum,
          fireNum,
        } = this.requestData.smoke.data.list;
        this.dataList = {
          number: totalNum,
          device: totalEquipNum, // 设备总数
          smokeNum, // 当月烟警
          fireNum, // 当月火警
        };
      }
    },
  },
};
</script>
