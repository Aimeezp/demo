<template>
    <ul class="insideWindowCls">
        <li class="typeItem" v-for="(item, i) in typeList" :key="i">
          <img :src="item.src"/>
          <span class="itemText">{{item.text}}</span>
          <span class="totalCls">
            <b>在线：</b>
            <i>{{item.total-item.offline}}</i>
          </span>
          <span class="offlineCls">
            <b>离线：</b>
            <i>{{item.offline}}</i>
          </span>
          <span class="rateCls">
            <b>在线率：</b>
            <i>{{item.total>0?(((item.total-item.offline)*100/item.total).toFixed(2)):0}}%</i>
          </span>
        </li>
    </ul>
</template>

<script>
import { appMapping } from '@/assets/js/appMapping';

const appVal = Object.values(appMapping);

export default {
  props: {
    list: {
      type: Array,
      required: true,
    },
  },
  computed: {
    typeList() {
      const arr = [];
      this.list.forEach((v) => {
        const obj = arr.find(z => z.deviceType === v.deviceType);
        if (obj) {
          obj.total += 1;
          // 判断是否离线
          if (v.onlineState === 'lost') {
            obj.offline += 1;
          }
        } else {
          for (let i = 0; i < appVal.length; i += 1) {
            if (appVal[i].val === v.deviceType) {
              arr.push({
                deviceType: appVal[i].val,
                src: appVal[i].src,
                text: appVal[i].text,
                total: 1,
                offline: v.onlineState === 'lost' ? 1 : 0,
              });
              break;
            }
          }
        }
      });
      return arr;
    },
  },
};
</script>

<style lang="scss">
.insideWindowCls {
    background-color: rgba($color: #4DA8F3, $alpha: 0.78);
    border: 1px solid #4DA8F3;
    border-radius: 3px;
    position: absolute;
    left: 0;
    bottom: 60px;
    transform: translateX(-40%);
    font-size: 12px;
    color: #0B2E59;
    box-sizing: border-box;
    width: 330px;
    padding: 5px 15px 15px;
    line-height: normal;
    .typeItem {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 5px 0;
      > img {
        height: 30px;
        width: 30px;
      }
      .itemText {
        display: inline-block;
        width: 50px;
      }
      .totalCls, .offlineCls {
        margin-right: 5px;
      }
      .offlineCls>i {
        color: #EE8F29;
      }
    }
}
</style>
