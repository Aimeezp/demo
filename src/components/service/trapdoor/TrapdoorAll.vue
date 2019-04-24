<template>
  <section>
    <trapdoor :totalNum="total"></trapdoor>
    <trapdoorState></trapdoorState>
    <WeekTrapdoorState></WeekTrapdoorState>
  </section>
</template>

<script>
import trapdoor from './TrapdoorList';
import trapdoorState from './TrapdoorState';
import WeekTrapdoorState from './WeekTrapdoorState';

export default {
  props: ['total'],
  components: {
    trapdoor, trapdoorState, WeekTrapdoorState,
  },
};
</script>

<style scoped>

</style>
