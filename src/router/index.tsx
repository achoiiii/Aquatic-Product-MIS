import React from "react";
import { Navigate } from "react-router-dom";
import Home from "../views/Home";
import About from "../views/About";
import View from "../views/index";
import Apartment from "@/views/Apartment";

/**
 * 路由表
 * View是布局
 * 子路由是展示的视图
 */
const routes = [
  {
    path: "/",
    element: <Navigate to="/home" />,
  },
  {
    path: "/",
    element: <View />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/manage",
        children: [
          {
            path: "/manage/apartment",
            element: <Apartment />,
          },
        ],
      },
    ],
  },
  // 兜底路由
  {
    path: "*",
    element: <Navigate to="/home" />,
  },
];
export default routes;
