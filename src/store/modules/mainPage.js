import { mapDevices } from '@/assets/js/appMapping';

const mainPage = {
  state: {
    mapMarkers: [], // 地图上所有点
    markerLoadingFlag: false, // 地图上所有点加载完成
    mapLevel: 1, // 地图等级，用于展示不同的聚合类型（1,2,3）
    dimensionalFlag: true, // 地图形式3d(true:3d,false:2d)
    recordCollapseOne: 0,
    recordCollapseTwo: 0,
    carCADisShow: false, // 停车CAD图是否显示
    collapseDeviceType: '', // 地图侧栏展开的设备类型（前端的设备类型）
    workOrderImg: [], // 工单查看的图片路径
    sideDevice: mapDevices, // 地图上的设备类型
  },
  mutations: {
    SET_SIDE_DEVICE(state, info) {
      state.sideDevice = info;
    },
    SET_WORK_ORDER_IMG(state, info) {
      state.workOrderImg.push(info);
    },
    SET_COLLAPSE_DEVICE_TYPE(state, info) {
      state.collapseDeviceType = info;
    },
    SET_MAP_MARKERS(state, info) {
      state.mapMarkers = info;
    },
    SET_MARKER_LOADING_FLAG(state, info) {
      state.markerLoadingFlag = info;
    },
    SET_MAP_LEVEL(state, info) {
      state.mapLevel = info;
    },
    SET_DIMENSIONAL_FLAG(state, flag) {
      state.dimensionalFlag = flag;
    },
    SET_RECORD_COLLAPSE_ONE(state, data) {
      state.recordCollapseOne = data;
    },
    SET_RECORD_COLLAPSE_TWO(state, data) {
      state.recordCollapseTwo = data;
    },
    SET_CARCAD_FLAG(state, flag) {
      state.carCADisShow = flag;
    },
  },
  getters: {
    mapLevel: state => state.mapLevel,
    dimensionalFlag: state => state.dimensionalFlag,
    mapMarkers: state => state.mapMarkers,
    markerLoadingFlag: state => state.markerLoadingFlag,
    recordCollapseOne: state => state.recordCollapseOne,
    recordCollapseTwo: state => state.recordCollapseTwo,
    carCADisShow: state => state.carCADisShow,
    collapseDeviceType: state => state.collapseDeviceType,
    workOrderImg: state => state.workOrderImg,
    sideDevice: state => state.sideDevice,
  },
};

export default mainPage;
