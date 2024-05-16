import AuthButton from '@/components/AuthButton';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();
  return (
    <div>
      <p style={{ padding: '40px' }}>
        台山市共荣食品有限公司：成立于2006年5月，位于广东省台山市端芬镇龙山工业区，注册资本2080万元，现有职工180人，其中技术及管理人26人。主要生产冷冻烤鳗及其制品，年产量达800吨，产值上亿元。
      </p>
      <img src="https://a.300.cn/case/20180515/5afa9c0b97b48.jpg" alt="" />
    </div>
  );
};
export default About;
