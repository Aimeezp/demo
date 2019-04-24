<template>
  <ul class="listState">
    <li v-for="(item,index) in cicleList" :key="index">
      <h2>{{item.monitoringPoint}}</h2>
      <div :class="item.num?'':'zero'">
        <span>{{item.num}}</span>次
      </div>
    </li>
  </ul>
</template>
<script>
export default {
  data() {
    return {
      cicleList: [],
      tableLoading: false,
    };
  },
  props: ['totalAll'],
  watch: {
    totalAll(val) {
      if (val) {
        this.getList();
      }
    },
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      if (this.totalAll) {
        this.tableLoading = true;
        window.vaApi.getHydrantList().then(({ data: { status, data } }) => {
          this.tableLoading = false;
          if (parseInt(status, 10) === 1) {
            if (this.totalAll > 6) {
              this.cicleList = data.slice(0, 6);
            } else {
              this.cicleList = data.slice(0, this.totalAll);
            }
          }
        });
      }
    },
  },
};
</script>

<style scoped lang="scss">
  .listState{
    box-sizing: border-box;
    padding-top:15px;padding-left:15px;
    li{
      margin:0 0 15px 0;display:inline-block;width:33.3%;text-align:center;
      h2{color:#4B5869;font-size:12px;width:78px;height:30px;line-height:30px;text-align:center;}
      div{
        width:58px;height:58px;line-height:58px;
        background:#4DA8F3;border-radius:50%;text-align:center;
        border:10px solid #A5D2F7;color:#fff;font-size:12px;
        span{font-size:22px;}
      }
      div.zero{
        background:#B6B9C4;
        border:10px solid #D9DBDF;
      }
    }
  }
</style>
