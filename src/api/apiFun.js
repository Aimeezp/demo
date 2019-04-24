import np from 'nprogress';
import 'nprogress/nprogress.css';
import { Message, MessageBox } from 'element-ui';
import {
  postRequest, getRequest, postJsonRequest, getImgRequest,
  postSpliceRequest, postDeviceRequest, postParamsConcat, postRequestExcel, postLogtExcel, postJsonRequestNotToken, postParamsHelp,
} from './axiosFun';
import router from '../router';
import store from '../store';

import urlList from './apiList';

np.configure({ showSpinner: false });

const getUrl = key => ({}.hasOwnProperty.call(urlList, key) ? urlList[key] : '');

let expireRemind = false;// 是否已弹出过期提醒

const common = (key, fun) => {
  try {
    np.start();
    const path = getUrl(key);
    if (path) {
      return new Promise((resolve, reject) => {
        fun(path).then((r) => {
          resolve(r);
          const { message, status } = r.data;
          const { statuss } = r;
          if (parseInt(status, 10) !== 0 && parseInt(statuss, 10) === 200) {
            Message({
              message,
              type: 'error',
              duration: 3000,
            });
          }
        }, (e) => {
          reject(e);
          // 登录过期跳转到登录页面
          if (e.response && Number(e.response.status) === 403 && store.getters.token && !expireRemind) {
            expireRemind = true;
            MessageBox.alert('登录已过期，请重新登录！', {
              confirmButtonText: '确定',
              callback: () => {
                expireRemind = false;
                store.commit('CLEARINFO');
                router.push({ path: '/introduce' });
              },
            });
          } else if (e.message && e.message === 'Network Error') {
            let message;
            if (window.navigator.onLine) {
              message = '服务器已离家出走，请稍后再试';
            } else {
              message = '网络正在思考人生，请稍后再试';
            }
            Message({
              message,
              type: 'error',
              duration: 3000,
            });
          } else {
            Message({
              message: e.message,
              type: 'error',
              duration: 3000,
            });
          }
        });
      });
    }
    return Promise.reject(new Error('Url is undefined'));
  } finally {
    np.done();
  }
};


export const post = (key, params) => common(key, path => postRequest(path, params));
export const postJson = (key, params) => common(key, path => postJsonRequest(path, params));
export const postSplice = (key, params) => common(key, path => postSpliceRequest(path, params));
export const get = (key, params) => common(key, path => getRequest(path, params));
export const getImg = (key, params) => common(key, path => getImgRequest(path, params));
export const postDevice = (key, params) => common(key, path => postDeviceRequest(path, params));
export const postParamsConcatFun = (key, params) => common(key, path => postParamsConcat(path, params));
export const postRequestExcelFun = (key, params) => common(key, path => postRequestExcel(path, params));
export const postLogtExcelFun = (key, params) => common(key, path => postLogtExcel(path, params));
export const postJsonNotToken = (key, params) => common(key, path => postJsonRequestNotToken(path, params));
export const postImgHelp = (key, params) => common(key, path => postParamsHelp(path, params));
