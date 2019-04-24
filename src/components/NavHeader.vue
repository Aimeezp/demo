<template>
  <section class="navHeaderCls">
    <img class="headerImg" src="@/assets/images/logo.png" @click="routeToMainPage">
    <div class="navPart">
      <router-link class="navItem" v-for="(item, i) in routerList" :to="item.to" :key="i">
        <span>{{item.text}}</span>
      </router-link>
    </div>
    <nowTime/>
  </section>
</template>

<script>
import nowTime from '@/components/navHeader/NowTime';

export default {
  data() {
    return {
      routerList: [
        { to: '/main-page', text: '首页' },
        { to: '/DashboardEdit', text: '数据' },
        { to: '/msg-manage', text: '消息' },
        { to: 'work-order-manage', text: '工单' },
        { to: '/device-manage', text: '设备' },
        { to: '/about-uniconnect', text: '关于联·城' },
      ],
    };
  },
  components: { nowTime },
  methods: {
    routeToMainPage() {
      const that = this;
      that.$store.commit('SET_DIMENSIONAL_FLAG', true);
      that.$router.push('/main-page');
    },
  },
};
</script>

<style lang="scss">
@import "~scss_vars";

.navHeaderCls {
  height: $header-height;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .headerImg {
    height: 38px;
    margin-left: 20px;
    cursor: pointer;
  }
  .navPart {
    font-size: 16px;
    .navItem {
      display: inline-block;
      height: $header-height;
      line-height: $header-height;
      margin-right: 30px;
      color: #292929;
      text-decoration: none;
      &.router-link-active {
        color: #333;
        > span {
          padding-bottom: 5px;
          border-bottom: 4px solid #4da8f3;
        }
      }
    }
  }
}
</style>
