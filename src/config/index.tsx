import type { MenuProps } from 'antd';
import { FileOutlined, FileTextOutlined, HomeOutlined, PieChartOutlined, TeamOutlined } from '@ant-design/icons';
import React from 'react';

type MenuItem = Required<MenuProps>['items'][number];
// 配置信息都写在这里
export default {
  // 前端版本
  VERSION: import.meta.env.VITE_PROJECT_VERSION,
  // 接口域名
  serviceUrl: {
    baseURL: 'http://localhost:3000',
    member: 'http://localhost:3000',
    dog: 'https://dog.ceo',
  },
  // 接口通用参数配置
  serviceInfo: {},
  // 菜单
  menuItems: [
    {
      key: '/home',
      icon: <HomeOutlined />,
      label: '主页',
    },
    {
      key: '/manage',
      icon: <TeamOutlined />,
      label: '档案管理',
      children: [
        {
          key: '/manage/apartment',
          label: '部门管理',
        },
        {
          key: '/manage/staff',
          label: '员工管理',
        },
        {
          key: '/manage/pool',
          label: '塘池管理',
        },
        {
          key: '/manage/fish',
          label: '鱼种管理',
        },
        {
          key: '/manage/feed',
          label: '饲料管理',
        },
        {
          key: '/manage/medicine',
          label: '鱼药管理',
        },
      ],
    },
    {
      key: '/log',
      icon: <FileTextOutlined />,
      label: '记录管理',
      children: [
        {
          key: '/log/fish',
          label: '鱼种投放记录',
        },
        {
          key: '/log/feed',
          label: '饲料投放记录',
        },
        {
          key: '/log/medicine',
          label: '鱼药投放记录',
        },
        {
          key: '/log/health',
          label: '防疫卫生记录',
        },
        {
          key: '/log/process',
          label: '加工记录',
        },
        {
          key: '/log/sell',
          label: '销售记录',
        },
      ],
    },
    {
      key: '/detection',
      icon: <PieChartOutlined />,
      label: '养殖环境监测',
      children: [
        {
          key: '/detection/water',
          label: '水质监测',
        },
        {
          key: '/detection/weather',
          label: '气象监测',
        },
      ],
    },
    {
      key: '/about',
      icon: <FileOutlined />,
      label: '关于',
    },
  ] as MenuItem[],
};
