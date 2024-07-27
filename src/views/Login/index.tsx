import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import './index.scss';
import { dispatch } from '@/store';

const Login = () => {
  const navigateTo = useNavigate();
  const onFinish = (values: any) => {
    dispatch.user.login(values).then((res) => {
      if (res.code === 200) {
        const userInfo = res.data;
        dispatch.user.update({ isLogin: true, ...userInfo });
        navigateTo('/home');
        message.success({
          duration: 2,
          content: '登录成功。',
        });
      } else {
        message.error({
          duration: 2,
          content: '登录失败，请检查您的用户名与密码是否正确。',
        });
      }
    });
  };
  return (
    <div className="login-page">
      <div className="login-page-container">
        <Form name="normal_login" className="login-form" initialValues={{ remember: true }} onFinish={onFinish}>
          <div className="login-title">登录</div>

          <Form.Item name="username" rules={[{ required: true, message: '请输入你的用户名!' }]}>
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" allowClear={true} />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: '请输入你的密码!' }]}>
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              allowClear={true}
              placeholder="密码"
            />
          </Form.Item>
          {/* <Form.Item className="captcha-box">
            <Form.Item name="captcha" noStyle>
              <Input
                prefix={<InfoCircleOutlined className="site-form-item-icon" />}
                type="captcha"
                allowClear={true}
                placeholder="验证码"
                className="captcha-input"
              />
            </Form.Item>
            <Form.Item name="captchaImg" noStyle>
              <img src={captchaImg} onClick={changeCaptchaImg} className="captcha-img" />
            </Form.Item>
          </Form.Item> */}
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
export default Login;
