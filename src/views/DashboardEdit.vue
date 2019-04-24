<template>
  <div class="dashbordEdit" :class="previewCls || dashboardSkin" v-loading="dashboardLoading">
    <allApps ref="allApps"></allApps>
    <div class="canvasPart">
      <dashboardHead ref="headRef"></dashboardHead>
      <dragCanvas></dragCanvas>
      <rightMenu></rightMenu>
    </div>
    <skinnable @hoverChange="hoverChange" @leaveChange="hoverChange"></skinnable>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import getOffsetDays from '@/assets/js/dashboard/timeDiffer';
import dragCanvas from '../components/dashboard/DragCanvas';
import allApps from '../components/dashboard/AllApps';
import dashboardHead from '../components/dashboard/Head';
import rightMenu from '../components/dashboard/RightMenu';
import skinnable from '../components/dashboard/Skinnable';

const actionInterval = 600000; // 每隔10分钟向后台请求数据
const timeInterval = 60000; // 每隔1分钟更新几分钟前更新

export default {
  components: {
    dragCanvas,
    allApps,
    dashboardHead,
    rightMenu,
    skinnable,
  },
  data() {
    return {
      interval: null, // 定时器对象
      updateTime: 0, // 上次请求后台时间
      previewCls: '',
    };
  },
  computed: {
    ...mapGetters(['editAble', 'dashboardLoading', 'rightList', 'requestData', 'dashboardSkin']),
  },
  async created() {
    await this.$store.dispatch('getDashboardList'); // 获取dashboard左右列表
    this.startInterval();
  },
  mounted() {
    // 计算dashboard展示区域的宽高
    this.calSize();
    window.addEventListener('resize', this.calSize);
  },
  watch: {
    rightList(val) {
      // 判断右侧列表的设备在responseData是否已存在数据
      const appList = [];
      val.forEach((v) => {
        appList.push(v.name);
      });
      const myApp = Object.keys(this.responseData || {});
      // console.log(myApp);
      appList.forEach((v) => {
        let flag = false;
        for (let i = 0; i < myApp.length; i += 1) {
          if (v === myApp[i]) {
            flag = true;
            break;
          }
        }
        if (!flag) {
          this.eachRequest(v);
        }
      });
    },
  },
  methods: {
    // 计算dashboard展示区域的宽高
    calSize() {
      const { clientHeight } = document.documentElement; // 展示区域的高度
      const space = clientHeight / 19; // 模块间的间隔
      const canvasHeight = clientHeight - this.$refs.headRef.$el.offsetHeight - space;
      this.$store.commit('SET_SIZE', {
        height: canvasHeight,
        width: (canvasHeight * 157) / 98,
        space,
      });
    },
    // 开启定时器
    startInterval() {
      const self = this;
      this.interval = setInterval(() => {
        if (new Date().getTime() - self.updateTime > actionInterval) {
          self.actionRequest();
        }
        self.updateMsg();
      }, timeInterval);
    },
    // 所有的action请求
    actionRequest() {
      this.updateTime = new Date().getTime();
      this.rightList.forEach((v) => {
        this.eachRequest(v.name);
      });
    },
    // 每个设备的请求
    eachRequest(name) {
      // action请求
      const appRequest = (fun, key) => {
        fun().then(({ data: { status, data } }) => {
          if (Number(status) === 1) {
            const responseData = {};
            responseData[key] = { data };
            this.$store.commit('ACTION_REQUEST', responseData);
          }
        });
      };
      switch (name) {
        case 'smoke':
          appRequest(window.vaApi.smokeWarnList, name);
          break;
        case 'cover':
          appRequest(window.vaApi.coverData, name);
          break;
        case 'environment':
          appRequest(window.vaApi.getDashboardBigEnv, name);
          break;
        case 'doorlock':
          appRequest(window.vaApi.getDashboardDoorLock, name);
          break;
        case 'dust':
          appRequest(window.vaApi.getDashboardDust, name);
          break;
        case 'common':
          appRequest(window.vaApi.getDashboardBigCom, name);
          break;
        case 'dustbin':
          appRequest(window.vaApi.getDustBin, name);
          break;
        default:
          break;
      }
    },
    // 更新几分钟前更新
    updateMsg() {
      const nowTime = new Date().getTime();
      this.rightList.forEach((v) => {
        if (this.requestData[v.name]) {
          this.requestData[v.name].lastTimeMsg = getOffsetDays(
            nowTime,
            this.requestData[v.name].updateTime,
          );
        }
      });
    },
    hoverChange(val) {
      this.previewCls = val;
    },
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.calSize);
    // 关闭定时器
    clearInterval(this.interval);
    this.interval = null;
  },
  // 离开dashboard确认保存数据
  beforeRouteLeave(to, from, next) {
    if (this.editAble) {
      this.$confirm('数据未保存，确定保存吗?', '提示', { type: 'warning' })
        .then(() => {
          this.$store.dispatch('dashboardSave');
          next();
        })
        .catch(() => {
          this.$store.commit('SET_EDIT_STATUS', false);
          next();
        });
    } else {
      next();
    }
  },
};
</script>

<style lang="scss">
@import '~@/assets/styles/scss/dashboardEdit/blueSkin.scss';
@import '~@/assets/styles/scss/dashboardEdit/purpleSkin.scss';
@import '~@/assets/styles/scss/dashboardEdit/blackSkin.scss';
@import '~@/assets/styles/scss/dashboardEdit/purpleBlackSkin.scss';

$minWidth: 720px;

.dashbordEdit {
  user-select: none;
  overflow: hidden;
  min-width: $minWidth;
  position: absolute;
  top: 0px;
  bottom: 0px;
  width: 100%;
  display: flex;
  background: url(../assets/images/dashboard/bg.png) center no-repeat;
  background-size: 100% 100%;
  /*画板  start*/
  .canvasPart {
    flex: 1;
  }
  /*画板  end*/
  .flip-list-move {
    transition: transform 0.5s;
  }

  .no-move {
    transition: transform 0s;
  }
}
</style>
