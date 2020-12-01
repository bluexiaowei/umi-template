import store from 'store';
import config from '@/utils/config';

export default {
  each: store.each,
  remove: store.remove,
  clearAll: store.clearAll,
  addPlugin: store.addPlugin,
  namespace: store.namespace,
  createStore: store.createStore,
  hasNamespace: store.hasNamespace,

  get: (name: string, optionalDefaultValue?: any) =>
    store.get(`${config.codename}_${name}`, optionalDefaultValue),
  set: (name: string, value: any) =>
    store.set(`${config.codename}_${name}`, value),
};
