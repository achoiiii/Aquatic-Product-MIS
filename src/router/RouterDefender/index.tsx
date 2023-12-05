import { useSelector } from '@/store';
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
const loginRoute = '/login';
const forbidRoute = '/forbid';
export default function RouterDefender(props: any) {
  const location = useLocation();
  const navigate = useNavigate();
  const { children } = props;
  const isLogin = useSelector((state) => state.user.isLogin);
  const userIdentity = useSelector((state) => state.user.identity);
  if (!isLogin && location.pathname !== '/login') {
    return navigate(loginRoute);
    // TODO: 权限控制路由守卫
  } else if (location.pathname !== '/forbid' && location.pathname !== '/home' && userIdentity === 'normal') {
    return navigate(forbidRoute, { state: { prePathname: location.pathname } });
  }
  return <>{children}</>;
}
