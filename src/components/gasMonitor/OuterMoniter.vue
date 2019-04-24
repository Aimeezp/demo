<template>
   <section class="outerMoniter">
     <div class="picture"><img src="../../assets/images/car/car2.png"></div>
     <p v-for="(item, index) in carOuterData" :key="index">{{item.key}}：<span :class="index === 5 && item.value === '未收费' ? 'warn' : ''">{{item.value}}</span></p>
   </section>
</template>

<script>
export default {
  data() {
    return {
      carOuterData: [
        {
          key: '离开时间',
          value: '2019-03-01 18:13:42',
        },
        {
          key: '车牌号码',
          value: '粤B D12345',
        },
        {
          key: '停车类型',
          value: '临时停车',
        },
        {
          key: '停车时长',
          value: '5小时30分',
        },
        {
          key: '停车计费',
          value: '30元',
        },
        {
          key: '收费状态',
          value: '未收费',
        },
      ],
    };
  },
};
</script>

<style lang="scss">
  .outerMoniter{
    padding:0 10px 10px 10px;
    background: #fff;
    .picture{
      img{
        width:100%;
      }
    }
    .warn{
      color: #F38715;
    }
  }
</style>
