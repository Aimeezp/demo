<template>
    <div class="carCAD" v-if="carCADisShow">
      <div class="backBtn" @click="SET_CARCAD_FLAG(!carCADisShow)"> &lt; &nbsp;&nbsp;返回</div>
      <img src="../../assets/images/car/carCAD.png" alt="">
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  data() {
    return {
    };
  },
  computed: { ...mapGetters(['carCADisShow']) },
  methods: {
    ...mapMutations(['SET_CARCAD_FLAG']),
  },
};
</script>

<style lang="scss">
  .carCAD{
    padding-top: 60px;
    z-index: 99;
    position: fixed;
    bottom: 0;
    top: 0;
    left:0;
    right: 400px;
    .backBtn {
      position:absolute;
      top:10%;
      left:6%;
      cursor: pointer;
      font-size: 20px;
      background-color: rgba($color: #fff, $alpha: 0.8);
      padding:10px 20px;
      border-radius: 10px;
    }
    img{
      width:100%;
      height:100%;
    }
  }
</style>
