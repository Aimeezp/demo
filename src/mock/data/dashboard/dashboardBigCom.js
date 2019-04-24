import Mock from 'mockjs';

let nowMonth = new Date().getMonth();
const monthArr = [];
for (let i = 0; i < 6; i += 1) {
  monthArr.unshift(`${nowMonth}月`);
  if (nowMonth > 1) {
    nowMonth -= 1;
  } else {
    nowMonth = 12;
  }
}
const dashboardBigComData = Mock.mock({
  // 设备总数
  totalEquipNum: 734,
  // 累计告警
  // totalWarnNum: 117,
  // 在线率
  echartData: [6, 23, 9, 2, 12, 18],
  // 故障率
  echartBadData: [2, 6, 1, 1, 7, 9],
  // x轴刻度
  monthList: monthArr,
  // 在线率
  onlineRate: 90,
  // 故障率
  badRate: 10,
  // 设备在线数
  onlineNum: 661, // 492
  // 设备故障数
  badNum: 73, // 242
  // 综合评分
  scopeNum: 90,
});

export default dashboardBigComData;
