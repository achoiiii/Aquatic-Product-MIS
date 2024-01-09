import type { MenuProps } from 'antd';
import { ClockCircleOutlined, FileOutlined, FileTextOutlined, HomeOutlined } from '@ant-design/icons';
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
      key: '/sheet',
      icon: <FileTextOutlined />,
      label: '报表管理',
      children: [
        {
          key: '/sheet/feed',
          label: '投料及损耗',
        },
        {
          key: '/sheet/fish',
          label: '分塘',
        },
        {
          key: '/sheet/sale',
          label: '销售报表',
        },
        {
          key: '/sheet/loss',
          label: '清塘损耗',
        },
        {
          key: '/sheet/stock',
          label: '存塘统计',
        },
        {
          key: '/sheet/summary',
          label: '汇总报表',
        },
      ],
    },
    {
      key: '/log',
      icon: <ClockCircleOutlined />,
      label: '操作记录',
      children: [
        {
          key: '/log/feed',
          label: '投料记录',
        },
      ],
    },
    {
      key: '/about',
      icon: <FileOutlined />,
      label: '关于',
    },
  ] as MenuItem[],
  // 场/塘数组对象 TODO
  fisheryNPool: {
    first: [],
  },
};
