import CryptoJS from 'crypto-js';

export function encrypt(str: string | any) {
  return CryptoJS.MD5(str);
}
