import React from 'react';
import { Navigate } from 'react-router-dom';
import Home from '../views/Home';
import About from '../views/About';
import View from '../views/index';
import Apartment from '@/views/Apartment';
import Login from '@/views/Login';
import Forbid from '@/views/Forbid';
import FeedManage from '@/views/FeedManage';
import FishManage from '@/views/FishManage';
import MedicineManage from '@/views/MedicineManage';
import PoolManage from '@/views/PoolManage';
import StaffManage from '@/views/StaffManage';
import FeedLog from '@/views/FeedLog';
import FishLog from '@/views/FishLog';
import HealthLog from '@/views/HealthLog';
import MedicineLog from '@/views/MedicineLog';
import ProcessLog from '@/views/ProcessLog';
import SellLog from '@/views/SellLog';
import WaterDetection from '@/views/WaterDetection';
import WeatherDetection from '@/views/WeatherDetection';

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
        path: '/manage',
        children: [
          {
            path: '/manage/apartment',
            element: <Apartment />,
          },
          {
            path: '/manage/staff',
            element: <StaffManage />,
          },
          {
            path: '/manage/pool',
            element: <PoolManage />,
          },
          {
            path: '/manage/fish',
            element: <FishManage />,
          },
          {
            path: '/manage/feed',
            element: <FeedManage />,
          },
          {
            path: '/manage/medicine',
            element: <MedicineManage />,
          },
        ],
      },
      {
        path: '/log',
        children: [
          {
            path: '/log/fish',
            element: <FishLog />,
          },
          {
            path: '/log/feed',
            element: <FeedLog />,
          },
          {
            path: '/log/medicine',
            element: <MedicineLog />,
          },
          {
            path: '/log/health',
            element: <HealthLog />,
          },
          {
            path: '/log/process',
            element: <ProcessLog />,
          },
          {
            path: '/log/sell',
            element: <SellLog />,
          },
        ],
      },
      {
        path: '/detection',
        children: [
          {
            path: '/detection/water',
            element: <WaterDetection />,
          },
          {
            path: '/detection/weather',
            element: <WeatherDetection />,
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
