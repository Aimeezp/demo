<template>
  <section>
    <NoiseTable :totalNum="total"></NoiseTable>
    <RealTimeNoise></RealTimeNoise>
    <WeekNoise></WeekNoise>
  </section>
</template>

<script>
import NoiseTable from './NoiseTable';
import RealTimeNoise from './RealTimeNoise';
import WeekNoise from './WeekNoise';

export default {
  props: ['total'],
  components: {
    NoiseTable, WeekNoise, RealTimeNoise,
  },
};
</script>

<style scoped>

</style>
