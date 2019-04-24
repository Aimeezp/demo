import Mock from 'mockjs';

const alarms = [];

const nameList = ['06', '01'];
const dateList = ['2018-01-29 08:29:44', '2018-01-15 16:33:12', '2018-02-09 10:12:36'];
for (let i = 0; i < 100; i += 1) {
  alarms.push(Mock.mock({
    id: 5 - i,
    bizData: nameList[parseInt((Math.random() * 2), 10)],
    report_time: dateList[parseInt((Math.random() * 3), 10)],
    // Mock.Random.date('yyyy-MM-dd HH:mm:ss'),
    // address: Mock.Random.county(true),
    address: '上海市长宁区长宁路1033号联通大厦29楼',
    deviceNum: parseInt((Math.random() * (10 ** 15)), 10),
    project_name: '上海联通演示项目',
    report_state: parseInt((Math.random() * 2), 10),
    release_state: parseInt((Math.random() * 2), 10),
    confirm_state: parseInt((Math.random() * 2), 10),
  }));
}

export default alarms;
