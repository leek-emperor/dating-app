import $axios from './baseServices';
import {CommonAxiosReponse} from './types';

export const friendVistors = (): Promise<CommonAxiosReponse> => {
  return $axios.get('/social/friendVistors');
};

export const friendTodayBeatuy = (): Promise<CommonAxiosReponse> => {
  return $axios.get('/social/friendTodayBeatuy');
};

export const getRecommendation = (params): Promise<CommonAxiosReponse> => {
  return $axios.get('/social/recommendation', {params});
};

export const exploration = (): Promise<CommonAxiosReponse> => {
  return $axios.get('/social/exploration');
};
