import {createContext, useContext} from 'react';

const initState: any = {};

export const AppContext = createContext(initState);

export const useAppContext = () => useContext(AppContext);
