<template>
    <section class="threeDimensionalCls" >
        <div class="tagList" v-for="(item, index) in dataList" :key="index" @click="enterMap" ref="tag">
            <span>{{item.name}}</span>
        </div>
        <div v-for="(item, index) in lineList" :key="index + '-label'" class="whiteLine" :style="{left:item.left+'px',top:item.top+'px',transform:'rotate('+item.rotate+'deg)',transformOrigin:'left center',width:item.width+'px'}">

        </div>

    </section>
</template>

<script>
export default {
  data() {
    return {
      lineList: [],
      link: [
        {
          start: 0,
          end: 1,
        }, {
          start: 6,
          end: 0,
        }, {
          start: 6,
          end: 4,
        }, {
          start: 0,
          end: 3,
        }, {
          start: 0,
          end: 4,
        }, {
          start: 4,
          end: 10,
        }, {
          start: 6,
          end: 10,
        }, {
          start: 3,
          end: 1,
        }, {
          start: 4,
          end: 3,
        }, {
          start: 4,
          end: 5,
        }, {
          start: 10,
          end: 5,
        }, {
          start: 10,
          end: 7,
        }, {
          start: 5,
          end: 2,
        }, {
          start: 5,
          end: 7,
        }, {
          start: 5,
          end: 3,
        }, {
          start: 3,
          end: 2,
        }, {
          start: 1,
          end: 2,
        }, {
          start: 1,
          end: 8,
        }, {
          start: 1,
          end: 11,
        }, {
          start: 1,
          end: 13,
        }, {
          start: 7,
          end: 2,
        }, {
          start: 2,
          end: 8,
        }, {
          start: 7,
          end: 8,
        }, {
          start: 10,
          end: 9,
        }, {
          start: 7,
          end: 9,
        }, {
          start: 9,
          end: 8,
        }, {
          start: 9,
          end: 12,
        }, {
          start: 8,
          end: 11,
        }, {
          start: 8,
          end: 12,
        }, {
          start: 11,
          end: 12,
        }, {
          start: 11,
          end: 13,
        }, {
          start: 12,
          end: 13,
        },
      ],
      dataList: [
        {
          name: '环境监测',
        }, {
          name: '智能楼宇',
        }, {
          name: '智慧生活',
        }, {
          name: '智慧商业',
        }, {
          name: '智慧旅游',
        }, {
          name: '智慧管网',
        }, {
          name: '河道治理',
        }, {
          name: '智慧社区',
        }, {
          name: '智慧医院',
        }, {
          name: '智慧园区',
        }, {
          name: '健康养老',
        }, {
          name: '智慧物流',
        }, {
          name: '智能站牌',
        }, {
          name: '智能泊车',
        },
      ],
    };
  },
  created() {
    const that = this;
    for (let i = 0; i < 32; i += 1) {
      that.lineList.push({
        width: 0,
        left: 0,
        top: 0,
        rotate: 0,
      });
    }
  },
  mounted() {
    const that = this;
    const linkArr = that.link;
    window.addEventListener('resize', () => {
      if (document.body.clientWidth >= 1150) {
        for (let i = 0; i < linkArr.length; i += 1) {
          that.changeLine(i);
        }
      }
    });
    for (let i = 0; i < linkArr.length; i += 1) {
      that.changeLine(i);
    }
  },
  methods: {
    enterMap() {
      const that = this;
      that.$store.commit('SET_DIMENSIONAL_FLAG', false);
    },
    changeLine(index) {
      const tagStart = this.$refs.tag[this.link[index].start].getBoundingClientRect();
      const tagEnd = this.$refs.tag[this.link[index].end].getBoundingClientRect();
      if (index === 1) { // 上左
        this.getAngle(index, tagStart.left + tagStart.width / 2, tagStart.top, tagEnd.left, tagEnd.top + tagEnd.height / 2);
        this.lineList[index].left = tagStart.left + tagStart.width / 2;
        this.lineList[index].top = tagStart.top - 60;
      } else if ([0, 2, 8, 9, 12, 13, 15, 21, 22, 23, 27, 31, 10, 7].includes(index)) { // 左右
        this.getAngle(index, tagStart.right, tagStart.top + tagStart.height / 2, tagEnd.left, tagEnd.top + tagEnd.height / 2);
        this.lineList[index].left = tagStart.right;
        this.lineList[index].top = tagStart.top + tagStart.height / 2 - 60;
      } else if ([3, 6, 28].includes(index)) { // 下左
        this.getAngle(index, tagStart.left + tagStart.width / 2, tagStart.top + tagStart.height, tagEnd.left, tagEnd.top + tagEnd.height / 2);
        this.lineList[index].left = tagStart.left + tagStart.width / 2;
        this.lineList[index].top = tagStart.top + tagStart.height - 60;
      } else if ([4, 5, 16, 17, 24].includes(index)) { // 上下
        this.getAngle(index, tagStart.left + tagStart.width / 2, tagStart.top + tagStart.height, tagEnd.left + tagStart.width / 2, tagEnd.top);
        this.lineList[index].left = tagStart.left + tagStart.width / 2;
        this.lineList[index].top = tagStart.top + tagStart.height - 60;
      } else if ([11, 26].includes(index)) { // 下右
        this.getAngle(index, tagStart.left + tagStart.width, tagStart.top + tagStart.height / 2, tagEnd.left + tagEnd.width / 2, tagEnd.top + tagEnd.height);
        this.lineList[index].left = tagStart.left + tagStart.width;
        this.lineList[index].top = tagStart.top + tagStart.height / 2 - 60;
      } else if ([18].includes(index)) {
        this.getAngle(index, tagStart.left + tagStart.width, tagStart.top + tagStart.height / 2, tagEnd.left + tagEnd.width / 2, tagEnd.top);
        this.lineList[index].left = tagStart.left + tagStart.width;
        this.lineList[index].top = tagStart.top + tagStart.height / 2 - 60;
      } else if (index === 20) {
        this.getAngle(index, tagStart.left + tagStart.width / 2, tagStart.top, tagEnd.left + tagEnd.width / 2, tagEnd.top + tagEnd.height);
        this.lineList[index].left = tagStart.left + tagStart.width / 2;
        this.lineList[index].top = tagStart.top - 60;
      } else if (index === 25 || index === 31) {
        this.getAngle(index, tagStart.left + tagStart.width / 2, tagStart.top, tagEnd.left + tagEnd.width / 2, tagEnd.top + tagEnd.height);
        this.lineList[index].left = tagStart.left + tagStart.width / 2;
        this.lineList[index].top = tagStart.top - 60;
      } else if (index === 29) {
        this.getAngle(index, tagStart.left + tagStart.width / 2, tagStart.top + tagStart.height, tagEnd.left + tagEnd.width / 2, tagEnd.top);
        this.lineList[index].left = tagStart.left + tagStart.width / 2;
        this.lineList[index].top = tagStart.top + tagStart.height - 60;
      } else if (index === 30) {
        this.getAngle(index, tagStart.left + tagStart.width, tagStart.top + tagStart.height / 2, tagEnd.left, tagEnd.top + tagEnd.height / 2);
        this.lineList[index].left = tagStart.left + tagStart.width;
        this.lineList[index].top = tagStart.top + tagStart.height / 2 - 60;
      }
    },
    getEleClient() {
      const tag0 = this.$refs.tag[0].getBoundingClientRect();
      const tag1 = this.$refs.tag[1].getBoundingClientRect();
      this.lineList[0].left = tag0.right;
      this.lineList[0].top = tag0.top + tag0.height / 2 - 60;
      this.getAngle(0, tag0.right, tag0.top + tag0.height / 2, tag1.left, tag1.top + tag1.height / 2);
    },
    getAngle(index, x1, y1, x2, y2) {
      const x = Math.abs(x1 - x2);
      const y = Math.abs(y1 - y2);
      const z = Math.sqrt(x * x + y * y);
      let asin = Math.round((Math.asin(y / z) / Math.PI * 180));
      this.lineList[index].width = z;
      if (y1 > y2) {
        asin = (-asin);
      }
      this.lineList[index].rotate = asin;
    },
  },
};
</script>

