import { Button } from 'antd';
import React from 'react';
import { IAuthButtonProps } from './typing';
import { getPermission } from '@/utils/permission';
// 封装antd按钮，带权限控制
function AuthButton(props: Partial<IAuthButtonProps>) {
  const { auth = [], text } = props;
  const disabled = !getPermission(auth);

  return (
    <Button {...props} disabled={disabled}>
      {text}
    </Button>
  );
}
export default AuthButton;
