<template>
  <SmallComponent type="doorlock"
                  :dataList="dataList"
                  :timeDiffer="requestData.smoke && requestData.smoke.lastTimeMsg?requestData.smoke.lastTimeMsg:'1秒'">
  </SmallComponent>
</template>

<script>
import { mapGetters } from 'vuex';
import SmallComponent from './component/SmallComponent';

export default {
  name: 'doorlock',
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
    this.getDoorLockDataVuex();
  },
  watch: {
    'requestData.doorlock.updateTime': function env() {
      this.getDoorLockDataVuex();
    },
  },
  methods: {
    getDoorLockDataVuex() {
      if (this.requestData && this.requestData.doorlock && this.requestData.doorlock.data) {
        this.dataList = this.requestData.doorlock.data.list.doorlockSData;
      }
    },
  },
};
</script>

<style scoped lang="scss">

</style>
