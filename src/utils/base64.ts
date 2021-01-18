export default {
  encode: (str: string) => {
      // 编码
    return window.btoa(str);
  },
  decode: (str: string) => {
      // 解码
    return window.atob(str);
  },
};
