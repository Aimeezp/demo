<template>
  <div class="dashboardHead">
    <img class='title' alt="标题" :style="{marginLeft:`${leftLength-marginLeft}px`}" ref="titleRef" src="~@/assets/images/dashboardLogo.png">
    <div class="btn-div" v-if="editAble">
      <el-button type="default" class="skipBtn" @click="bus.$emit('skinnableShow')">切换皮肤</el-button>
      <el-button class="border2px" type="primary" @click="saveData">保存</el-button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import bus from '@/utils/eventBus';

export default {
  name: 'dashboardHead',
  data() {
    return {
      marginLeft: 100,
      bus,
    };
  },
  computed: {
    ...mapGetters(['editAble', 'leftLength']),
  },
  watch: {
    leftLength(val) {
      this.$refs.titleRef.style.marginLeft = `${val - this.marginLeft}px`;
    },
  },
  methods: {
    saveData() {
      this.$store.dispatch('dashboardSave');
    },
  },
};
</script>


<style lang="scss">
.dashboardHead {
  height: 16vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  //primary按钮颜色
  .el-button--primary {
    background-color: #32a2eb!important;
    border-color: #32a2eb!important;
  }
  .el-button--primary:focus,
  .el-button--primary:hover {
    background-color: #32a2eb!important;
    border-color: #32a2eb!important;
  }
  .title {
    height: 70px;
  }
  .btn-div{
    width: 20%;
    margin-right: 8vw;
    .el-button {
      padding: 0;
      text-align: center;
      width: 44%;
      height: 2.6vw;
      font-size: 1.2vw;
      line-height: 0.6vw;
      /*margin-right: 175px;*/
      border-radius: 1.4vw;
    }
    .skipBtn{
      border: 2px solid #FFFFFF;
      background: none;
      color: #FFFFFF;
    }
    .border2px{
      border: 2px solid;
      font-size: 1.2vw;
    }
  }
}
</style>
