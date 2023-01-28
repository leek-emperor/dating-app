import axios, {AxiosRequestConfig} from 'axios';
import {Toast} from '@ant-design/react-native';
import {getStoreData} from '../utils/anycStore.const';

export const baseUrl = 'http://124.70.86.91:3007/api/v1';

const config: AxiosRequestConfig = {
  baseURL: baseUrl,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json',
  },
  //   timeout: 5 * 1000, // 超时设置(单位毫秒)，无超时时间设置为 0。
};
const $axios = axios.create(config);

// 请求拦截
$axios.interceptors.request.use(
  async config => {
    // console.log(config)
    const token = await getStoreData('token');
    if (token !== null) {
      (config.headers as any).set('Authorization', `Bearer ${token}`);
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

$axios.interceptors.response.use(response => {
  const {data} = response;
  if (data.status == 403) {
    Toast.fail({content: '403请求失败', duration: 2});
  }
  if (data.data.code !== 0) {
    Toast.fail({content: data.data.msg, duration: 2});
  }
  return data;
}); // axios响应拦截

export default $axios;
