<template>
  <div :class="wrapClass">
    <div class="line"></div>
    <div class="pentagon"></div>
    <div class="main">
      <ul>
        <li v-for="(item, inx) in list" :key="inx">
          <img :src="appMapping[item.mapKey].src">
          <p>{{ item.value }}</p>
        </li>
      </ul>
      <div class="line1" v-if="showLine">
        <div class="line2">
          <div class="circle"></div>
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
<style lang="scss">
</style>
