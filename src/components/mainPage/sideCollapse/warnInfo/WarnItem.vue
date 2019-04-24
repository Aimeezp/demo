<template>
    <div class="warnItemCls">
        <h4 :title="title">{{title}}</h4>
        <div class="itemCircle" :class="{blueItem: number>0}">
          <span class="itemText">{{number}}</span>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    number: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style lang="scss">
.warnItemCls {
    text-align: center;
    > h4 {
        height: 50px;
        line-height: 50px;
        width: 80px;
        overflow: hidden;
    }
    .itemCircle {
        margin: 0 auto;
        width: 48px;
        height: 48px;
        line-height: 48px;
        border-radius: 50%;
        position: relative;
        background-color: #B6B9C4;
        &::before {
            content: '';
            position: absolute;
            left: -5px;
            top: -5px;
            width: 58px;
            height: 58px;
            border-radius: 50%;
            background-color: rgba($color: #B6B9C4, $alpha: 0.5);
        }
        &.blueItem {
            background-color: #4DA8F3;
            &::before {
                background-color: rgba($color: #4DA8F3, $alpha: 0.5);
            }
        }
        .itemText {
          position: relative;
          font-size: 22px;
          color: #FFFFFF;
        }
    }
}
</style>
