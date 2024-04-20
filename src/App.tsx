import React, { useEffect } from 'react';
import router from './router';
import { useLocation, useNavigate, useRoutes } from 'react-router-dom';
import { dispatch } from './store';
import { message } from 'antd';

function App() {
  const navigateTo = useNavigate();
  const location = useLocation();
  // 检验登录状态
  useEffect(() => {
    const token = document.cookie
      .split(';')
      .find((item) => item.includes('token='))
      ?.split('=')[1];
    if (token)
      dispatch.user.login({ username: '', password: '', token }).then((res) => {
        if (res.code === 200) {
          const userInfo = res.data;
          dispatch.user.update({ isLogin: true, ...userInfo });
          navigateTo(location.pathname);
          message.success({
            duration: 2,
            content: '登录成功。',
          });
        }
      });
  }, []);
  const routes = useRoutes(router);
  return <div className="app">{routes}</div>;
}

export default App;
