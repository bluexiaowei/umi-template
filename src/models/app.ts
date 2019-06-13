import storage from '@/Utils/storage';
const defState = {
  user: {},
};
export default {
  namespace: 'app',
  state: defState,
  effects: {
    *signout(_, { put }) {
      storage.cookie.remove('token');
      storage.local.clear();
      yield put({ type: 'RESET' });
    },
  },
  reducers: {
    STATE(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  subscriptions: {
    init({ dispatch, history }) {
      dispatch({ type: 'app/STATE', payload: { user: storage.local.get('user') } });
      history.listen(({ pathname }) => {
        if (!['/signin'].includes(pathname)) {
          const user = storage.local.get('user');
          if (!storage.cookie.get('token') || !user || !user.token) {
            history.push('/signin');
          }
        }
      });
    },
  },
};
