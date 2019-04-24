<template>
  <div class="drageCls" @mousemove="mouseMove" @mouseup="moveReset" @mouseleave="moveReset">
    <draggable element="div" v-model="list" :options="dragOptions">
      <transition-group name="no" class="canvas" tag="ul" ref="canvasRef" :style="{width:`${canvasWidth}px`,height:`${canvasHeight}px`}">
        <li v-for="(item, i) in list" :key="i" :class="liClass(i,item)" ref="partRef" :style="liStyle(i,item.size)">
          <div v-show="editAble && item.name!=='common'" :class="getSide(i)?'leftLine':'rightLine'" @mousedown="mousedown(i)" @mouseenter="lineEnter" @mouseleave="lineLeave"></div>
          <div style="overflow:hidden;">
            <div :style="moduleStyle(item.size)" :class="item.size==='small'?'smallBg':'bigBg'">
              <child :childName="item.name" :size="item.size"></child>
            </div>
          </div>
        </li>
      </transition-group>
    </draggable>
  </div>
</template>

<script>
import 'velocity-animate';
import draggable from 'vuedraggable';
import { mapGetters } from 'vuex';
import child from './ChildComponent';

export default {
  name: 'drageCanvas',
  data() {
    return {
      partIndex: 0, // 拖拽对象的index
      dragFlag: false, // 是否开始拖拽
      leftDrag: true, // 是否拖拉左边
    };
  },
  components: {
    draggable,
    child,
  },
  mounted() {
    this.getOffsetLeft();
    window.addEventListener('resize', this.getOffsetLeft);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.getOffsetLeft);
  },
  computed: {
    ...mapGetters([
      'rightEnable',
      'cpHeight',
      'cpWidth',
      'canvasWidth',
      'canvasHeight',
      'leftList',
      'rightList',
      'editAble',
      'leftLength',
      'space',
    ]),
    dragOptions() {
      return {
        animation: 200,
        group: 'dashboard',
        ghostClass: 'ghost',
        disabled: !this.rightEnable,
      };
    },
    // 右边的数组
    list: {
      get() {
        return this.rightList;
      },
      set(value) {
        this.$store.commit('UPDATE_RIGHT_LIST', value);
      },
    },
    // 左边的数组
    appList: {
      get() {
        return this.leftList;
      },
      set(value) {
        this.$store.commit('UPDATE_LEFT_LIST', value);
      },
    },
  },
  methods: {
    // 开始拖拉
    mousedown(index) {
      this.partIndex = parseInt(index, 10); // 设置拖拽对象的index
      this.dragFlag = true;
      this.leftDrag = this.getSide(index);// 是否拖拉左边
    },
    // 拖拉进行中
    mouseMove(e) {
      const mutateSize = (width, index) => {
        if (width < this.cpWidth + this.space) {
          this.list[index].size = 'small';
        } else {
          this.list[index].size = 'big';
        }
      };
      if (this.dragFlag) {
        // 拖拽左侧
        let margin = 0;
        let index = this.partIndex;
        if (!this.leftDrag) {
          // 拖拽右侧
          margin = this.space;
          index -= 1;
        }
        let width = e.pageX - this.leftLength - margin;
        // 拖拽时切换大小模块
        mutateSize(width, index);
        if (this.leftDrag) {
          // 限制宽度范围为小模块和大模块之间
          if (width < this.cpWidth) {
            width = this.cpWidth;
          } else if (width > this.canvasWidth) {
            width = this.canvasWidth;
          }
        } else {
          let rightWidth = this.canvasWidth - width - margin - 7;
          rightWidth = rightWidth < this.cpWidth ? this.cpWidth : rightWidth;
          mutateSize(rightWidth, index + 1);
          this.$refs.partRef[index + 1].style.width = `${rightWidth}px`;
        }
        this.$refs.partRef[index].style.width = `${width}px`;
      }
    },
    // 拖拉终止后执行
    moveReset() {
      const rightListCopy = [...this.list];
      let leftListCopy = [...this.appList];
      const mutateWidth = index => new Promise((resolve) => {
        const ele = this.$refs.partRef[index];
        const width = ele.offsetWidth;
        if (width < this.cpWidth / 2) {
          // 小模块
          // 删除该模块，放到左边的list中
          const { size } = rightListCopy[index];
          window.Velocity(ele, { width: '1px' }, () => {
            leftListCopy = [
              ...leftListCopy,
              ...rightListCopy.splice(index, 1),
            ];
            if (size === 'small') {
              ele.style.width = `${this.cpWidth}px`;
            } else {
              ele.style.width = `${this.canvasWidth}px`;
            }
            resolve();
          });
        } else if (width < this.cpWidth + this.space) {
          // 小模块
          window.Velocity(ele, { width: this.cpWidth });
          rightListCopy[index].size = 'small';
          resolve();
        } else {
          // 大模块
          window.Velocity(ele, { width: this.canvasWidth });
          rightListCopy[index].size = 'big';
          resolve();
        }
      });
      if (this.dragFlag) {
        const promiseArr = [];
        // 拖拽左侧
        if (this.leftDrag) {
          promiseArr.push(mutateWidth(this.partIndex));
        } else {
          promiseArr.push(mutateWidth(this.partIndex));
          promiseArr.push(mutateWidth(this.partIndex - 1));
        }
        Promise.all(promiseArr).then(() => {
          this.appList = leftListCopy;
          this.list = rightListCopy;
        });
        this.dragFlag = false;
      }
    },
    // 判断模块是在左边还是右边 true左边，false右边
    getSide(index) {
      let flag = false; // 默认右边
      switch (parseInt(index, 10)) {
        case 0:
          flag = true;
          break;
        case 1: {
          const { size } = this.list[0];
          const { size: mysize } = this.list[index];
          if (size !== 'small' || mysize === 'big') {
            flag = true;
          }
          break;
        }
        case 2: {
          const { size } = this.list[0];
          if (size === 'small') {
            flag = true;
          }
          break;
        }
        case 3: {
          flag = false;
          break;
        }
        default:
      }
      return flag;
    },
    // 判断模块是在上面还是下面 true上面，false下面
    getTop(index) {
      let flag = false;
      switch (index) {
        case 0:
          flag = true;
          break;
        case 1: {
          const { size } = this.list[0];
          if (size === 'small') {
            flag = true;
          }
          break;
        }
        default:
      }
      return flag;
    },
    // 进入线范围禁用拖拽
    lineEnter() {
      this.$store.commit('SET_RIGHT_ENABLE', false);
    },
    // 离开线范围启用拖拽
    lineLeave() {
      this.$store.commit('SET_RIGHT_ENABLE', true);
    },
    // 获取大小模块的Class
    liClass(index) {
      const classArr = [];
      // 判断左右
      if (this.getSide(index)) {
        classArr.push('leftPart');
      } else {
        classArr.push('rightPart');
      }
      // 判断是否显示边框
      if (this.editAble) {
        classArr.push('borderShow');
      }
      return classArr.join(' ');
    },
    // 大小模块的样式
    liStyle(index, size) {
      const styleObj = this.moduleStyle(size);
      styleObj.marginRight = this.getSide(index) && size === 'small' ? `${this.space}px` : '';
      styleObj.marginBottom = this.getTop(index) ? `${this.space}px` : '';
      return styleObj;
    },
    // 大小模块的宽高
    moduleStyle(size) {
      return {
        height: `${this.cpHeight}px`,
        width: size === 'small' ? `${this.cpWidth}px` : `${this.canvasWidth}px`,
      };
    },
    // 计算画板距离左侧的距离
    getOffsetLeft() {
      const self = this;
      setTimeout(() => {
        self.$store.commit(
          'SET_LEFT_LENGTH',
          self.$refs.canvasRef.$el.offsetLeft,
        );
      }, 0);
    },
  },
};
</script>

<style lang="scss">
$borderColor: #32a2eb;
$hoverTitle: #6bdef5;
/*加小手*/
.add-pointer {
  cursor: pointer;
}
.drageCls {
  margin-left: -100px;
  .canvas {
    margin: auto;
    /*框  start*/
    .leftPart,
    .rightPart {
      border-radius: 5px;
      position: relative;
      float: left;
    }
    @each $ele in "smallBg", "bigBg" {
      .#{$ele} {
        background: url(../../assets/images/dashboard/#{$ele}.png);
        background-size: 100% 100%;
      }
    }
    .borderShow:hover {
      border: 3px solid $borderColor;
    }
    /*框  end*/
    /*线  start*/
    .leftLine,
    .rightLine {
      cursor: col-resize;
      position: absolute;
      width: 7px;
      right: -4px;
      top: 0;
      height: 100%;
      z-index: 1;
    }
    .rightLine {
      left: -5px;
    }
    /*线  end*/

    /*拖拽时影子元素样式  start*/
    .ghost {
      opacity: 0.5;
      width: 47%;
      height: 47%;
      float: left;
      background: url(../../assets/images/dashboard/smallBg.png);
      background-size: 100% 100%;
    }
    /*拖拽时影子元素样式  end*/
  }
}
</style>
