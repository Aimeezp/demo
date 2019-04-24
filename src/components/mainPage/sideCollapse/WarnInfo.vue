<template>
    <section class="warnInfoCls" @click.stop>
        <h3 class="warnTitle">告警信息</h3>
        <div class="warnContent clearfix">
            <warnItem v-for="(item, i) in list" :title="item.title" :number="item.number" :key="i"/>
        </div>
    </section>
</template>

<script>
import warnItem from './warnInfo/WarnItem';

export default {
  props: {
    list: {
      type: Array,
      required: true,
    },
  },
  components: { warnItem },
};
</script>


<style lang="scss" scoped>
.warnInfoCls {
    font-size: 12px;
    color: #4B5869;
    .warnTitle {
        background-color: #EEEFF3;
        height: 30px;
        line-height: 30px;
        padding-left: 10px;
    }
    .warnContent {
        padding: 10px 20px 20px;
        display: flex;
        justify-content: space-between;
    }
}
</style>
