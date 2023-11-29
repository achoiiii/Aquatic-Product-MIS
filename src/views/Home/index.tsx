import { getUserInfo } from '@/request/mock';
import { useSelector, store } from '@/store';
import React, { useEffect, useState } from 'react';
import './index.scss';
import AuthButton from '@/components/AuthButton';
const Home = () => {
  const num = useSelector((state) => state.count.num);
  const [image, setImage] = useState('');
  useEffect(() => {
    getUserInfo().then((res) => {
      setImage(res.data.message);
    });
  }, []);
  function handleClick() {
    store.dispatch.count.incrementAsync(2);
  }
  return (
    <div id="home-view">
      <p onClick={handleClick}>Home</p>
      <p>{num}</p>
      <img src={image} alt="" />
      <AuthButton type="default" onClick={() => console.log(111)} text="1111" auth={['admin']} />
    </div>
  );
};
export default Home;
