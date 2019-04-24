<template>
    <section class="mainPageCls">
      <div class="twoDimensional" v-if="!dimensionalFlag">
        <CarCAD/>
        <bdMap/>
        <sideCollapse/>
        <videoCom/>
      </div>
      <div class="threeDimensional" v-else>
        <threeDimensional />
      </div>
    </section>
</template>

<script>
import { mapGetters } from 'vuex';
import bdMap from '@/components/mainPage/map/BdMap';
import sideCollapse from '@/components/mainPage/SideCollapse';
import videoCom from '@/components/mainPage/video/VideoHome';
import threeDimensional from '@/components/mainPage/ThreeDimensional';
import CarCAD from '@/components/gasMonitor/CarCAD';

export default {
  computed: { ...mapGetters(['dimensionalFlag']) },
  components: {
    bdMap, sideCollapse, videoCom, threeDimensional, CarCAD,
  },
  destroyed() {
    this.$store.commit('SET_DIMENSIONAL_FLAG', true);
  },
};
</script>

<style lang="scss" scoped>
.mainPageCls {
    position: relative;
    &, .twoDimensional, .threeDimensional {
      height: 100%;
    }
}
</style>
