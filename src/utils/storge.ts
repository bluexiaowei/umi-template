import store from 'store';
import config from '@/utils/config';

export default {
  each: store.each,
  clearAll: store.clearAll,
  addPlugin: store.addPlugin,
  namespace: store.namespace,
  createStore: store.createStore,
  hasNamespace: store.hasNamespace,

  get(name: string, optionalDefaultValue?: any) {
    return store.get(`${config.codename}_${name}`, optionalDefaultValue);
  },
  set(name: string, value: any) {
    return store.set(`${config.codename}_${name}`, value);
  },
  remove(name: string) {
    return store.remove(`${config.codename}_${name}`);
  },
};
