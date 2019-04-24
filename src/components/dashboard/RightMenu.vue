<template>
    <div id="rightMenu">
        <div class="container" @mouseleave="mouseleave">
            <div class="appCenter cursor" ref="centerRef" @click="$router.push('/main-page')">
                <i class="iconfont icon-yingyongfuwuzhengchang"></i>
                <p>首页</p>
            </div>
            <div class="appHide cursor" @mouseenter="mouseenter" ref="hideRef">
                <i class="iconfont icon-fanhui"></i>
            </div>
        </div>
    </div>
</template>

<script>
const width = 90;
const space = 38;

export default {
  name: 'rightMenu',
  methods: {
    mouseleave() {
      this.$refs.centerRef.style.right = `${-width}px`;
      this.$refs.hideRef.style.right = '0px';
    },
    mouseenter() {
      this.$refs.centerRef.style.right = `${space}px`;
      this.$refs.hideRef.style.right = `${-width / 2}px`;
    },
  },
};
</script>

<style lang="scss">
$width: 90px;
$space: 38px;
$bColor: rgba(19, 29, 62, 0.7);

#rightMenu {
  position: absolute;
  top: 50%;
  right: 0;
  overflow: hidden;
  .container {
    width: $width + $space;
    height: $width;
  }
  /*应用中心    start*/
  .appCenter {
    position: absolute;
    right: -$width;
    color: #fff;
    width: $width;
    height: $width;
    border-radius: 50%;
    background-color: $bColor;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    transition: right 1s;
    .iconfont {
      font-size: 30px;
    }
  }
  /*应用中心    end*/
  /*向左箭头    start*/
  .appHide {
    position: absolute;
    right: 0;
    width: $width / 2;
    height: $width;
    background-color: $bColor;
    border-radius: $width / 2 0 0 $width / 2;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    transition: right 1s;
    .iconfont {
      color: #fff;
      font-size: 30px;
    }
  }
  /*向左箭头    end*/
}
</style>
