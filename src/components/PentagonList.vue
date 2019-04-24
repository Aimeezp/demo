<template>
  <div :class="wrapClass">
    <div class="line"></div>
    <div class="pentagon"></div>
    <div class="main">
      <ul class="fideInOnce">
        <li v-for="(item, inx) in list" :key="inx">
          <img :src="appMapping[item.mapKey].src">
          <p>{{ item.value }}</p>
        </li>
      </ul>
      <div class="line1" v-if="showLine" ref="lineOne">
        <div class="line2" ref="lineTwo">
          <div class="circle bling"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { appMapping } from '@/assets/js/appMapping';

export default {
  name: 'Pentagon',
  data() {
    return {
      appMapping,
      defaultClass: 'pentagon-wrap',
    };
  },
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    className: {
      type: String,
      default: '',
    },
    showLine: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    wrapClass() {
      return `${this.defaultClass} ${this.className}`;
    },
  },
};
</script>
<style lang="scss" scoped>
.bling{
animation: blingClass 1s linear infinite alternate;
}
@keyframes blingClass {
  form{
    transform: scale(1);
  };
  to{
    transform: scale(1.1);
  }
}
.fideInOnce{
  animation: fideInOnce 1s ease-in ;
}
@keyframes fideInOnce {
  from{
    opacity: 0;
    scale: 0;
  };
  to{
    opacity: 1;
    scale: 1;
  }
}
</style>
