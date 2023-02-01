import {getStoreData} from '@/utils/anycStore.const';
import {makeAutoObservable} from 'mobx';

interface UserStore {
  userInfo: UserInfo;
}

interface UserInfo {
  gender: string;
  userName: string;
  birthday: string;
  city: string;
  avatar: string;
  lng: string; // 经度
  lat: string; //维度
  address: string; // 详细地址
}

class userStore implements UserStore {
  userInfo: UserInfo;
  constructor() {
    makeAutoObservable(this);
    this.userInfo = {
      gender: 'male',
      userName: '',
      birthday: '',
      city: '',
      avatar: '',
      lng: '', // 经度
      lat: '', //维度
      address: '', // 详细地址
    };
  }

  setInfo = (newInfo: UserInfo) => {
    this.userInfo = newInfo;
  };
}

export default new userStore();
