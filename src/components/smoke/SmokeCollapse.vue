<template>
  <section class="deviceCollapseCls">
    <SmokeTable :totalSmoke="total" ref="smokeTab"></SmokeTable>
  </section>
</template>

<script>
import SmokeTable from './SmokeTable';

export default {
  components: { SmokeTable },
  props: ['total'],
};
</script>

<style lang="scss">
  .deviceCollapseCls{
    .el-collapse-item__header{
      padding:20px 10px;
      .title{
        display:flex;
        justify-content: center;
        align-items: center;
        img{
          width:50px;
          height:50px;
        }
        >span{
          margin-left: 20px;
          color:#4DA8F3;
        }
      }
      .info{
        text-align: right;
        width: 50%;
        color:#4DA8F3;
        font-size: 18px;
      }
      .alarm{
        color:#F35C4D;
      }
      .normal{
        color:#4DA8F3;
      }

    }
  }
</style>
