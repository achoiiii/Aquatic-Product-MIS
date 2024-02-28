import React, { useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Modal, Space } from 'antd';
import { store, useSelector } from '@/store';

const DropdownBar: React.FC = () => {
  const userName = useSelector((state) => state.user.nickname);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const handleLogout = () => {
    store.dispatch.user.logout();
  };
  const handleModify = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
    }, 2000);
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
      label: <div onClick={() => setOpen(true)}>修改密码</div>,
    },
    {
      key: '3',
      label: <div onClick={handleLogout}>退出登录</div>,
    },
  ];

  return (
    <div id="drow-down-bar">
      <Modal title="Title" open={open} onOk={handleModify} confirmLoading={confirmLoading}>
        {' '}
        <p>修改密码</p>
      </Modal>
      <Dropdown menu={{ items }}>
        <Space>
          <a onClick={(e) => e.preventDefault()}>
            {userName}
            <DownOutlined />
          </a>
        </Space>
      </Dropdown>
    </div>
  );
};
export default DropdownBar;
