<template>
    <div class="skinDialog" v-show="isSelSkipFlag">
        <div class="sel-skip-div">
            <div class="closeIcon cursor" @click="isSelSkipFlag = false">
                <i class="iconfont icon-guanbi"></i>
            </div>
            <div class="sel-skip-list-div">
                <div class="cursor" v-for="(item, index) in skipList" :key="index" @click="skinChange(item.value)" @mouseenter="hoverChange(item.value)" @mouseleave="leaveChange">
                    <div class="top-pic" :class="[item.cls, dashboardSkin===item.value?'skinSelect':'']"></div>
                    <div class="btm-text">{{item.text}}</div>
                </div>
            </div>
        </div>
        <div class="skinModal"></div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import bus from '@/utils/eventBus';

export default {
  data() {
    return {
      isSelSkipFlag: false,
      skipList: [
        {
          cls: 'defalutSkin',
          text: '默认皮肤',
          value: 'defalutCls',
        },
        {
          cls: 'blackSkin',
          text: '商业酷黑',
          value: 'blackCls',
        },
        {
          cls: 'deepPurpleSkin',
          text: '神秘绛红',
          value: 'purpleBlackCls',
        },
        {
          cls: 'purpleSkin',
          text: '时尚炫紫',
          value: 'purpleCls',
        },
        {
          cls: 'blueSkin',
          text: '科技深蓝',
          value: 'blueCls',
        },
      ],
    };
  },
  computed: {
    ...mapGetters(['dashboardSkin']),
  },
  created() {
    bus.$on('skinnableShow', () => {
      this.isSelSkipFlag = true;
    });
  },
  methods: {
    skinChange(val) {
      this.$store.commit('SET_DASHBOARD_SKIN', val);
      this.isSelSkipFlag = false;
    },
    // preview function
    hoverChange(val) {
      this.$emit('hoverChange', val);
    },
    // preview function
    leaveChange() {
      this.$emit('leaveChange', '');
    },
  },
};
</script>

<style lang="scss">
$minWidth: 720px;
$btmText: #fff;

.skinDialog {
  .sel-skip-div {
    z-index: 101;
    width: 60%;
    height: 200px;
    background-color: rgba($color: #000, $alpha: 0.76);
    border-radius: 8px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-sizing: border-box;
    padding: 0 75px;
    min-width: $minWidth;
    .closeIcon {
      position: absolute;
      right: 16px;
      top: 16px;
      color: $btmText;
    }
    .sel-skip-list-div {
      display: flex;
      justify-content: space-between;
      height: 100%;
      align-items: center;
      .top-pic {
        margin: 0 auto;
        width: 66px;
        height: 66px;
        border: 2px solid #b5b5b5;
        border-radius: 8px;
        margin-bottom: 12px;
        &:hover,
        &.skinSelect {
          border-color: #32a2eb;
        }
      }
      @each $cls in (defalutSkin blackSkin deepPurpleSkin purpleSkin blueSkin) {
        .#{$cls} {
          background: url(~@/assets/images/dashboard/skinIcon/#{$cls}.png)
            no-repeat
            center;
          background-size: 100% 100%;
        }
      }
      .btm-text {
        text-align: center;
        font-size: 24px;
        color: $btmText;
      }
    }
  }
  .skinModal {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
  }
}
</style>
