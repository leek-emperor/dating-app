import {authVerification} from '@/services/auth';
import {setUserInfo} from '@/services/user';
import {getStoreData} from '@/utils/anycStore.const';
import {makeAutoObservable, runInAction} from 'mobx';

interface UserStore {
  userInfo: UserInfo;
  authStatus: number; // 0直接去主页，1信息未完善，2没有权限
  getAuth: () => void;
  setInfoValue: (addValue: object) => void;
  submitUserInfo: (newInfo: object) => void;
}

interface UserInfo {
  id: string;
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
  authStatus = 1;
  userInfo: UserInfo = {
    gender: 'male',
    userName: '',
    birthday: new Date(),
    position: '',
    avatar: '',
    lng: '', // 经度
    lat: '', //维度
    address: '', // 详细地址
    id: '',
  };
  constructor() {
    makeAutoObservable(this);
  }

  getAuth = () => {
    return authVerification()
      .then(res => {
        if (res.status === 0) {
          runInAction(() => {
            this.authStatus = 0;
            this.userInfo = {...this.userInfo, ...res.data};
          });
          return;
        }
        if (res.msg === '信息未完善') {
          runInAction(() => (this.authStatus = 1));
          return;
        } else {
          runInAction(() => (this.authStatus = 2));
          return;
        }
      })
      .then(() => {
        return this.authStatus;
      });
  };

  setInfoValue = (addValue: object) => {
    this.userInfo = {...this.userInfo, ...addValue};
  };

  submitUserInfo = (newInfo: object) => {
    return setUserInfo(newInfo);
  };
}

export default new userStore();
