<template>
  <el-dialog
  title="工单详情"
  :visible.sync="outerVisible"
  width="90%"
  center
  :before-close="handleClose"
  >
    <div class="add-work-order-page">
      <el-form class="self-form-add-work" ref="selfFormAddWorkRef" label-width="90px">
        <div class="form-item">
          <div>
            <el-form-item label="工单类型：">
              <span>{{sendDetail.type === 1?'业务':sendDetail.type === 2?'维修':sendDetail.type === 3?'安装':'测试'}}</span>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="派单日期：">
            <span>{{sendDetail.updateTime}}</span>
            </el-form-item>
          </div>
        </div>
        <div class="form-item">
          <div>
            <el-form-item label="项目名称：">
              <span>{{sendDetail.projectName}}</span>
            </el-form-item>
          </div>
          <div>
            <!--项目经理-->
            <el-form-item label="支撑经理：">
              <span>{{sendDetail.managerName}}</span>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="施工人员：">
              <span>{{sendDetail.testerName}}</span>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="技术支持：">
              <span>{{sendDetail.supporterName}}</span>
            </el-form-item>
          </div>
        </div>
        <div class="form-item">
          <div>
            <el-form-item label="项目地址：">
              <span>{{sendDetail.address}}</span>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="联系电话：">
              <span>{{sendDetail.managerMobile}}</span>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="联系电话：">
              <span>{{sendDetail.testerMobile}}</span>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="联系电话：">
              <span>{{sendDetail.supporterMobile}}</span>
            </el-form-item>
          </div>
        </div>
      </el-form>
      <div class="tableList">
        <el-table
          :data="sendDetail.details"
          style="width: 100%"
          fit
          :header-cell-style="headStyle"
          >
          <template v-for="(item,index) in tableColumnList">
            <el-table-column :prop="item.prop" :label="item.label" :key="index" align="center" v-if="item.label==='图片附件'">
              <template slot-scope="{row}">
                <div class="tableBtnGroup" @click="showPhoto(row)">点击查看</div>
              </template>
            </el-table-column>
            <el-table-column :prop="item.prop" :label="item.label" :key="index" align="center" v-else-if="item.label==='消息类型'">
              <template slot-scope="{row}">
                <div :class="row.msgState === '故障'?'errorStyle':'alarmStyle'">{{row.msgState}}</div>
              </template>
            </el-table-column>
            <el-table-column :prop="item.prop" :label="item.label" :key="index" align="center" v-else-if="item.label==='工作状态'">
              <template>
                <div>{{sendDetail.isDone === 1?'已完成':'未完成'}}</div>
              </template>
            </el-table-column>
            <el-table-column :prop="item.prop" :label="item.label" :width="item.width" :key="index" align="center" v-else>
            </el-table-column>
          </template>
        </el-table>
      </div>
      <div class="btn-center">
        <el-button type="primary" @click="outerVisible = false">确 定</el-button>
      </div>
    </div>
    <el-dialog
      :visible.sync="innerVisible"
      width="40%"
      center
      :modal="false"
    >
      <div style="text-align:center;">
        <img width="300" :src="imgSrc"/>
      </div>
    </el-dialog>
  </el-dialog>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      outerVisible: false,
      innerVisible: false,
      headStyle: {
        background: '#DCE8F2',
      },
      // photoSrc: '',
      imgSrc: '',
    };
  },
  computed: {
    ...mapGetters(['workOrderImg']),
  },
  props: ['sendDetail', 'tableColumnList'],
  methods: {
    handleClose(done) {
      done();
    },
    async showPhoto() {
      this.innerVisible = true;
      this.imgSrc = '';
      let { src } = this.sendDetail;
      if (!src && this.workOrderImg.length > 0) {
        const path = this.workOrderImg.find(v => v.indexOf(this.sendDetail.timestamp) !== -1);
        if (path) {
          await window.vaApi
            .getImgUrl({
              path,
            })
            .then((res) => {
              src = res.config.url;
            });
        }
      }
      this.imgSrc = src;
    },
  },
};
</script>
<style scoped lang="scss">
  @import "~scss_vars";
  .add-work-order-page{
    .btn-center{text-align: center;margin-top:20px;}
    .self-form-add-work{
      width: 100%;
      box-sizing: border-box;
      .form-item{
        width: 100%;
        display: flex;
        >div{
          width: 25%;
          .el-form-item {
            margin-bottom: 20px;
            span{
              border:1px solid #E0E0E0;
              border-radius:3px;
              padding:5px 10px;
            }
          }
        }
      }
    }
    .errorStyle{
      color:#F8C166;
    }
    .alarmStyle{
      color:#D9364A;
    }
    .tableBtnGroup{cursor: pointer;}
  }
</style>
