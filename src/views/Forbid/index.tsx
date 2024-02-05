import React from 'react';
import './index.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Result } from 'antd';

function Forbid() {
  const { prePathname } = useLocation().state;
  const navigateTo = useNavigate();
  return (
    <Result
      status="403"
      title="403"
      subTitle={`你没有访问${prePathname}的权限，如需访问请联系管理员`}
      extra={
        <Button type="primary" onClick={() => navigateTo('/home')}>
          回到主页
        </Button>
      }
    />
  );
}
export default Forbid;
