export const carInterList = [];
export const carOuterList = [];
const typeData = ['临时车辆', '社会车辆'];
const carNumData = ['沪A-9M717', '苏A-9M666', '陕A-9M888', '沪B-8B717', '沪D-9O417'];
const inTimeData = ['08:13:32', '09:20:40', '15:12:32', '23:13:32', '08:30:32'];
const totalMoneyData = ['已结算', '免费', '优惠'];
for (let i = 0; i < 20; i += 1) {
  carInterList.push({
    carNum: carNumData[parseInt(Math.random() * 5, 10)],
    type: typeData[parseInt(Math.random() * 2, 10)],
    inTime: inTimeData[parseInt(Math.random() * 5, 10)],
    totalMoney: totalMoneyData[parseInt(Math.random() * 2, 10)],
  });
}
for (let i = 0; i < 20; i += 1) {
  carOuterList.push({
    carNum: carNumData[parseInt(Math.random() * 5, 10)],
    type: typeData[parseInt(Math.random() * 2, 10)],
    inTime: inTimeData[parseInt(Math.random() * 5, 10)],
    totalMoney: totalMoneyData[parseInt(Math.random() * 3, 10)],
  });
}
