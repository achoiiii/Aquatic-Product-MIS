import { Button } from 'antd';
import React from 'react';
import { IAuthButtonProps } from './typing';
import { useSelector } from '@/store';
import { Identity } from '@/store/models/user/typings';
// 封装antd按钮，带权限控制
function AuthButton(props: Partial<IAuthButtonProps>) {
  const { auth = [], text } = props;
  const userIdentity = useSelector((state) => state.user.identity);
  const disabled = getDisabled(auth, userIdentity);

  return (
    <Button {...props} disabled={disabled}>
      {text}
    </Button>
  );
}
function getDisabled(auth: IAuthButtonProps['auth'], userIdentity: Identity) {
  if (!auth || auth.length === 0 || userIdentity === 'top-admin') return false;
  if (auth.includes(userIdentity) || auth.includes('normal')) return false;
  return true;
}
export default AuthButton;
