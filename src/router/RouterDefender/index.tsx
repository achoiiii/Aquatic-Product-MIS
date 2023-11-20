import { useSelector } from "@/store";
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
const loginRoute = "/login";
export default function RouterDefender(props: any) {
  const location = useLocation();
  const { children } = props;
  const isLogin = useSelector((state) => state.user.isLogin);
  if (!isLogin && location.pathname !== "/login") {
    return <Navigate to={loginRoute}></Navigate>;
  } else {
    // 其他路由均可正常跳转
    return <>{children}</>;
  }
}
