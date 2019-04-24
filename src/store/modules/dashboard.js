import { Message } from 'element-ui';
// import { keyArr, valueArr } from '@/assets/js/appMapping';
import { Local } from '@/utils/storage';
import { dashboardSkin } from '@/storage/localStorage';
import { appMapping } from '../../assets/js/appMapping';

export const keyArr = Object.keys(appMapping);
export const valueArr = Object.values(appMapping).map(app => app.val);

const dashboard = {
  state: {
    canvasHeight: 0, // 画板的高度
    canvasWidth: 0, // 画板的宽度
    rightEnable: true, // 右侧拖拽是否可用
    editAble: false, // 是否为编辑状态
    leftList: [], // 左侧列表
    rightList: [], // 右侧列表
    leftLength: 360, // 画板距离左侧的距离
    dashboardLoading: false, // dashboard加载状态
    space: 50, // 模块间的间隔
    requestData: {}, // 后台返回的数据
    dashboardSkin: Local.getSingle(dashboardSkin),
  },
  mutations: {
    // 设置画板的宽高,模块间的间隔
    SET_SIZE(state, info) {
      state.canvasHeight = info.height;
      state.canvasWidth = info.width;
      state.space = info.space;
    },
    // 设置画板是否可以拖拽
    SET_RIGHT_ENABLE(state, info) {
      state.rightEnable = info;
    },
    // 更新左边列表的数组
    UPDATE_LEFT_LIST(state, info) {
      // 非通用模块改为小模块
      info.forEach((v) => {
        const val = v;
        // 判断是否为通用模块
        if (val.name !== 'common') {
          val.size = 'small'; // 非通用模块改为小模块
        } else {
          val.size = 'big';
        }
      });
      state.leftList = info;
    },
    // 更新右边列表的数组
    UPDATE_RIGHT_LIST(state, info) {
      // 判断模块是否超出边界，超出边界移到左边的app列表
      if (info.length > 2) {
        const arr = info;
        // 计算大模块的数量
        let bigNum = 0; // 大模块的数量
        arr.forEach(({
          size,
        }) => {
          if (size === 'big') {
            bigNum += 1;
          }
        });
        // 第二个模块为大模块特殊处理
        if (arr[1].size === 'big') {
          bigNum = 2;
        }
        const index = 4 - bigNum;
        const deleteArr = info.splice(index, info.length - index); // 删除多余的模块
        state.leftList.push(...deleteArr);
      }
      state.rightList = info;
    },
    // 更新dashboard编辑状态
    SET_EDIT_STATUS(state, info) {
      state.editAble = info;
    },
    // 设置画板距离左侧的距离
    SET_LEFT_LENGTH(state, info) {
      state.leftLength = info;
    },
    // 设置dashboard的加载状态
    SET_DASHBOARD_LOADING(state, info) {
      state.dashboardLoading = info;
    },
    // 设置向后台请求返回的数据
    ACTION_REQUEST(state, info) {
      const list = info;
      const updateTime = new Date().getTime();
      const obj = Object.assign({}, state.requestData);
      Object.keys(list).forEach((v) => {
        if (!list[v].lastTimeMsg) {
          list[v].lastTimeMsg = '1秒';
        }
        list[v].updateTime = updateTime;
        obj[v] = list[v];
      });
      state.requestData = obj;
    },
    SET_DASHBOARD_SKIN(state, flag) {
      state.dashboardSkin = flag;
      Local.setSingle(dashboardSkin, flag);
    },
  },
  actions: {
    // 获取dashboard左右列表
    async getDashboardList({
      commit,
    }) {
      commit('SET_DASHBOARD_LOADING', true);
      const result = await window.vaApi.getDashboardList().then(({
        data: {
          status,
          data: {
            iconList,
            blockList,
          },
        },
      }) => {
        // 将后台传来的数据处理成前端需要的
        const formatFrontArr = (arr) => {
          const newArr = [];
          arr.forEach((v) => {
            const val = {};
            val.name = v.deviceType;
            val.size = v.blockState;
            for (let i = 0; i < valueArr.length; i += 1) {
              if (val.name === valueArr[i]) {
                val.name = keyArr[i];
                break;
              }
            }
            if (!val.size) {
              if (val.name !== 'common') {
                val.size = 'small'; // 非通用模块改为小模块
              } else {
                val.size = 'big';
              }
            }
            newArr[v.blockSort] = val;
          });
          return newArr;
        };
        if (parseInt(status, 10) === 1) {
          const leftList = formatFrontArr(iconList) || [];
          const rightList = formatFrontArr(blockList) || [];
          commit('UPDATE_LEFT_LIST', leftList);
          commit('UPDATE_RIGHT_LIST', rightList);
        }
      });
      commit('SET_DASHBOARD_LOADING', false);
      return result;
    },
    // 保存dashboard的数据
    async dashboardSave({
      commit,
      getters,
      dispatch,
    }) {
      commit('SET_DASHBOARD_LOADING', true);
      // 将数据处理成后台需要的
      const formatBackArr = (arr) => {
        const newArr = [];
        arr.forEach((v, index) => {
          const val = {};
          val.deviceType = v.name;
          val.blockSort = index;
          val.blockState = v.size;
          for (let i = 0; i < keyArr.length; i += 1) {
            if (v.name === keyArr[i]) {
              val.deviceType = valueArr[i];
              break;
            }
          }
          newArr.push(val);
        });
        return newArr;
      };

      const iconList = formatBackArr(getters.leftList);
      const blockList = formatBackArr(getters.rightList);
      const result = await window.vaApi.dashboardSave({
        iconList,
        blockList,
      }).then(({
        data: {
          status,
        },
      }) => {
        if (parseInt(status, 10) === 1) {
          Message({
            message: '保存成功！',
            type: 'success',
            duration: 3000,
          });
          commit('SET_EDIT_STATUS', false);
          dispatch('getDashboardList');
        }
      });
      commit('SET_DASHBOARD_LOADING', false);
      return result;
    },
  },
  getters: {
    canvasHeight: state => state.canvasHeight, // 画板的高度
    canvasWidth: state => state.canvasWidth, // 画板的宽度
    cpHeight: state => (state.canvasHeight - state.space) / 2, // 小模块的高度
    cpWidth: state => (state.canvasWidth - state.space - 7) / 2, // 小模块的宽度 减去边框 减去1px冗余
    rightEnable: state => state.rightEnable && state.editAble,
    leftList: state => state.leftList,
    rightList: state => state.rightList,
    editAble: state => state.editAble,
    leftLength: state => state.leftLength,
    dashboardLoading: state => state.dashboardLoading,
    space: state => state.space,
    requestData: state => state.requestData,
    dashboardSkin: state => state.dashboardSkin,
  },
};

export default dashboard;
