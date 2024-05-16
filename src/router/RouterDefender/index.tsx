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
  const userType = useSelector((state) => state.user.type);
  const publicRoute = ['/forbid', '/home', '/login', '/poolSheet', '/siteSheet', '/log', '/about'];
  useEffect(() => {
    const authRoute = publicRoute.find((item) => location.pathname.includes(item));
    if (!isLogin && location.pathname !== '/login') {
      return navigate(loginRoute);
    } else if (!authRoute && userType !== 0) {
      return navigate(forbidRoute, { state: { prePathname: location.pathname } });
    }
  }, [location.pathname, isLogin]);
  return <>{children}</>;
}
