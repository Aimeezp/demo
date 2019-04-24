<template>
  <div class="editDeviceCon">
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      width="40%"
      top="3vh"
      center
      class="dialog-self">
      <el-form :model="detailsForm" :rules="rules" ref="detailsForm" label-width="100px" class="detailsForm" v-if="detailsForm">
        <p class="infoTitle">基础信息(必填)</p>
        <el-form-item label="所属项目：">
          <el-input clearable v-model="detailsForm.projectName" placeholder="请输入项目" :disabled="isEdit"></el-input>
        </el-form-item>
        <el-form-item label="设备类型：">
          <el-input clearable v-model="detailsForm.category" placeholder="请输入设备类型" :disabled="isEdit"></el-input>
        </el-form-item>
        <el-form-item label="设备厂商：">
          <el-input clearable v-model="detailsForm.maker" placeholder="请输入设备厂商" :disabled="isEdit"></el-input>
        </el-form-item>
        <el-form-item label="设备型号：">
          <el-input clearable v-model="detailsForm.productModel" placeholder="请输入设备型号" :disabled="isEdit"></el-input>
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
            <el-select  v-model="detailsForm.province" placeholder="请选择省" @change = "proviceFun(detailsForm.province)" :disabled="isEditFlag">
              <el-option
                v-for = "(proviceItem, index) in provinceList"
                :label="proviceItem.name"
                :key = "index"
                :value="proviceItem.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label-width = '15px' prop="city">
            <el-select v-model="detailsForm.city" placeholder="请选择市" @change = "cityFun(detailsForm.city)" :disabled="isEditFlag">
              <el-option
                v-for = "(cityItem, index) in cityList"
                :label="cityItem.name"
                :key = "index"
                :value="cityItem.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item  label-width = '15px' prop="district">
            <el-select v-model="detailsForm.district" placeholder="请选择区" @change = "districtFun(detailsForm.district)" :disabled="isEditFlag">
              <el-option v-for = "(countryItem, index) in countryList"
                         :label="countryItem.name"
                         :key = "index"
                         :value="countryItem.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item  label-width = '15px' prop="district">
            <el-input clearable v-model="detailsForm.street" placeholder="请输入街道" :disabled="isEditFlag" maxlength="30"></el-input>
          </el-form-item>

        </div>
        <el-form-item label="详细地址：" prop="addr">
          <el-input clearable v-model="detailsForm.addr" placeholder="请输入详细地址" :disabled="isEditFlag"></el-input>
        </el-form-item>
        <div class="cons">
          <el-form-item label="经纬度：" prop="lng">
            <el-input clearable v-model="detailsForm.lng" placeholder="请输入经度" :disabled="isEditFlag" maxlength="30"></el-input>
          </el-form-item>
          <el-form-item label-width = '15px' prop="lat">
            <el-input clearable v-model="detailsForm.lat" placeholder="请输入纬度" :disabled="isEditFlag" maxlength="30"></el-input>
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
        <div v-if="title === '设备编辑'" class="footerBtn">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitEditDevice('detailsForm')">保存</el-button>
        </div>
      </el-form>

    </el-dialog>
  </div>
</template>

<script>
import { area } from '@/assets/js/area';

export default {
  data() {
    return {
      deviceIDEdit: '', // 编辑保存用
      dialogVisible: false,
      title: '设备详情',
      isEdit: true,
      isEditFlag: true,
      detailsForm: null,
      provinceList: [],
      cityList: [],
      countryList: [],
      streetList: [],
      coorList: [
        {
          label: 'wgs84',
          value: 1,
        },
        {
          label: 'gcj02',
          value: 2,
        },
        {
          label: 'bd09',
          value: 3,
        },
      ],
      provinceId: '',
      cityId: '',
      countryId: '',
      rules: {
        deviceNum: [
          { message: '请输入厂商设备号', trigger: 'blur' },
          { max: 20, message: '最大长度20个字符' },
        ],
        msisdn: [
          { message: '请输入MSISDN', trigger: 'blur' },
          { max: 20, message: '最大长度20个字符' },
        ],
        imsi: [
          { message: '请输入IMSI', trigger: 'blur' },
          { max: 20, message: '最大长度20个字符' },
        ],
        addr: [
          { message: '请输入详细地址', trigger: 'blur' },
          { max: 30, message: '最大长度30个字符' },
        ],
        remak: [
          { message: '请输入备注信息', trigger: 'blur' },
          { max: 30, message: '最大长度30个字符' },
        ],
      },
    };
  },
  mounted() {

  },
  methods: {
    // 设备详情
    getDetailInfo(deviceId) {
      this.deviceIDEdit = deviceId;
      this.$parent.tableData.forEach((item) => {
        if (item.deviceId === deviceId) {
          this.detailsForm = JSON.parse(JSON.stringify(item));
        }
      });
      const obj = Object.keys(this.detailsForm);
      obj.forEach((v) => {
        if (!this.detailsForm[v] && this.title === '设备详情') {
          this.detailsForm[v] = '无数据';
          this.detailsForm.street = '无数据';
        }
      });
    },
    submitEditDevice(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const deviceData = this.$parent.tableData;
          deviceData.forEach((item, index) => {
            if (item.deviceId === this.deviceIDEdit) {
              deviceData[index] = this.detailsForm;
            }
          });
          this.dialogVisible = false;
        }
      });
    },
    getProvinceList() {
      this.provinceList = [];
      area.forEach((item) => {
        if (parseInt(item.parentId, 10) === 100000) {
          this.provinceList.push({
            id: item.id,
            name: item.name,
          });
        }
      });
    },
    proviceFun(a) {
      this.cityList = [];
      this.detailsForm.province = this.provinceList.filter(item => item.id === a)[0].name;
      area.forEach((item) => {
        if (item.parentId === a) {
          this.cityList.push({
            id: item.id,
            name: item.name,
          });
        }
      });
      this.detailsForm.city = '';
      this.detailsForm.district = '';
    },
    cityFun(a) {
      this.countryList = [];
      this.detailsForm.city = this.cityList.filter(item => item.id === a)[0].name;
      area.forEach((item) => {
        if (item.parentId === a) {
          this.countryList.push({
            id: item.id,
            name: item.name,
          });
        }
      });
      this.detailsForm.district = '';
    },
    districtFun(a) {
      this.countryId = a;
      this.detailsForm.district = this.countryList.filter(item => item.id === a)[0].name;
    },
  },
};
</script>

<style  lang="scss">
@import "~scss_vars";

.editDeviceCon{
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
  /*.el-form-item__label{*/
    /*padding:0;*/
  /*}*/
  .footerBtn{
    text-align: center;
  }
}
</style>
