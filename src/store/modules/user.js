import { Cookie } from '@/utils/storage';
import { userName, token } from '@/storage/cookie';

const user = {
  state: {
    name: Cookie.get(userName),
    token: Cookie.get(token),
  },
  mutations: {
    SET_USERINFO(state, info) {
      state.name = info.userName;
      state.token = info.token;
      const obj = {};
      obj[userName] = info.userName;
      obj[token] = info.token;
      Cookie.set(obj);
    },
    CLEARINFO(state) {
      state.name = '';
      state.token = '';
      Cookie.remove([userName, token]);
    },
    SET_STATUS(state, status) {
      state.online = status;
    },
  },
  getters: {
    userName: state => state.name,
    token: state => (state.token === 'undefined' ? undefined : state.token),
  },
};

export default user;
