import format from 'Utils/format';
import services from './services';

const defState = {};

export default {
  namespace: 'signin',
  state: defState,
  effects: {
    *login({ payload }, { call, put }) {
      const sendRules = [{ name: 'account' }, { name: 'password' }];
      const response = yield call(services.login, format(payload, sendRules));
      console.log(response);
      // return;
      const { success, data, message } = response;
      if (success) {
        // storage.local.set('user', data);
        // storage.cookie.remove('token').set('token', data.token, 0.5);
        // yield put({ type: 'app/STATE', payload: { user: data } });
        return data;
      } else {
        throw message;
      }
    },
  },
};
