<template>
  <div id="about-wrapper" v-loading>
    <navHeader class="aboutNavHeader"/>
    <component :is="currentView" v-show="!switchState"></component>
    <img class="semi-circle" :src="semiCircleImage">
    <div class="circle-nav">
      <ul>
        <li
          v-for="(item, inx) in navTextList"
          :key="inx"
          @click="changeState(inx)"
          :class="{cur: item.current}"
        >
          <i></i>
          <span>{{ item.text }}</span>
        </li>
      </ul>
    </div>
    <div class="content-box" v-for="(item, inx) in wrapBgList" :key="inx" v-show="item.show">
      <img :src="item.src">
    </div>
    <img :src="switchIcon" class="switch-box" @click="changeImgUrl">
    <div class="shadow-box icon-list" v-show="switchState">
      <ul class="clearfix">
        <li v-for="(item, inx) in appMapping" :key="inx">
          <img :src="item.src">
          <p>{{ item.text }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import navHeader from '@/components/NavHeader';
import Uniconnect from '@/components/about/Uniconnect';
import Hospital from '@/components/about/Hospital';
import Building from '@/components/about/Building';
import RaiseOld from '@/components/about/RaiseOld';
import Business from '@/components/about/Business';
import City from '@/components/about/City';
import Park from '@/components/about/Park';
import Campus from '@/components/about/Campus';
import Zone from '@/components/about/Zone';
import { appMapping } from '@/assets/js/appMapping';
import semiCircleImage from '@/assets/images/about/semiCircle.png';
import closeIcon from '@/assets/images/about/close.png';
import openIcon from '@/assets/images/about/open.png';
import wrapbg1 from '@/assets/images/about/wrapbg1.png';
import wrapbg2 from '@/assets/images/about/wrapbg2.png';
import wrapbg3 from '@/assets/images/about/wrapbg3.png';
import wrapbg4 from '@/assets/images/about/wrapbg4.png';
import wrapbg5 from '@/assets/images/about/wrapbg5.png';
import wrapbg6 from '@/assets/images/about/wrapbg6.png';
import wrapbg7 from '@/assets/images/about/wrapbg7.png';
import wrapbg8 from '@/assets/images/about/wrapbg8.png';
import wrapbg9 from '@/assets/images/about/wrapbg9.png';

export default {
  name: 'about',
  data() {
    return {
      appMapping,
      semiCircleImage,
      switchIcon: closeIcon,
      switchState: false,
      wrapBgList: [
        {
          src: wrapbg1,
          show: true,
        },
        {
          src: wrapbg2,
          show: false,
        },
        {
          src: wrapbg3,
          show: false,
        },
        {
          src: wrapbg4,
          show: false,
        },
        {
          src: wrapbg5,
          show: false,
        },
        {
          src: wrapbg6,
          show: false,
        },
        {
          src: wrapbg7,
          show: false,
        },
        {
          src: wrapbg8,
          show: false,
        },
        {
          src: wrapbg9,
          show: false,
        },
      ],
      navTextList: [
        {
          text: '关于联·城',
          current: true,
          componentPath: 'Uniconnect',
        },
        {
          text: '智慧医院',
          current: false,
          componentPath: 'Hospital',
        },
        {
          text: '智慧养老',
          current: false,
          componentPath: 'RaiseOld',
        },
        {
          text: '智慧楼宇',
          current: false,
          componentPath: 'Building',
        },
        {
          text: '智慧商业',
          current: false,
          componentPath: 'Business',
        },
        {
          text: '智慧城市',
          current: false,
          componentPath: 'City',
        },
        {
          text: '智慧停车',
          current: false,
          componentPath: 'Park',
        },
        {
          text: '智慧校园',
          current: false,
          componentPath: 'Campus',
        },
        {
          text: '智慧园区',
          current: false,
          componentPath: 'Zone',
        },
      ],
      currentView: 'Uniconnect',
    };
  },
  created() {},
  mounted() {},
  components: {
    Uniconnect,
    Hospital,
    Building,
    RaiseOld,
    Business,
    City,
    Park,
    Campus,
    Zone,
    navHeader,
  },
  methods: {
    changeState(inx) {
      for (let i = 0; i < this.navTextList.length; i += 1) {
        this.navTextList[i].current = i === inx;
        this.wrapBgList[i].show = i === inx;
        if (i === inx) {
          this.currentView = this.navTextList[i].componentPath;
        }
      }
    },
    changeImgUrl() {
      this.switchState = !this.switchState;
      this.switchIcon = this.switchState ? openIcon : closeIcon;
    },
  },
};
</script>
<style lang="scss" scoped>
@import "~scss_vars";
#about-wrapper {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 99999;
  .aboutNavHeader {
    position: absolute;
    z-index: 1111111111;
    background: rgba(255, 255, 255, 0.5);
  }
  .semi-circle {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 151px;
    z-index: 111;
  }
  .circle-nav {
    position: absolute;
    left: 151px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 11111111;
    ul li {
      height: 56px;
      line-height: 56px;
      margin-bottom: 12px;
      cursor: pointer;
      i {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: #fff;
        border-radius: 50%;
        margin-right: 15px;
      }
      span {
        color: #fff;
        font-size: 24px;
        display: inline-block;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
      }
      &.cur span {
        font-size: 40px;
      }
      &.cur i {
        vertical-align: calc(6px);
      }
      &:nth-child(2),
      &:nth-child(8) {
        margin-left: 10px;
      }
      &:nth-child(3),
      &:nth-child(7) {
        margin-left: 20px;
      }
      &:nth-child(4),
      &:nth-child(6) {
        margin-left: 30px;
      }
      &:nth-child(5) {
        margin-left: 40px;
      }
    }
  }
  .content-box {
    width: 100%;
    height: 100%;
    position: relative;
    img {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  .content-main {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 11111;
  }
  .shadow-box {
    background: rgba(0, 0, 0, 0.3);
  }
  .icon-list {
    width: 1220px;
    height: 580px;
    position: absolute;
    right: 27px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 111111;
    border-radius: 6px;
    box-sizing: border-box;
    padding: 67px 0 0 57px;
    ul li {
      float: left;
      text-align: center;
      margin: 0 10.4px 48px;
      img {
        width: 80px;
        height: 80px;
      }
      p {
        font-size: 16px;
        height: 16px;
        line-height: 16px;
        color: #fff;
        margin-top: 18px;
      }
    }
  }
  .switch-box {
    position: absolute;
    right: 21px;
    bottom: 12px;
    width: 80px;
    height: 80px;
    border-radius: 4px;
    cursor: pointer;
    text-align: center;
    line-height: 80px;
    z-index: 11111;
    img {
      width: 80px;
      height: 80px;
    }
  }
}
</style>
