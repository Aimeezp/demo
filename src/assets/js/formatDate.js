const formatDate = function fun(time, type) {
  const date = new Date(time);
  let timeV = '';
  if (type === 'add') timeV = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} 00:00:00`;
  else timeV = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  return timeV;
};

export default formatDate;
