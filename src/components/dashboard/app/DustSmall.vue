<template>
  <SmallComponent type="dust"
                  :dataList="dataList"
                  :timeDiffer="requestData.dust && requestData.dust.lastTimeMsg?requestData.dust.lastTimeMsg:'1秒'">
  </SmallComponent>
</template>
<script>
import { mapGetters } from 'vuex';
import SmallComponent from './component/SmallComponent';

export default {
  name: 'dust',
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
    this.getDustData();
  },
  watch: {
    'requestData.dust.updateTime': function dust() {
      this.getDustData();
    },
  },
  methods: {
    getDustData() {
      if (this.requestData.dust && this.requestData.dust.data) {
        this.dataList = this.requestData.dust.data.list;
      }
    },
  },
};
</script>
