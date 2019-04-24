<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import ws from '@/assets/js/websocket';
import alarmData from './assets/js/alarmData';

export default {
  mixins: [ws(), alarmData()],
};
</script>

<style lang="scss">
@import "~scss_vars";

body {
  margin: 0;
  padding: 0;
  -webkit-font-smoothing: antialiased;
  font-family: $font-family;
  color: $font-color;
  font-size: $font-size;
}

#app {
  position: absolute;
  top: 0;
  left:0;
  width: 100%;
  height: 100%;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}

//清楚浮动
.clearfix:after {
  clear: both;
  display: block;
  content: "";
}

//去除默认样式
dl,
dd,
ul,
p {
  margin: 0;
}

@for $i from 1 to 6 {
  h#{$i} {
    margin: 0;
    font-weight: normal;
  }
}

ul {
  list-style: none;
  padding: 0;
}

b {
  font-weight: normal;
}

i {
  font-style: normal;
}

.cursor {
  cursor: pointer;
}
</style>
