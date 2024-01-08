import React, { useEffect, useState } from 'react';

const WeatherDetection = () => {
  const [weatherInfo, setWeatherInfo] = useState({});
  useEffect(() => {
    AMap.plugin('AMap.Weather', function () {
      //创建天气查询实例
      var weather = new AMap.Weather();

      //执行实时天气信息查询
      weather.getLive('台山市', function (err, data) {
        if (err) return;
        setWeatherInfo(data);
      });
    });
  }, []);
  return (
    <div>
      <p>气象监测</p>
      <p>当前天气:</p>
      {Object.entries(weatherInfo)}
    </div>
  );
};
export default WeatherDetection;
