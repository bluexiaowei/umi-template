import cookieJS from 'js-cookie';
import config from '@/utils/config';

export default {
  remove(name: string, opt?: cookieJS.CookieAttributes) {
    return cookieJS.remove(`${config.codename}_${name}`, opt);
  },
  getJSON: cookieJS.getJSON,
  get(name: string) {
    return cookieJS.get(`${config.codename}_${name}`);
  },
  set(name: string, value: string | object, opt?: cookieJS.CookieAttributes) {
    return cookieJS.set(`${config.codename}_${name}`, value, opt);
  },
};
