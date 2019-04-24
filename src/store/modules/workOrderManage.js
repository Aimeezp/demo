const workOrderManage = {
  state: {
    workOrderUploadDataList: [],
    workOrderInfoData: {},
    batchEditNewDeviceData: [],
    localStorageNumber: 10,
  },
  mutations: {
    SET_BATCH_EDIT_NEW_DEVICE_DATA(state, data) {
      state.batchEditNewDeviceData = data;
    },
    SET_WORK_ORDER_UPLOAD_DATA_LIST(state, data) {
      state.workOrderUploadDataList = data;
    },
    SET_WORK_ORDER_INFO_DATA(state, data) {
      state.workOrderInfoData = data;
    },
  },
  getters: {
    batchEditNewDeviceData: state => state.batchEditNewDeviceData,
    workOrderUploadDataList: state => state.workOrderUploadDataList,
    workOrderInfoData: state => state.workOrderInfoData,
    localStorageNumber: state => state.localStorageNumber,
  },
};

export default workOrderManage;
