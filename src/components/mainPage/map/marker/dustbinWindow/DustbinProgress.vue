<template>
    <div class="dustbinProgressCls">
        <div class="progressItem" :class="{warnItem:progress<66&&progress>33,alarmItem:progress>=66}" :style="{height: `${progress}%`}"></div>
    </div>
</template>

<script>
export default {
  props: {
    progress: {
      required: true,
    },
  },
};
</script>


<style lang="scss">
.dustbinProgressCls {
    margin: 0 4px;
    height: 80px;
    width: 15px;
    background: rgba(255,255,255,0.76);
    border-radius: 100px 100px 0 0;
    position: relative;
    overflow: hidden;
    .progressItem {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      background-color: #00BF4D;
      &.warnItem{
        background-color: #F38715;
      }
      &.alarmItem{
        background-color: #F35C4D;
      }
    }
}
</style>
