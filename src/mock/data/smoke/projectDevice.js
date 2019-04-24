import Mock from 'mockjs';

const record = [];
const phone = [135, 136, 137, 138, 139, 147, 150, 151, 152, 157, 158, 159,
  187, 188, 130, 131, 132, 155, 156, 185, 186, 133, 153, 180, 189];
for (let i = 0; i < 300; i += 1) {
  const line = {
    shortId: parseInt((Math.random() * (10 ** 3)), 10),
    netPort: `-${parseInt((Math.random() * (10 ** 7)), 10)}`,
    deviceType: `H${parseInt((Math.random() * (10 ** 3)), 10)}`,
    phone: `${phone[parseInt((Math.random() * 24), 10)]}${parseInt((Math.random() * (10 ** 8)), 10)}`,
    address: Mock.Random.county(true),
    section: `${parseInt((Math.random() * (10 ** 2)), 10)}层`,
  };
  record.push(Mock.mock(line));
}

export default record;
