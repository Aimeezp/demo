import { userName, password } from '@/config/loginInfo';
import urlList from './wsList';
import ws from './wsCommon';
import store from '../store';


const getUrl = key => ({}.hasOwnProperty.call(urlList, key) ? urlList[key] : '');

const common = (key, params) => new Promise((async (resolve, reject) => {
  // 未登录自动登录
  let { token } = store.getters;
  if (!token) {
    // 自动登录
    const loginParams = {
      userName,
      password,
    };
    await new Promise((resolveToken, rejectToken) => {
      window.vaApi.requestLogin(loginParams).then(({ data: { status, data } }) => {
        if (parseInt(status, 10) === 1) {
          const obj = data || {};
          store.commit('SET_USERINFO', obj);
          ({ token } = obj);
          if (!token) {
            rejectToken();
          } else {
            resolveToken();
          }
        }
      });
    });
  }
  const path = getUrl(key);
  if (path) {
    ws.url = `${path}?token=Bearer ${token}`;
    ws.onOpenFun = params.onOpenFun;
    ws.onMsgFun = params.onMsgFun;
    ws.init();
    resolve(ws);
  } else {
    reject(new Error('Url is undefined'));
  }
}));


export default common;
