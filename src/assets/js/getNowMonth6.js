function add0(m) { return m < 10 ? `0${m}` : m; }
export const getNowMonth6 = () => {
  const nowMonth = new Date().getMonth() + 1;
  let nowDate = new Date().getDate();
  const monthArr = [];
  for (let i = 0; i < 7; i += 1) {
    if (nowDate >= 7) {
      monthArr.unshift(`${nowMonth}.${nowDate}`);
      nowDate -= 1;
    }
  }
  return monthArr;
};
export const getNowTimeHM = () => {
  const arr = [];
  const nowH = new Date().getHours();
  let mowM = new Date().getMinutes();
  for (let i = 0; i < 7; i += 1) {
    if (mowM >= 0) {
      arr.unshift(`${add0(nowH)}:${add0(mowM)}`);
      mowM -= 5;
    } else {
      mowM = 60 - (mowM + 5);
      arr.unshift(`${add0(nowH)}:${add0(mowM)}`);
      mowM -= 5;
    }
  }
  return arr;
};
