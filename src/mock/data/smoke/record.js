import Mock from 'mockjs';

const record = [];
const phone = [135, 136, 137, 138, 139, 147, 150, 151, 152, 157, 158, 159,
  187, 188, 130, 131, 132, 155, 156, 185, 186, 133, 153, 180, 189];
for (let i = 0; i < 3; i += 1) {
  const line = {
    name: Mock.Random.cname(),
    phone: `${phone[parseInt((Math.random() * 24), 10)]}${parseInt((Math.random() * (10 ** 8)), 10)}`,
    callList: [],
  };
  for (let j = 0; j < 5; j += 1) {
    const call = {
      startTime: Mock.Random.date('HH:mm'),
      endTime: Mock.Random.date('HH:mm'),
      status: parseInt((Math.random() * 2), 10),
    };
    line.callList.push(Mock.mock(call));
  }
  record.push(Mock.mock(line));
}

export default record;
