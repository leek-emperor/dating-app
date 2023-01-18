import React from 'react';
import Navigation from './src/router';
import {observer} from 'mobx-react';
import {AppContext} from './src/store/index.context';
import AppStore from './src/store';
import {Provider} from '@ant-design/react-native';

function App() {
  return (
    <AppContext.Provider value={AppStore}>
      {/*  这个Provider是Modal和Toast组件需要的 */}
      <Provider>
        <Navigation />
      </Provider>
    </AppContext.Provider>
  );
}

export default observer(App);
