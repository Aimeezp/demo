<template>
    <div class="classifyTitleCls" @click="collapseOpen">
        <span class="titleCheckbox" @click.stop>
            <el-checkbox v-model="checked" />
        </span>
        <img class="titleImg" :src="titleData.src"/>
        <div class="titleContent">
            <p class="titleP">{{titleData.title}}</p>
            <p class="titleInfo">
                <span class="totalCls">
                    <b>在线：</b>
                    <i>{{titleData.total-titleData.offline}}</i>
                </span>
                <span class="offlineCls">
                    <b>离线：</b>
                    <i>{{titleData.offline}}</i>
                </span>
                <span class="rateCls">
                    <b>在线率：</b>
                    <i>{{titleData.total>0?(((titleData.total-titleData.offline)*100/titleData.total).toFixed(2)):0}}%</i>
                </span>
            </p>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import { appMapping } from '@/assets/js/appMapping';

export default {
  data() {
    return {
      titleData: {
        src: '', title: '', total: 0, offline: 0,
      },
    };
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters(['mapLevel', 'sideDevice']),
    checked: {
      get() {
        return this.sideDevice.includes(this.data.type);
      },
      set(v) {
        const arr = [...this.sideDevice];
        const { type } = this.data;
        if (v && !arr.includes(type)) {
          arr.push(type);
          this.SET_SIDE_DEVICE(arr);
        } else if (!v && arr.includes(type)) {
          arr.splice(arr.indexOf(type), 1);
          this.SET_SIDE_DEVICE(arr);
        }
      },
    },
  },
  watch: {
    data: {
      handler() {
        this.titleData.total = this.data.total || 0;
        this.titleData.offline = this.data.offline || 0;
      },
      deep: true,
      immediate: true,
    },
  },
  created() {
    this.titleData.src = appMapping[this.data.type].src;
    this.titleData.title = this.data.title;
  },
  methods: {
    ...mapMutations(['SET_SIDE_DEVICE']),
    // 阻止侧栏展开
    collapseOpen(e) {
      if (!this.data.install || this.mapLevel < 3 || !this.checked) e.stopPropagation();
    },
  },
};
</script>

<style lang="scss">
.classifyTitleCls {
    position: relative;
    z-index: 1;
    width: 100%;
    display: flex;
    padding: 15px;
    color: #0B2E59;
    .titleCheckbox {
        margin-right: 10px;
        display: flex;
        align-items: center;
    }
    .titleImg {
        height: 40px;
        margin-right: 10px;
    }
    .titleContent {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .titleP {
            font-size: 14px;
        }
        .titleInfo {
            font-size: 12px;
            .totalCls, .offlineCls {
                margin-right: 10px;
            }
            .totalCls>i {
                color: #419BF9;
            }
            .offlineCls>i {
                color: #EE8F29;
            }
            .rateCls>i {
                color: #58CF8F;
            }
        }
    }
}
</style>
