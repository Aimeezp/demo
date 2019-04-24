<template>
  <div id="allApps">
    <div ref="dragglelist" class="dragglelistDiv">
      <draggable class="appList" element="div" v-model="list" :options="dragOptions">
        <transition-group type="transition" name="flip-list" tag="ul">
          <li v-for="(item, i) in list" :key="i" :class="item.name"></li>
        </transition-group>
      </draggable>
    </div>
    <div class="activeModify cursor" ref="overBlock" @mouseover="$refs.overBlock.style.opacity=1" @mouseout="$refs.overBlock.style.opacity = editAble ? 1 : 0.2" @click="animationFun()">
      <img ref="animationBtn" src="../../assets/images/dashboard/editButton.png" alt="编辑按钮">
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable';
import { mapGetters } from 'vuex';

export default {
  name: 'allApps',
  components: { draggable },
  watch: {
    editAble() {
      this.saveBtnAniFun();
    },
  },
  computed: {
    ...mapGetters(['editAble']),
    dragOptions() {
      return {
        animation: 200,
        group: 'dashboard',
        ghostClass: 'ghost',
      };
    },
    list: {
      get() {
        return this.$store.getters.leftList;
      },
      set(value) {
        this.$store.commit('UPDATE_LEFT_LIST', value);
      },
    },
  },
  mounted() {
    this.saveBtnAniFun();
  },
  methods: {
    // 点击按钮
    animationFun() {
      if (this.editAble) {
        this.$store.dispatch('dashboardSave');
      } else {
        this.$store.commit('SET_EDIT_STATUS', true);
      }
    },
    // 监听是否编辑属性
    saveBtnAniFun() {
      this.$refs.animationBtn.style.transform = `rotateZ(${
        this.editAble ? '-45deg' : '0deg'
      })`;
      this.$refs.dragglelist.style.top = this.editAble ? '0px' : '100%';
      this.$refs.overBlock.style.opacity = this.editAble ? 1 : 0.2;
    },
  },
};
</script>


<style lang="scss">
$width: 100px;
$appWidth: 66px;

#allApps {
  position: relative;
  width: $width;
  /*app列表  start*/
  .dragglelistDiv {
    width: $width;
    position: absolute;
    top: 100%;
    bottom: 0;
    left: 0;
    overflow: hidden;
    overflow-y: auto;
    background-color: rgba(19, 29, 62, 0.7);
    transition: top 0.5s;
    .appList {
      box-sizing: border-box;
      height: 100%;
      padding-bottom: $width;
      > ul {
        box-sizing: border-box;
        margin-bottom: 100px;
        padding-top: 20px;
        width: $width;
        min-height: 100%;
        display: flex;
        flex-direction: column-reverse;
        li {
          margin: 0 auto 30px;
          height: $appWidth;
          width: $appWidth;
        }
        @each $ele in "smoke", "cover", "environment", "common", 'doorlock', 'dust', 'dustbin' {
          .#{$ele} {
            background: url(~@/assets/images/app/#{$ele}.png);
            background-size: 100% 100%;
          }
        }
      }
    }
  }
  /*app列表  end*/

  /*编辑按钮  start*/
  .activeModify {
    height: $width;
    width: 100%;
    background-color: #32a2eb;
    opacity: 0.2;
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 99;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: opacity 1s;
    > img {
      transition: transform 0.5s;
      width: 50px;
      height: 50px;
    }
  }
  /*编辑按钮  end*/

  /*拖拽时影子元素样式  start*/
  .ghost {
    opacity: 0.5;
    height: $appWidth !important;
    width: $appWidth !important;
    overflow: hidden;
    border-radius: 50%;
    position: relative;
    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #aaa;
      z-index: 1;
    }
  }
  /*拖拽时影子元素样式  end*/
}
</style>
