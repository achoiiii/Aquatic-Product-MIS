import React from 'react';
import { Navigate } from 'react-router-dom';
import Home from '../views/Home';
import About from '../views/About';
import View from '../views/index';
import Login from '@/views/Login';
import Forbid from '@/views/Forbid';
import FeedManage from '@/views/FeedManage';
import FeedSheet from '@/views/FeedSheet';
import TransferSheet from '@/views/TransferSheet';
import LossSheet from '@/views/LossSheet';
import SaleSheet from '@/views/SaleSheet';
import StockSheet from '@/views/PoolStockSheet';
import SummarySheet from '@/views/SummarySheet';
import SitePoolManage from '@/views/SitePoolManage';
import CoefficientManage from '@/views/CoefficientManage';
import PoolSummarySheet from '@/views/PoolSummarySheet';
import SiteStockSheet from '@/views/SiteStockSheet';

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
        path: '/poolSheet',
        children: [
          {
            path: '/poolSheet/feed',
            element: <FeedSheet />,
          },
          {
            path: '/poolSheet/transfer',
            element: <TransferSheet />,
          },
          {
            path: '/poolSheet/sale',
            element: <SaleSheet />,
          },
          {
            path: '/poolSheet/loss',
            element: <LossSheet />,
          },
          {
            path: '/poolSheet/stock',
            element: <StockSheet />,
          },
          {
            path: '/poolSheet/summary',
            element: <PoolSummarySheet />,
          },
        ],
      },
      {
        path: '/siteSheet',
        children: [
          {
            path: '/siteSheet/stock',
            element: <SiteStockSheet />,
          },
          {
            path: '/siteSheet/summary',
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
      {
        path: '/data',
        children: [
          {
            path: '/data/sitePool',
            element: <SitePoolManage />,
          },
          {
            path: '/data/coefficient',
            element: <CoefficientManage />,
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
