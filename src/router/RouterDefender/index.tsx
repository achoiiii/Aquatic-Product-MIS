import { useSelector } from '@/store';
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
const loginRoute = '/login';
const forbidRoute = '/forbid';
export default function RouterDefender(props: any) {
  const location = useLocation();
  const navigate = useNavigate();
  const { children } = props;
  const isLogin = useSelector((state) => state.user.isLogin);
  const userIdentity = useSelector((state) => state.user.identity);
  const publicRoute = ['/forbid', '/home', '/login'];
  useEffect(() => {
    if (!isLogin && location.pathname !== '/login') {
      console.log(isLogin, location.pathname, 'currentPathcurrentPath');

      return navigate(loginRoute);
    } else if (!publicRoute.includes(location.pathname) && userIdentity === 'normal') {
      return navigate(forbidRoute, { state: { prePathname: location.pathname } });
    }
  }, [location.pathname, isLogin]);
  return <>{children}</>;
}
