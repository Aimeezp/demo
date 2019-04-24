const noticeTypeArr = [{
  type: '语音已通知',
  mode: '13999887766',
}, {
  type: '短信已通知',
  mode: '13999887766',
}, {
  type: '系统已通知',
  mode: 'demoAdmin',
}, {
  type: '邮件已通知',
  mode: 'sh-guoran@chinaunicom.cn',
}];
const msgDataListV = [
  {
    index: 5561,
    msgStatus: 2,
    msgType: 1,
    msgLabel: '井盖打开',
    deviceType: '井盖',
    deviceBrand: '铂珏',
    deviceMaker: 'BJ-S101',
    deviceImei: '8637847502849620',
    deviceAdress: '上海市长宁区联通大厦',
    time: '2019-04-01  15:24:36',
    resultStatus: '待确认',
    deviceType2: 'well-cover',
  },
  {
    index: 5562,
    msgStatus: 1,
    msgType: 2,
    msgLabel: '火警',
    deviceType: '烟感',
    deviceBrand: '昊想',
    deviceMaker: 'H5',
    deviceImei: '836542185471256',
    deviceAdress: '上海市长宁区联通大厦',
    time: '2019-04-02 08:30:20',
    resultStatus: '已确认',
    deviceType2: 'smoke-sensor',
  },
  {
    index: 5563,
    msgStatus: 1,
    msgType: 2,
    msgLabel: '火警',
    deviceType: '烟感',
    deviceBrand: '昊想',
    deviceMaker: 'H5',
    deviceImei: '836542185471256',
    deviceAdress: '上海市长宁区联通大厦',
    time: '2019-04-02 12:30:20',
    resultStatus: '待确认',
    deviceType2: 'smoke-sensor',
  },
  {
    index: 5564,
    msgStatus: 2,
    msgType: 3,
    msgLabel: '设备离线',
    deviceType: '门磁',
    deviceBrand: '思敦',
    deviceMaker: 'LP-35',
    deviceImei: '8637847502849620',
    deviceAdress: '上海市长宁区联通大厦',
    time: '2019-04-03  15:24:36',
    resultStatus: '待确认',
    deviceType2: 'door-monitor',
  },
  {
    index: 5565,
    msgStatus: 1,
    msgType: 4,
    msgLabel: '门磁打开',
    deviceType: '门磁',
    deviceBrand: '思敦',
    deviceMaker: 'LP-35',
    deviceImei: '8637847502849620',
    deviceAdress: '上海市长宁区联通大厦',
    time: '2019-04-04  07:24:36',
    resultStatus: '待确认',
    deviceType2: 'door-monitor',
  },
];
for (let i = 0; i < msgDataListV.length; i += 1) {
  msgDataListV[i].noticeType = noticeTypeArr;
  msgDataListV[i].msgData = '暂无';
  msgDataListV[i].dispatchStatus = 1;
}
export const msgDataList = msgDataListV;
