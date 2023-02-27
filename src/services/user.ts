import $axios from './baseServices';
import {CommonAxiosReponse} from './types';

export const userLogin = (phone: string): Promise<CommonAxiosReponse> => {
  console.log({phone});
  return $axios.post('/user/login', {phone});
};

export const loginVerification = (
  phone: string,
  verifyCode: string,
): Promise<CommonAxiosReponse> => {
  return $axios.post('/user/loginVerification', {phone, verifyCode});
};

// setUserInfo
export const setUserInfo = (newInfo: object): Promise<CommonAxiosReponse> => {
  return $axios.post('/setInfo/setUserInfo', newInfo);
};
