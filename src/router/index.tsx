import React from 'react';
import { Navigate } from 'react-router-dom';
import Home from '../views/Home';
import About from '../views/About';
import View from '../views/index';
import Login from '@/views/Login';
import Forbid from '@/views/Forbid';
import FeedManage from '@/views/FeedManage';
import FeedSheet from '@/views/FeedSheet';
import FishSheet from '@/views/FishSheet';
import LossSheet from '@/views/LossSheet';
import SaleSheet from '@/views/SaleSheet';
import StockSheet from '@/views/StockSheet';
import SummarySheet from '@/views/SummarySheet';

/**
 * 路由表
 * View是布局
 * 子路由是展示的视图
 */
const routes = [
  {
    path: '/',
    element: <Navigate to="/home" />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: <View />,
    children: [
      {
        path: '/forbid',
        element: <Forbid />,
      },
      {
        path: '/home',
        element: <Home />,
      },
      {
        path: '/about',
        element: <About />,
      },
      {
        path: '/sheet',
        children: [
          {
            path: '/sheet/feed',
            element: <FeedSheet />,
          },
          {
            path: '/sheet/fish',
            element: <FishSheet />,
          },
          {
            path: '/sheet/sale',
            element: <SaleSheet />,
          },
          {
            path: '/sheet/loss',
            element: <LossSheet />,
          },
          {
            path: '/sheet/stock',
            element: <StockSheet />,
          },
          {
            path: '/sheet/summary',
            element: <SummarySheet />,
          },
        ],
      },
      {
        path: '/log',
        children: [
          {
            path: '/log/feed',
            element: <FeedManage />,
          },
        ],
      },
    ],
  },
  // 兜底路由
  {
    path: '*',
    element: <Navigate to="/home" />,
  },
];
export default routes;
