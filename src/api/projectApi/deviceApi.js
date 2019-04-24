import {
  post,
  postJson,
  postParamsConcatFun,
  get,
  postRequestExcelFun,
  postLogtExcelFun,
} from '../apiFun';

export const batchUpdateDeviceInfoMngFun = params => postJson('batchUpdateDeviceInfoMng', params);
export const downloadErrorDeviceMngFun = params => postJson('downloadErrorDeviceMng', params);
export const getDeviceList = params => postJson('getDeviceList', params); // 设备列表
export const getDeviceSelectors = params => postJson('getDeviceSelectors', params);
export const getDmpList = params => post('getDmpList', params);
export const getDmpUserList = params => post('getDmpUserList', params);
export const getDetails = params => postJson('getDetails', params);
export const addDevice = params => postJson('addDevice', params);
export const deleteSingleDevice = params => postParamsConcatFun('deleteSingleDevice', params);
export const deleteMultiDevice = params => postJson('deleteMultiDevice', params);
export const submitDeviceInfo = params => postJson('submitDeviceInfo', params);
// export const getPosition = params => post('getPosition', params);
// export const getLog = params => postJson('getLog', params);
export const getAddGronp = params => post('getAddGronp', params);
export const submitGronp = params => post('submitGronp', params);
export const getAddUser = params => post('getAddUser', params);
export const getModifyUser = params => post('getModifyUser', params);
export const submitUser = params => post('submitUser', params);
export const getDmpMakerAll = params => post('getDmpMakerAll', params);
export const getSubscribeList = params => get('getSubscribeList', params);
export const getDeviceTypeAndMakerAndModel = params => post('getDeviceTypeAndMakerAndModel', params);
export const getDmpAllUser = params => post('getDmpAllUser', params);
export const onOffDmpServer = params => post('onOffDmpServer', params);
export const deleteDmpUser = params => post('deleteDmpUser', params);
export const addSubscribe = params => postJson('addSubscribe', params);
export const delSubscribe = params => post('delSubscribe', params);
export const getSubscribeInfo = params => post('getSubscribeInfo', params);
export const modifySubscribe = params => post('modifySubscribe', params);
export const batchExport = params => postRequestExcelFun('batchExport', params);
export const downloadTemplate = params => postRequestExcelFun('downloadTemplate', params);
export const uploadPreview = params => post('uploadPreview', params);
export const uploadFile = params => postJson('uploadFile', params);
export const getProvinceList = params => postJson('getProvinceList', params);
export const getCityList = params => postParamsConcatFun('getCityList', params);
export const getCountryList = params => postParamsConcatFun('getCountryList', params);
export const getLogList = params => postJson('getLogList', params); // 设备日志列表
export const getAccountList = params => postJson('getAccountList', params);
export const getSubmitAccount = params => postJson('getSubmitAccount', params);
export const logsExport = params => postLogtExcelFun('logsExport', params);
export const getDeleteUser = params => post('deleteUser', params);
export const disableOrStart = params => postJson('disableOrStart', params);
export const getAllProject = params => get('allProject', params);
export const updateAccount = params => postJson('updateAccount', params);
export const getRoleList = params => get('getRoleList', params);
export const getStreetList = params => get('getStreetList', params);
export const submitEditDevice = params => postJson('submitEditDevice', params);
