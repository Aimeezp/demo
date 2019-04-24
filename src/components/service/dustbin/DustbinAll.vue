<template>
  <section>
    <DustbinTable :totalNum="total"></DustbinTable>
    <WeekDustbin></WeekDustbin>
    <MarchTrend></MarchTrend>
  </section>
</template>

<script>
import DustbinTable from './DustbinTable';
import WeekDustbin from './WeekDustbin';
import MarchTrend from './MarchTrend';

export default {
  props: ['total'],
  components: {
    DustbinTable, WeekDustbin, MarchTrend,
  },
};
</script>

<style scoped>

</style>
