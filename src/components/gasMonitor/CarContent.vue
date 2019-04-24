<template>
  <section class="carContent">
    <p class="title" >进场车辆</p>
    <CarInterTable :totalCarInter="total"></CarInterTable>
    <p class="title">离场车辆</p>
    <CarOuterTable :totalCarOuter="total"></CarOuterTable>
    <p class="title">入口监控</p>
    <EnterMoniter></EnterMoniter>
    <p class="title">出口监控</p>
    <OuterMoniter></OuterMoniter>
  </section>

</template>

<script>
import CarInterTable from './CarInterTable';
import CarOuterTable from './CarOuterTable';
import EnterMoniter from './EnterMoniter';
import OuterMoniter from './OuterMoniter';

export default {
  components: {
    CarInterTable,
    CarOuterTable,
    EnterMoniter,
    OuterMoniter,
  },
  props: ['total'],
};
</script>

<style lang="scss">
.carContent{
  .title{
    background: #fff;
    padding: 10px;
  }
}
</style>
