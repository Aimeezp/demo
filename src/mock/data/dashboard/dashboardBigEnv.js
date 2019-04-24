import Mock from 'mockjs';

// const echartDataArr = [[11, 23, 26, 16, 21, 20], [[6, 23, 9, 2, 12, 18]]];
const dashboardBigEnvData = Mock.mock({
  judgeNum: 9,
  // 甲醛
  formaldehydeData: [0.06, 0.05, 0.07, 0.08, 0.05, 0.09, 0.05],
  coData: [0.01, 0.02, 0.03, 0.01, 0.03, 0.02, 0.05],
  temperatureData: [23, 22, 20, 19, 21, 22, 22],
  // x轴刻度
  monthList: ['1', '2', '3', '4', '5', '6'],
  // 左侧通用data
  totalEquipNum: 9,
  monthWarnNum: 1,
  dayWarnNum: 1,
  // 小面板
  envSData: {
    number: 9, // 告警次数
    device: 9, // 设备总数
    monthAlarm: 1, // 月累计告警
    monthError: 1, // 故障次数
  },
});

export default dashboardBigEnvData;
