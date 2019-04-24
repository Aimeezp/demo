const subwordNum = (val, start, end) => {
  const startArr = [];
  const num = end - start;
  for (let i = 0; i < num; i += 1) {
    startArr.push('*');
  }
  const content = `${val.substring(0, start - 1)}${startArr.join('')}${val.substring((start + num - 1))}`;
  return content;
};
const subwordEmail = (val) => {
  // sh-guoran@chinaunicom.cn
  const arr = val.split('@');
  const arr2 = arr[1].split('.');
  const starArr = [];
  for (let i = 0; i < arr2[0].length; i += 1) {
    starArr.push('*');
  }
  return `${arr[0]}@${starArr.join('')}.${arr2[1]}`;
};
export default {
  filters: {
    telFilter(val) {
      return subwordNum(val, 4, 8);
    },
    emailFilter(val) {
      return subwordEmail(val);
    },
  },
};
