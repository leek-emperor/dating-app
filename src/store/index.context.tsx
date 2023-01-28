import {createContext, useContext} from 'react';
import userStore from './index.model';

const initState: any = {userStore};

export const AppContext = createContext(initState);

export const useAppContext = () => useContext(AppContext);
