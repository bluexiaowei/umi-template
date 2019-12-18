import context from '@/utils/context';

class LocalStorage {
  constructor(namespace: string) {
    this.data = {};
    this.namespace = namespace;
    this.getLocalStorage();
  }
  data: any = {};
  namespace: string;
  set(name: string, value: any) {
    this.data[name] = value;
    this.setLocalStorage();
    return this;
  }
  get(name: string) {
    return name ? this.data[name] : this.data;
  }
  remove(name: string) {
    delete this.data[name];
    this.setLocalStorage();
    return this;
  }
  clear() {
    this.data = {};
    this.setLocalStorage();
  }
  setLocalStorage() {
    window.localStorage.setItem(this.namespace, JSON.stringify(this.data));
  }
  getLocalStorage() {
    this.data = JSON.parse(window.localStorage.getItem(this.namespace) || '{}');
  }
}

class SessionStorage {
  constructor(namespace: string) {
    this.data = {};
    this.namespace = namespace;
    this.getSessionStorage();
  }
  data: any = {};
  namespace: any;
  set(name: string, value: any) {
    this.data[name] = value;
    this.setSessionStorage();
    return this;
  }
  get(name: string) {
    return name ? this.data[name] : this.data;
  }
  remove(name: string) {
    delete this.data[name];
    this.setSessionStorage();
    return this;
  }
  clear() {
    this.data = {};
    this.setSessionStorage();
  }
  setSessionStorage() {
    window.sessionStorage.setItem(this.namespace, JSON.stringify(this.data));
  }
  getSessionStorage() {
    this.data = JSON.parse(window.sessionStorage.getItem(this.namespace) || '{}');
  }
}

class CookieStorage {
  constructor(namespace: string) {
    this.namespace = namespace;
  }
  namespace = '';
  set(cname: string, cvalue: string, exdays = 1) {
    let d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    var expires = 'expires=' + d.toUTCString();
    document.cookie = `${this.namespace}_${cname}=${cvalue};${expires}`;
    return this;
  }
  get(cname: string) {
    var name = `${this.namespace}_${cname}=`;
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i].trim();
      if (c.indexOf(name) === 0) return c.substring(name.length, c.length);
    }
    return '';
  }
  remove(cname: string) {
    this.set(cname, this.get(cname), -1);
    return this;
  }
  clear() {
    document.cookie = '';
  }
}

class Storage {
  constructor(namespace: string) {
    this.local = new LocalStorage(namespace);
    this.session = new SessionStorage(namespace);
    this.cookie = new CookieStorage(namespace);
  }
  local: any;
  session: any;
  cookie: any;
}

export default new Storage(context.PROJECT_NAME);
