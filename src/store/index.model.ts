import {authVerification} from '@/services/auth';
import {setUserInfo} from '@/services/user';
import {getStoreData} from '@/utils/anycStore.const';
import {makeAutoObservable, runInAction} from 'mobx';

interface UserStore {
  userInfo: UserInfo;
  isAuth: boolean;
  getAuth: () => void;
  setInfoValue: (addValue: object) => void;
  submitUserInfo: (newInfo: object) => void;
}

interface UserInfo {
  gender: string;
  userName: string;
  birthday: Date;
  position: string;
  avatar: string;
  lng: string; // 经度
  lat: string; //维度
  address: string; // 详细地址
}

class userStore implements UserStore {
  isAuth = true;
  userInfo: UserInfo = {
    gender: 'male',
    userName: '',
    birthday: new Date(),
    position: '',
    avatar: '',
    lng: '', // 经度
    lat: '', //维度
    address: '', // 详细地址
  };
  constructor() {
    makeAutoObservable(this);
  }

  getAuth = () => {
    authVerification().then(res => {
      if (res.status !== 0) {
        runInAction(() => (this.isAuth = false));
      }
    });
  };

  setInfoValue = (addValue: object) => {
    this.userInfo = {...this.userInfo, ...addValue};
  };

  submitUserInfo = (newInfo: object) => {
    setUserInfo(newInfo).then(res => console.log(res));
  };
}

export default new userStore();
