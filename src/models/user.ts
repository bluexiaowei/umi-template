import * as API from '@/services/user';
import storage from '@/utils/storage';
import context from '@/utils/context';
import { Model } from 'dva';
import router from 'umi/router';
import * as TS from './user.d';

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
      const res: { success: boolean; message: string; data: TS.ResSignin } = yield call(
        API.signin,
        payload,
      );

      if (!res.success) {
        throw res.message;
      }

      const { applications, token } = res.data;

      // 更具该项目在鉴权中的名字
      if (!allowSignin(applications, context.AUTH_NAME)) {
        throw '您没有权限登录，请联系管理员';
      }

      yield put({ type: 'STATE', payload: { user: res.data } });

      storage.cookie.set('token', token, 0.5);

      storage.local.set('user', res.data);
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
  },

  reducers: {
    STATE(state, { payload }: Action) {
      return { ...state, ...payload };
    },
  },

  subscriptions: {
    init({ dispatch, history }) {
      /**
       * 1. 监听路由
       * 2. 判断用户是否登录
       * 3. 获取用户信息
       * 问题：会出现路由闪动
       */

      // 没有 token 就登录
      if (!storage.cookie.get('token')) {
        history.push('/signin');
      }

      const user: TS.ResSignin | null = storage.local.get('user');

      if (!(user && allowSignin(user.applications, context.AUTH_NAME))) {
        history.push('/signin');
      } else {
        dispatch({ type: 'STATE', payload: { user } });
      }

      // 监听路由判断是否需要登录
      history.listen(({ pathname }) => {
        const ignorPath: string[] = ['/signin'];
        // console.log(1234);
        if (ignorPath.some(item => new RegExp(item, 'g').test(pathname))) return;
        const user: TS.ResSignin = storage.local.get('user');

        if (!storage.cookie.get('token') || !allowSignin(user.applications, context.AUTH_NAME)) {
          router.push('/signin');
          return;
        }
      });
    },
  },
};

// 判断是否有登录权限
function allowSignin(applications: TS.Application[], applicationName: string): boolean {
  if (applications.length === 0) return true;

  for (let i = 0, len = applications.length; i < len; i++) {
    if (applications[i].name === applicationName) {
      return true;
    }
  }

  return false;
}

export default model;
