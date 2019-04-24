<template>
  <div class="detailsCons">
    <el-form :model="detailsForm" :rules="rules" ref="detailsForm" label-width="100px" class="detailsForm" >
      <p class="infoTitle">基础信息(必填)</p>
      <el-form-item label="所属项目：" prop="projectId" :disabled="isEdit">
        <el-select v-if="nowRoutePath === '/work-order-manage/details' && detailsForm.projectId"
                   clearable v-model="detailsForm.projectId" placeholder="请选择项目">
          <el-option v-for="(item, index) in detailsForm.projectList"
                     :key="index"
                     :label="item.label"
                     :value="item.value"></el-option>
        </el-select>
        <el-select v-else
                   clearable v-model="detailsForm.projectId" placeholder="请选择项目" :disabled="isEdit">
          <el-option v-for="(item, index) in detailsForm.projectList"
                     :key="index"
                     :label="item.label"
                     :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="设备类型：" prop="deviceType">
        <el-select clearable v-model="detailsForm.deviceType" placeholder="请选择设备类型" :disabled="isEdit">
          <el-option v-for="(item, index) in detailsForm.deviceTypeList"
                     :key="index"
                     :label="item.label"
                     :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="设备厂商：" prop="maker">
        <el-select clearable v-model="detailsForm.maker" placeholder="请选择设备厂商" :disabled="isEdit">
          <el-option v-for="(item, index) in detailsForm.deviceMakerList"
                     :key="index"
                     :label="item.label"
                     :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="设备型号：" prop="productModel">
        <el-select clearable v-model="detailsForm.productModel" placeholder="请选择设备型号" :disabled="isEdit">
          <el-option v-for="(item, index) in detailsForm.deviceModalList"
                     :key="index"
                     :label="item.label"
                     :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="IMEI：" prop="serialNumber">
        <el-input clearable v-model="detailsForm.serialNumber" placeholder="请输入设备IMEI号" :disabled="isEdit"></el-input>
      </el-form-item>
      <p class="infoTitle">扩展信息(选填)</p>
      <el-form-item label="厂商设备号：" prop="deviceNum">
        <el-input clearable v-model="detailsForm.deviceNum" placeholder="请输入厂商设备号" :disabled="isEditFlag"></el-input>
      </el-form-item>
      <el-form-item label="MSISDN：" prop="msisdn">
        <el-input clearable v-model="detailsForm.msisdn" placeholder="请输入MSISDN号" :disabled="isEditFlag"></el-input>
      </el-form-item>
      <el-form-item label="IMSI：" prop="imsi">
        <el-input clearable v-model="detailsForm.imsi" placeholder="请输入IMSI号" :disabled="isEditFlag"></el-input>
      </el-form-item>
      <div class="cons">
        <el-form-item label="地址：" prop="province">
          <el-select clearable v-model="detailsForm.province" placeholder="请选择省" @change = "proviceFun(detailsForm.province)" :disabled="isEditFlag">
            <el-option
              v-for = "proviceItem in detailsForm.provinceList"
              :label="proviceItem.name"
              :key = "proviceItem.key"
              :value="proviceItem.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label-width = '15px' prop="city">
          <el-select clearable v-model="detailsForm.city" placeholder="请选择市" @change = "cityFun(detailsForm.city)" :disabled="isEditFlag">
            <el-option
              v-for = "cityItem in detailsForm.cityList"
              :label="cityItem.name"
              :key = "cityItem.key"
              :value="cityItem.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item  label-width = '15px' prop="district">
          <el-select clearable v-model="detailsForm.district" placeholder="请选择区" @change = "districtFun(detailsForm.district)" :disabled="isEditFlag">
            <el-option v-for = "countryItem in detailsForm.countryList"
                       :label="countryItem.name"
                       :key = "countryItem.key"
                       :value="countryItem.id"></el-option>
          </el-select>
        </el-form-item>
      </div>
      <el-form-item label="详细地址：" prop="addr">
        <el-input clearable v-model="detailsForm.addr" placeholder="请输入详细地址" :disabled="isEditFlag"></el-input>
      </el-form-item>
      <div class="cons">
        <el-form-item label="经纬度：" prop="lng">
          <el-input clearable v-model="detailsForm.lng" placeholder="请输入经度" :disabled="isEditFlag"></el-input>
        </el-form-item>
        <el-form-item label-width = '15px' prop="lat">
          <el-input clearable v-model="detailsForm.lat" placeholder="请输入纬度" :disabled="isEditFlag"></el-input>
        </el-form-item>
        <el-form-item  label-width = '15px' prop="coordinateType">
          <el-select clearable v-model="detailsForm.coordinateType" placeholder="请选择坐标系" :disabled="isEditFlag">
            <el-option v-for="(item, index) in coorList" :key="index" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
      </div>
      <el-form-item label="备注信息：" prop="remak">
        <el-input clearable v-model="detailsForm.remak" placeholder="请输入备注信息" :disabled="isEditFlag"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nowRoutePath: this.$route.path,
    };
  },
  props: {
    rules: {
      type: Object,
      required: true,
    },
    detailsForm: {
      type: Object,
      required: true,
    },
    coorList: {
      type: Array,
      required: true,
    },
    isEdit: {
      default: true,
      type: Boolean,
    },
    isEditFlag: {
      default: true,
      type: Boolean,
    },
  },
  watch: {
    'detailsForm.projectId': function project() {
      if (this.$parent.$parent.detailsSelect) {
        this.$parent.$parent.detailsSelect();
      }
    },
    'detailsForm.deviceType': function type() {
      if (this.$parent.$parent.detailsSelect) {
        this.$parent.$parent.detailsSelect();
      }
    },
    'detailsForm.maker': function maker() {
      if (this.$parent.$parent.detailsSelect) {
        this.$parent.$parent.detailsSelect();
      }
    },
    'detailsForm.productModel': function model() {
      if (this.$parent.$parent.detailsSelect) {
        this.$parent.$parent.detailsSelect();
      }
    },
  },
  methods: {
    proviceFun(a) {
      this.$parent.$parent.proviceFun(a);
    },
    cityFun(a) {
      this.$parent.$parent.cityFun(a);
    },
    districtFun(a) {
      this.$parent.$parent.districtFun(a);
    },
  },
};
</script>

<style  lang="scss">
.detailsCons{
  .infoTitle{
    background: #ECEEF3;
    padding:10px;
    margin-bottom: 20px;
    color:#333;
  }
  .el-select{
    width:100%;
  }
  .cons{
    display:flex;
  }
}
</style>
