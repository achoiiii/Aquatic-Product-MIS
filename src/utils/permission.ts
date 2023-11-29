import { IAuthButtonProps } from '@/components/AuthButton/typing';
import { Identity } from '@/store/models/user/typings';

export function getPermission(auth: IAuthButtonProps['auth'], userIdentity: Identity) {
  if (!auth || auth.length === 0 || userIdentity === 'top-admin') return false;
  if (auth.includes(userIdentity) || auth.includes('normal')) return false;
  return true;
}
