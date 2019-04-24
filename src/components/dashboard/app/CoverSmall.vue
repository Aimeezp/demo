<template>
  <SmallComponent :dataList="dataList" type="cover" :timeDiffer="requestData.cover && requestData.cover.lastTimeMsg?requestData.cover.lastTimeMsg:'1秒'"></SmallComponent>
</template>
<script>
import { mapGetters } from 'vuex';
import SmallComponent from './component/SmallComponent';

export default {
  name: 'cover',
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
    this.getCoverData();
  },
  watch: {
    'requestData.cover.updateTime': function cover() {
      this.getCoverData();
    },
  },
  methods: {
    getCoverData() {
      if (this.requestData.cover && this.requestData.cover.data) {
        this.dataList = this.requestData.cover.data.list;
      }
    },
  },
};
</script>
