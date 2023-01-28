import React from 'react';
import Navigation from './src/router';
import {observer} from 'mobx-react';
import {AppContext} from './src/store/index.context';
import AppStore from './src/store/index.model';
import {Provider} from '@ant-design/react-native';
function App() {
  return (
    // <AppContext.Provider value={AppStore}>
      <Provider>
        {/*  这个Provider是Modal和Toast组件需要的 */}
        <Navigation />
      </Provider>
    // </AppContext.Provider>
  );
}

export default observer(App);
