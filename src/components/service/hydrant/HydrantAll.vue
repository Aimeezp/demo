<template>
  <section>
    <hydrantList :totalAll="total"></hydrantList>
    <weekHydrantState :totalAll="total"></weekHydrantState>
    <hydrantState :totalAll="total"></hydrantState>
  </section>
</template>

<script>
import hydrantList from './HydrantList';
import hydrantState from './HydrantState';
import weekHydrantState from './WeekHydrantState';

export default {
  components: {
    hydrantList, hydrantState, weekHydrantState,
  },
  props: ['total'],
};
</script>

<style scoped>

</style>
