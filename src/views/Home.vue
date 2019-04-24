<template>
  <section class="homePage">
    <importantAlarm />
    <smokeDialog/>
    <navHeader />
    <section class="routePart">
      <transition
        name="fade"
        mode="out-in"
      >
        <router-view></router-view>
      </transition>
    </section>
  </section>
</template>

<script>
import navHeader from '@/components/NavHeader';
import importantAlarm from '@/components/ImportantAlarm';
import smokeDialog from '@/components/smoke/SmokeDialog';


export default {
  components: {
    navHeader,
    importantAlarm,
    smokeDialog,
  },
};
</script>


<style lang="scss">
@import "~scss_vars";

.homePage {
  position: relative;
  height: 100%;
  .routePart {
    box-sizing: border-box;
    height: 100%;
    padding-top: $header-height;
  }
}
</style>
