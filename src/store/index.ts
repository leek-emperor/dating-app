import {makeAutoObservable} from 'mobx';

class mainStore {
  constructor() {
    makeAutoObservable(this);
  }
}

export default new mainStore();