<style lang="scss" scoped>
.threeDimensionalCls {
    height: 100%;
    background: url(~@/assets/images/map/threeDimensionalBg.png) no-repeat center;
    background-size: 100% 100%;
    position: relative;
    min-width: 1200px;
    .whiteLine{
      background-color: white;
      width: 100px;
      height: 1.3px;
      overflow: hidden;
      position: absolute;
      cursor: pointer;
    }
    .whiteLine:hover{
      height: 3px;
      box-shadow:0px 0px 2px white;
    }
    .tagList{
        cursor: pointer;
        font-family: 'PingFangSC-Regular', 'PingFang SC';
        // width: 100px;
        // height: 93px;
        width: 80px;
        height: 74px;
        overflow: hidden;
        background: url(~@/assets/images/map/u49.png) no-repeat center;
        // background-size: 100% 100%;
        background-size: 93px 87px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 13px;
        position: absolute;
        border-radius: 20px;
        z-index: 10;
    }
    .tagList:hover{
        background: url(~@/assets/images/map/u49_mouseover.png) no-repeat center;
        font-weight: bolder;
    }
    .tagList:nth-child(1){
        // 环境监测
        left: 17.5%;
        top: 5%;
    }
    .tagList:nth-child(2){
        // 智能楼宇
        right: 37.5%;
        top: 4%;
    }
    .tagList:nth-child(3){
        // 智慧生活
        right: 37.5%;
        top: 28%;
    }
    .tagList:nth-child(4){
        // 智慧商业
        left: 37%;
        top: 23%;
    }
    .tagList:nth-child(5){
        // 智慧旅游
        left: 21%;
        top: 38%;
    }
    .tagList:nth-child(6){
        // 智能管网
        left: 34%;
        top: 41%;
    }
    .tagList:nth-child(7){
        // 河道治理
        left: 5%;
        top: 55%;
    }
    .tagList:nth-child(8){
        // 智慧社区
        left: 49%;
        top: 46%;
    }
    .tagList:nth-child(9){
        // 智慧医院
        right: 25%;
        top: 36%;
    }
    .tagList:nth-child(10){
        // 智慧园区
        right: 31%;
        bottom: 10%;
    }
    .tagList:nth-child(11){
        // 健康养老
        left: 25%;
        bottom: 5%;
    }
    .tagList:nth-child(12){
        // 智慧物流
        right: 15%;
        top: 33%;
    }
    .tagList:nth-child(13){
        // 智能站牌
        right: 12%;
        top: 50%;
    }
    .tagList:nth-child(14){
        // 智能泊车
        right: 5%;
        top: 28%;
    }
}
</style>
