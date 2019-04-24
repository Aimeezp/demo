<template>
    <section class="mapToolCls">
        <div class="directionChange toolBg">
            <div class="changeItem topItem" @click="$emit('direction', 'top')"></div>
            <div class="changeItem rightItem" @click="$emit('direction', 'right')"></div>
            <div class="changeItem bottomItem" @click="$emit('direction', 'bottom')"></div>
            <div class="changeItem leftItem" @click="$emit('direction', 'left')"></div>
        </div>
        <div class="zoomChange toolBg">
            <span @click="zoomChange(1)">+</span>
            <span @click="zoomChange(-1)">-</span>
        </div>
    </section>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  computed: { ...mapGetters(['mapLevel', 'dimensionalFlag']) },
  methods: {
    ...mapMutations(['SET_DIMENSIONAL_FLAG']),
    // 地图等级控制
    zoomChange(number) {
      if ((number > 0 && this.mapLevel === 3) || (number < 0 && this.mapLevel === 1)) return;
      this.$store.commit('SET_MAP_LEVEL', this.mapLevel + number);
      this.$emit('levelChange');
    },
  },
};
</script>


<style lang="scss" scoped>
.mapToolCls {
    position: absolute;
    left: 0;
    bottom: 0;
    padding: 0 0 20px 50px;
    display: flex;
    align-items: center;
    user-select: none;
    .toolBg {
        opacity: 0.76;
        background-image: linear-gradient(-180deg, #15335B 0%, #000000 99%);
        box-shadow: inset 0 1px 3px 0 rgba(255,255,255,0.50);
        cursor: pointer;
    }
    .dimensionalChange {
        width: 36px;
        height: 36px;
        line-height: 36px;
        border-radius: 50%;
        margin-right: 30px;
        font-size: 16px;
        color: #FFF;
        text-align: center;
    }
    .directionChange {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        margin-right: 30px;
        position: relative;
        .changeItem {
            position: absolute;
        }
        .topItem, .bottomItem {
            left: 50%;
            transform: translateX(-50%);
        }
        .topItem {
            top: 10px;
            border-bottom: 10px solid #fff;
            border-left: 11px solid transparent;
            border-right: 11px solid transparent;
        }
        .bottomItem {
            bottom: 10px;
            border-top: 10px solid #fff;
            border-left: 11px solid transparent;
            border-right: 11px solid transparent;
        }
        .leftItem, .rightItem {
            top: 50%;
            transform: translateY(-50%);
        }
        .leftItem {
            left: 10px;
            border-right: 10px solid #fff;
            border-top: 11px solid transparent;
            border-bottom: 11px solid transparent;
        }
        .rightItem {
            right: 10px;
            border-left: 10px solid #fff;
            border-top: 11px solid transparent;
            border-bottom: 11px solid transparent;
        }
    }
    .zoomChange {
        width: 30px;
        height: 100px;
        border-radius: 15px;
        > span {
            display: block;
            width: 100%;
            height: 50px;
            line-height: 50px;
            text-align: center;
            color: #FFF;
            font-size: 30px;
            font-weight: 900;
        }
    }
}
</style>
