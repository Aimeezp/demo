import Mock from 'mockjs';

// const echartDataArr = [[11, 23, 26, 16, 21, 20], [[6, 23, 9, 2, 12, 18]]];
const dashboardBigDustBinData = Mock.mock({
  totalNum: 220, // 告警次数
  tableData: [
    {
      name: '1号垃圾桶',
      temp: 13, // 温度
      humi: 37, // 湿度
    },
    {
      name: '2号垃圾桶',
      temp: 35,
      humi: 21,
    },
    {
      name: '3号垃圾桶',
      temp: 60,
      humi: 15,
    },
    {
      name: '4号垃圾桶',
      temp: 50,
      humi: 25,
    },
    {
      name: '5号垃圾桶',
      temp: 45,
      humi: 30,
    },
  ],
  totalEquipNum: 580, // 设备总数
  monthWarnNum: 10, // 当月告警
  dayWarnNum: 2, // 当月故障
});

export default dashboardBigDustBinData;
