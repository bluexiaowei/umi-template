import format from 'Utils/format';
// import services from './services';

const defState = {};

export default {
  namespace: 'signin',
  state: defState,
  effects: {
    *login({ payload }, { call }) {
      // const sendRules = [{ name: 'account' }, { name: 'password' }];
      // const res = yield call(services.login, format(payload, sendRules));
      // if (res.success) {
      //   return res.data;
      // } else {
      //   throw res.message;
      // }
    },
  },
};
