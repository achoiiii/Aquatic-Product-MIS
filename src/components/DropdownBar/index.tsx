import React, { useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Form, Input, Modal, Space } from 'antd';
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
      <Modal
        title="修改密码"
        open={open}
        onOk={handleModify}
        confirmLoading={confirmLoading}
        cancelText="取消"
        okText="确认修改"
      >
        <Form name="modifyPwd" style={{ padding: '20px' }}>
          <Form.Item label="旧密码" name="oldPassword" rules={[{ required: true, message: '旧密码为空' }]}>
            <Input placeholder="请输入旧密码" allowClear={true} />
          </Form.Item>
          <Form.Item label="新密码" name="newPassword" rules={[{ required: true, message: '新密码为空' }]}>
            <Input placeholder="请输入新密码" allowClear={true} />
          </Form.Item>
        </Form>
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
