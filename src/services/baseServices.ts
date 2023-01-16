import axios, {AxiosRequestConfig} from 'axios';
import {getStoreData} from '../utils/anycStore.const';

export const baseUrl = 'http://124.70.86.91:3007/api/v1';

const config: AxiosRequestConfig = {
  baseURL: baseUrl,
  //   timeout: 5 * 1000, // 超时设置(单位毫秒)，无超时时间设置为 0。
};
const $axios = axios.create(config);

// 请求拦截
$axios.interceptors.request.use(
  config => {
    const token = getStoreData('token');
    // if (token !== null) {
    //   (config.headers as any).set('Authorization', `Bearer ${token}`);
    // }
    console.log('请求拦截');
    return config;
  },
  error => {
    console.log('请求拦截失败');
    return Promise.reject(error);
  },
);

$axios.interceptors.response.use(response => {
  console.log('响应拦截');
  const {data} = response;
  if (data.status == 403) {
    console.log('403请求失败');
  }
  return data;
}); // axios响应拦截

export default $axios;
