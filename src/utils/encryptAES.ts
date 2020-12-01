import CryptoJS from 'crypto-js';
var key = CryptoJS.enc.Utf8.parse('danube#srt#12345');
var iv = CryptoJS.enc.Utf8.parse('danube#srt#12345');
export default (val: string) => {
  return CryptoJS.AES.encrypt(val, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
  }).toString();
};
