<template>
    <div class="position">
      <el-dialog
        title="定位"
        :visible.sync="positionVisible"
        :close-on-click-modal="false"
        width="40%"
        center>
       <div>
         <baidu-map class="bm-view" :center="center" :zoom="zoom" :dragging="false">
           <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
           <bm-marker :position="center">
           </bm-marker>
         </baidu-map>
       </div>
        <p>详细地址：{{address || '暂无数据'}}</p>
        <p>经纬度：{{lng || '暂无数据'}}, {{lat || '暂无数据'}}</p>
        <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="positionVisible = false">确 定</el-button>
        </span>
      </el-dialog>
    </div>
</template>

<script>
export default {
  name: 'position',
  data() {
    return {
      positionVisible: false,
      address: '上海市长宁区长宁路1033号联通大厦30层',
      lng: '31.2174881901',
      lat: '31.2174881901',
      center: {},
      zoom: 12,
    };
  },
  methods: {
    // position
    open() {
      this.positionVisible = true;
      this.center = {};
    },
    getPosition(row) {
      this.address = row.addr;
      this.lng = row.lng;
      this.lat = row.lat;
      this.center = row;
    },
  },
};
</script>

<style scoped lang="scss">
.position{
  p{
    color:#666;
    padding-top: 10px;
  }
  .bm-view {
    width: 100%;
    height: 300px;
  }
}
</style>
