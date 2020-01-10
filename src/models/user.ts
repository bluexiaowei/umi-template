import { Action, Res } from '@/common/type';
import * as API from '@/services/user';
import context from '@/utils/context';
import isIgnorePath from '@/utils/isIgnorePath';
import storage from '@/utils/storage';
import { Model } from 'dva';
import router from 'umi/router';
import * as TS from './user.d';
import _ from 'lodash';

const defState: TS.ModelState = {
  projectName: context.PROJECT_NAME,
};

const model: Model = {
  namespace: 'user',

  state: defState,

  effects: {
    *signin({ payload }: Action, { call, put }) {
      const res: Res = yield call(API.signin, payload);

      if (!res.success) {
        throw res.message;
      }

      const { data } = res;

      storage.cookie.set('token', data.token, 0.5);

      yield put({ type: 'STATE', payload: { user: data } });
    },

    *logout(__, { put }) {
      router.push('/signin');

      storage.cookie.set('token', '');

      yield put({ type: 'RESET_ALL' });
    },

    *getUserInfo({ payload }, { put, call }) {
      const res: Res = yield call(API.getUserInfo, payload);

      if (!res.success) {
        throw res.message;
      }

      const { data } = res;

      storage.cookie.set('token', data.token, 0.5);

      yield put({ type: 'STATE', payload: { user: data } });
    },
  },

  reducers: {
    STATE(state, { payload }: Action) {
      return { ...state, ...payload };
    },
  },

  subscriptions: {
    init({ history }) {
      if (isIgnorePath()) {
        storage.cookie.set('token', 'true');
      }

      if (isIgnorePath(history.location.pathname)) return;

      if (_.isEmpty(storage.cookie.get('token'))) {
        // 没有 token 就登录
        const { location } = history;

        history.push({ pathname: '/signin', search: `form=${location.pathname}` });
      }
    },
  },
};

export default model;
