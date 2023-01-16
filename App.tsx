import React from 'react';
import Navigation from './src/router';
import {observer} from 'mobx-react';
import {AppContext} from './src/store/index.context';
import AppStore from './src/store';

function App() {
  return (
    <AppContext.Provider value={AppStore}>
      <Navigation />
    </AppContext.Provider>
  );
}

export default observer(App);
