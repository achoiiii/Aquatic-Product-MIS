import { InfoCircleOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import './index.scss';

const Login = () => {
  const navigateTo = useNavigate();
  const onFinish = (values: any) => {
    // TODO: 请求接口
    console.log('Received values of form: ', values);
    navigateTo('/home');
  };
  const captchaImg =
    'data:image/gif;base64,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';
  // TODO:切换验证码
  function changeCaptchaImg() {}
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
          <Form.Item className="captcha-box">
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
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>记住我</Checkbox>
            </Form.Item>
          </Form.Item>

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
