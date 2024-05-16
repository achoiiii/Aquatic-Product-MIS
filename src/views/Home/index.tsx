import React, { useEffect, useState } from 'react';
import './index.scss';
import request from '@/request';
const Home = () => {
  useEffect(() => {
    // request.sheet.feedLoss.getSiteFeedSheetData({ date: ['2024-03-29', '2024-04-07'] });
  });
  return (
    <div id="home-view">
      <img src="https://a.300.cn/case/20180515/5afa9c0d9cd43.jpg" alt="" />
    </div>
  );
};
export default Home;
