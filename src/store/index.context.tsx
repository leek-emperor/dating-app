import {createContext, useContext} from 'react';
import userStore from './index.model';

const initState: any = {};

export const AppContext = createContext(initState);

export const AppStore = {userStore};

export const useAppContext = () => useContext(AppContext);
