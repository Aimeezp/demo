const deviceLogDetail = {
  state: {
    deviceLogData: [],
  },
  mutations: {
    SET_DEVICE_LOG_DATA(state, data) {
      state.deviceLogData = data;
    },
  },
  getters: {
    deviceLogData: state => state.deviceLogData,
  },
};

export default deviceLogDetail;
