import AuthButton from '@/components/AuthButton';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();
  return (
    <div>
      <p>About</p>
      <AuthButton type="default" onClick={() => navigate('/')} text="1111" auth={['admin']} />
    </div>
  );
};
export default About;
