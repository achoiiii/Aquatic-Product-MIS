import axios from 'axios';
import config from '@/config';
const instance = axios.create({
  baseURL: config.serviceUrl.baseURL, // API 的基础 URL
  timeout: 5000, // 请求超时时间（单位：毫秒）
  headers: {
    'Content-Type': 'application/json', // 请求头部信息
  },
});
// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
  });
export default instance;