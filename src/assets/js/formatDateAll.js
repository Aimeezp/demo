function change(t) {
  return t >= 10 ? t : `0${t}`;
}
export const formatDateDate = (time) => {
  const d = new Date(time);
  const year = d.getFullYear();
  const month = change(d.getMonth() + 1);
  const day = change(d.getDate());
  const hour = change(d.getHours());
  const minute = change(d.getMinutes());
  const second = change(d.getSeconds());
  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
};
