import Mock from 'mockjs';

const smokeBigData = Mock.mock({
  totalNum: 52, // 总告警数
  centerList: {
    smokeNum: 30, // 烟警次数
    fireNum: 22, // 火警次数
    resolvedNum: 40, // 已解决次数
    unsolvedNum: 12, // 未解决次数
    errNum: 23, // 故障率
  },
  totalEquipNum: 99, // 设备数
  smokeNum: 30,
  fireNum: 22,
});


export default smokeBigData;
