import type { MenuProps } from 'antd';
import { DesktopOutlined, FileOutlined, PieChartOutlined, TeamOutlined } from '@ant-design/icons';
import React from 'react';

type MenuItem = Required<MenuProps>['items'][number];
// 配置信息都写在这里
export default {
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
      icon: <DesktopOutlined />,
      label: '主页',
    },
    {
      key: '/manage',
      icon: <PieChartOutlined />,
      label: '管理',
      children: [
        {
          key: '/manage/apartment',
          label: '部门管理',
        },
      ],
    },
    {
      key: '/chart',
      icon: <TeamOutlined />,
      label: '可视化',
      children: [
        {
          key: '/chart/breed',
          label: '养殖面积',
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
