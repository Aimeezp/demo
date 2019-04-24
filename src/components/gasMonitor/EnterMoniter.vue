<template>
   <section class="enterMoniter">
     <div class="picture"><img src="../../assets/images/car/car1.png"></div>
     <p v-for="(item, index) in interCar" :key="index">{{item.key}}：{{item.value}}</p>
   </section>
</template>

<script>
export default {
  data() {
    return {
      interCar: [
        {
          key: '进入时间',
          value: '2019-03-01 18:13:42',
        },
        {
          key: '车牌号码',
          value: '浙J I573Q',
        },
        {
          key: '停车类型',
          value: '临时停车',
        },
      ],
    };
  },
};
</script>

<style lang="scss">
  .enterMoniter{
    padding:0 10px 10px 10px;
    background: #fff;
    .picture{
      img{
        width:100%;
      }
    }

  }
</style>
