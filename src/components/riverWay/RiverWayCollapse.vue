<template>
  <section>
    <riverWayTable ref="riverWayTableRef"/>
    <weekOpacity ref="riverWayWeekOpacityRef"/>
    <weekTrend ref="riverWayWeekTrendRef"/>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
import riverWayTable from './RiverWayTable';
import weekOpacity from './WeekOpacity';
import weekTrend from './WeekTrend';
import bus from '../../utils/eventBus';

export default {
  name: 'river-way-collapse',
  components: { riverWayTable, weekOpacity, weekTrend },
  computed: {
    ...mapGetters(['collapseDeviceType']),
  },
  props: ['total'],
  watch: {
    total: {
      handler() {
        bus.$emit('getRiverWayDataTotal', this.total);
      },
      immediate: true,
    },
    collapseDeviceType: {
      handler() {
        if (this.collapseDeviceType === 'water') {
          this.$refs.riverWayTableRef.getRiverWayTableData('change');
          this.$refs.riverWayWeekOpacityRef.getWeekOpacityData();
          this.$refs.riverWayWeekTrendRef.getRiverWayAxisData();
          this.$refs.riverWayWeekTrendRef.getWeekTrendData();
        }
      },
      immediate: true,
    },
  },
};
</script>

<style scoped>

</style>
