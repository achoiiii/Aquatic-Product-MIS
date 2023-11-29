import { Button } from 'antd';
import React from 'react';
import { IAuthButtonProps } from './typing';
import { useSelector } from '@/store';
import { getPermission } from '@/utils/permission';
// 封装antd按钮，带权限控制
function AuthButton(props: Partial<IAuthButtonProps>) {
  const { auth = [], text } = props;
  const userIdentity = useSelector((state) => state.user.identity);
  const disabled = getPermission(auth, userIdentity);

  return (
    <Button {...props} disabled={disabled}>
      {text}
    </Button>
  );
}
export default AuthButton;
