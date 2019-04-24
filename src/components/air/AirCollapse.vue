<template>
  <section class="air-collapse">
    <airTable ref="airTableRefs"/>
    <weekTrend ref="airWeekTrendRefs"/>
    <monthTrend ref="airMonthTrendRefs"/>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
import airTable from './AirTable';
import weekTrend from './WeekTrend';
import monthTrend from './MonthTrend';
import bus from '../../utils/eventBus';

export default {
  name: 'air-collapse',
  components: { airTable, weekTrend, monthTrend },
  computed: {
    ...mapGetters(['collapseDeviceType']),
  },
  props: ['total'],
  watch: {
    collapseDeviceType: {
      handler() {
        if (this.collapseDeviceType === 'airQuality') {
          this.$refs.airTableRefs.getAirTableData('change');
          this.$refs.airWeekTrendRefs.getWeekTrendData();
          this.$refs.airMonthTrendRefs.getMonthTrendData();
        }
      },
      immediate: true,
    },
    total() {
      bus.$emit('getAirCollapseDataTotal', this.total);
    },
  },
};
</script>

<style lang="scss">
</style>
