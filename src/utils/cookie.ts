import cookieJS from 'js-cookie';
import config from '@/utils/config';

export default {
  remove: cookieJS.remove,
  getJSON: cookieJS.getJSON,
  get: (name: string) => cookieJS.get(`${config.codename}_${name}`),
  set: (
    name: string,
    value: string | object,
    opt?: cookieJS.CookieAttributes,
  ) => cookieJS.set(`${config.codename}_${name}`, value, opt),
};
