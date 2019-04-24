<template>
    <div class="dustbinWindowCls" ref="dustbinWindowRef" :style="{left: `${left}px`}" v-show="showFlag">
        <dustbinProgress v-for="(item, i) in list" :progress="item.progress" :key="i"/>
    </div>
</template>

<script>
import dustbinProgress from './dustbinWindow/DustbinProgress';

export default {
  data() {
    return {
      left: 0,
    };
  },
  props: {
    list: {
      type: Array,
      required: true,
    },
    showFlag: {
      type: Boolean,
      required: true,
    },
  },
  watch: {
    showFlag(v) {
      if (v) {
        this.$nextTick(() => {
          const width = this.$refs.dustbinWindowRef.offsetWidth;
          this.left = -(width / 2 - 22);
        });
      }
    },
  },
  components: { dustbinProgress },
};
</script>

<style lang="scss">
.dustbinWindowCls {
    position: absolute;
    bottom: 60px;
    background: rgba(77,168,243,0.20);
    border: 1px solid #4DA8F3;
    border-radius: 3px;
    padding: 15px 32px;
    line-height: normal;
    display: flex;
}
</style>
