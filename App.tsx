import React, {useEffect, useState} from 'react';
import Navigation from './src/router';
import {observer} from 'mobx-react';
import {AppContext, AppStore} from './src/store/index.context';
import {Provider} from '@ant-design/react-native';
import Geo from '@/utils/Geo';
function App() {
  const [isInitGeo, setIsInitGeo] = useState<boolean>(false);
  async function init() {
    await Geo.initGeo();
    setIsInitGeo(true);
  }
  useEffect(() => {
    init();
  }, []);
  return (
    <AppContext.Provider value={AppStore}>
      <Provider>
        {/*  这个Provider是Modal和Toast组件需要的 */}
        {isInitGeo ? <Navigation /> : <></>}
      </Provider>
    </AppContext.Provider>
  );
}

export default observer(App);
