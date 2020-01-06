import * as API from '@/services/user';
import storage from '@/utils/storage';
import context from '@/utils/context';
import { Model } from 'dva';
import router from 'umi/router';
import * as TS from './user.d';
import { Action, Res } from '@/common/type';

const defState: TS.ModelState = {
  projectName: context.PROJECT_NAME,
};

const model: Model = {
  namespace: 'user',

  state: defState,

  effects: {
    // 用户登录
    *signin({ payload }: Action, { call, put }) {
      /**
       * 1. 用户登录
       * 2. 判断用户是否有登录权限
       * 2. 设置 token
       * 3. 存储用户信息
       * 4. 跳转路由
       */
      const res: Res = yield call(API.signin, payload);

      if (!res.success) {
        throw res.message;
      }

      const { token } = res.data;

      storage.cookie.set('token', token, 0.5);

      yield put({ type: 'STATE', payload: { user: res.data } });
    },
    // 用户退出登录
    *logout(__, { put }) {
      /**
       * 1. 清空 token
       * 2. 清空 namespace
       * 3. 跳转登录
       */
      storage.cookie.set('token', '');

      yield put({ type: 'RESET_ALL' });

      router.push('/signin');
    },

    *getUserInfo({ payload }, { put, call }) {
      const res: Res = yield call(API.getUserInfo, payload);

      if (!res.success) {
        throw res.message;
      }

      const { token } = res.data;

      storage.cookie.set('token', token, 0.5);

      yield put({ type: 'STATE', payload: { user: res.data } });
    },
  },

  reducers: {
    STATE(state, { payload }: Action) {
      return { ...state, ...payload };
    },
  },

  subscriptions: {
    init({ dispatch, history }) {
      if (context.IGNORE_PATH[0] === '*') {
        storage.cookie.set('token', 'true');
      }

      // 没有 token 就登录
      if (!storage.cookie.get('token')) {
        history.push('/signin');
      }

      // 监听路由判断是否需要登录
      history.listen(({ pathname }) => {
        if (context.IGNORE_PATH[0] === '*') {
          return;
        }
        // 判断该路径是否需要判断登录
        if (context.IGNORE_PATH.some(item => new RegExp(item, 'g').test(pathname))) return;

        // 如果不存在 token
        if (!storage.cookie.get('token')) {
          dispatch({ type: 'user/logout' });

          router.push('/signin');
        }
      });
    },
  },
};

export default model;
