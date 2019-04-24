// 毫秒转时分秒
function formatDuring(mss) {
  const days = parseInt(mss / (1000 * 60 * 60 * 24), 10);
  const hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60), 10);
  const minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60), 10);
  const seconds = Math.floor((mss % (1000 * 60)) / 1000, 10);
  let dayv = '';
  let hourv = '';
  let minutev = '';
  let secondv = '';
  if (days > 0) dayv = `${days}天`;
  if (hours > 0) hourv = `${hours}小时`;
  if (minutes > 0) minutev = `${minutes}分钟`;
  if (seconds > 0) secondv = `${seconds}秒`;
  return dayv + hourv + minutev + secondv;
}

function getOffsetDays(time1, time2) {
  const offsetTime = Math.abs(time1 - time2);
  return formatDuring(offsetTime);
}
export default getOffsetDays;
