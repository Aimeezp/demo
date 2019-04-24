const ls = window.localStorage;
const ss = window.sessionStorage;

export const Cookie = {
  get(key) {
    const arr = document.cookie.split('; ');
    for (let i = 0; i < arr.length; i += 1) {
      const arr2 = arr[i].trim().split('=');
      if (arr2[0] === key) {
        return arr2[1];
      }
    }
    return '';
  },
  set(setting, day = 7) {
    const oDate = new Date();
    oDate.setDate(oDate.getDate() + day);
    Object.keys(setting).forEach((k) => {
      document.cookie = `${k}=${setting[k]};expires=${oDate}`;
    });
  },
  remove(setting) {
    const obj = {};
    setting.forEach((key) => {
      obj[key] = '';
    });
    this.set(obj, -1);
  },
};


export const Local = {
  getSingle(key) {
    return ls.getItem(key);
  },
  setSingle(key, val) {
    return ls.setItem(key, val);
  },
  get(key) {
    if (key) return JSON.parse(ls.getItem(key));
    return null;
  },
  set(setting) {
    Object.keys(setting).forEach((k) => {
      ls.setItem(k, JSON.stringify(setting[k]));
    });
  },
  remove(key) {
    ls.removeItem(key);
  },
  clear() {
    ls.clear();
  },
};


export const Session = {
  get(key) {
    if (key) return JSON.parse(ss.getItem(key));
    return null;
  },
  set(setting) {
    Object.keys(setting).forEach((k) => {
      ss.setItem(k, JSON.stringify(setting[k]));
    });
  },
  remove(key) {
    ss.removeItem(key);
  },
  clear() {
    ss.clear();
  },
};
