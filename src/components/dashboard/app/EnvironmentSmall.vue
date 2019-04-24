<template>
  <SmallComponent type="environment"
                  :dataList="dataList"
                  :timeDiffer="requestData.smoke && requestData.smoke.lastTimeMsg?requestData.smoke.lastTimeMsg:'1秒'">
  </SmallComponent>
</template>
<script>
import { mapGetters } from 'vuex';
import SmallComponent from './component/SmallComponent';

export default {
  name: 'environment',
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
    this.getBEnvDataVuex();
  },
  watch: {
    'requestData.environment.updateTime': function env() {
      this.getBEnvDataVuex();
    },
  },
  methods: {
    getBEnvDataVuex() {
      if (this.requestData && this.requestData.environment && this.requestData.environment.data) {
        this.dataList = this.requestData.environment.data.list.envSData;
      }
    },
  },
};
</script>
