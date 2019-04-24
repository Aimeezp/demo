import Mock from 'mockjs';

const record = [];
const statusArr = ['不通知', '语音', '短信'];
for (let i = 0; i < 300; i += 1) {
  const line = {
    projectId: parseInt((Math.random() * (10 ** 3)), 10),
    projectName: '联通演示项目',
    address: Mock.Random.county(true),
    unit: '上海联通',
    name: '青浦看守所',
    unusual: statusArr[parseInt((Math.random() * 3), 10)],
    warning: statusArr[parseInt((Math.random() * 3), 10)],
    hasDevice: parseInt((Math.random() * 2), 10),
  };
  record.push(Mock.mock(line));
}

export default record;
