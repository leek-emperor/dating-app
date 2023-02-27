import $axios from './baseServices';
import {CommonAxiosReponse} from './types';

// 鉴权接口
export const authVerification = (): Promise<CommonAxiosReponse> => {
  return $axios.get('/auth/verify');
};
