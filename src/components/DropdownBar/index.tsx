import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import { store, useSelector } from '@/store';

const DropdownBar: React.FC = () => {
  const userName = useSelector((state) => state.user.nickname);
  const handleLogout = () => {
    store.dispatch.user.logout();
  };
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: userName,
      disabled: true,
    },
    {
      type: 'divider',
    },
    {
      key: '2',
      label: <div onClick={handleLogout}>退出登录</div>,
    },
  ];

  return (
    <Dropdown menu={{ items }}>
      <Space>
        <a onClick={(e) => e.preventDefault()}>
          {userName}
          <DownOutlined />
        </a>
      </Space>
    </Dropdown>
  );
};
export default DropdownBar;
