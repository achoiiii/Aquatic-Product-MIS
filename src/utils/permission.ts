import { IAuthButtonProps } from '@/components/AuthButton/typing';
import { store } from '@/store';

export function getPermission(auth: IAuthButtonProps['auth']) {
  const userIdentity = store.getState().user.identity;
  if (!auth || auth.length === 0 || userIdentity === 'top-admin') return true;
  if (auth.includes(userIdentity) || auth.includes('normal')) return true;
  return false;
}
