import React, { useState } from 'react';
import { CheckOutlined, DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Form, Input, Modal, Space, message } from 'antd';
import { dispatch, useSelector } from '@/store';
import { useNavigate } from 'react-router-dom';
import request from '@/request';
import { encrypt } from '@/utils/encrypt';
import modal from 'antd/es/modal';

const DropdownBar: React.FC = () => {
  const userName = useSelector((state) => state.user.name);
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const userNo = useSelector((state) => state.user.userId);
  const navigateTo = useNavigate();
  const handleLogout = () => {
    dispatch.user.logout().then((res) => {
      navigateTo('/login');
    });
  };
  const handleModify = () => {
    setConfirmLoading(true);
    form.validateFields().then((res: { oldPassword: string; password: string }) => {
      request.user
        .modifyPassword({
          userNo,
          oldPassword: encrypt(res.oldPassword).toString(),
          password: encrypt(res.password).toString(),
        })
        .then((res) => {
          if (res.code === 200) {
            modal.success({
              title: '修改成功',
              icon: <CheckOutlined />,
              content: '请重新登录',
              okText: '确认',
              onOk: () => {
                handleLogout();
                setOpen(false);
              },
            });
          } else if (res.code === 201) {
            message.error('密码错误', 2);
          }
        });
    });
    setConfirmLoading(false);
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
        onCancel={() => setOpen(false)}
      >
        <Form name="modifyPwd" style={{ padding: '20px' }} form={form}>
          <Form.Item label="旧密码" name="oldPassword" rules={[{ required: true, message: '旧密码为空' }]}>
            <Input type="password" placeholder="请输入旧密码" allowClear={true} />
          </Form.Item>
          <Form.Item label="新密码" name="password" rules={[{ required: true, message: '新密码为空' }]}>
            <Input type="password" placeholder="请输入新密码" allowClear={true} />
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
