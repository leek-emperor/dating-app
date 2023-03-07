import React, {useEffect, useState} from 'react';
import Navigation from './src/router';
import {observer} from 'mobx-react';
import {AppContext, AppStore} from './src/store/index.context';
import {Provider} from '@ant-design/react-native';
import * as eva from '@eva-design/eva';
import {ApplicationProvider} from '@ui-kitten/components';
import Geo from '@/utils/Geo';
import {ZimProvider} from '@/hooks/zim';

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
      {/*  这个Provider是Modal和Toast组件需要的 */}
      <Provider>
        <ApplicationProvider {...eva} theme={eva.light}>
          <ZimProvider>{isInitGeo ? <Navigation /> : <></>}</ZimProvider>
        </ApplicationProvider>
      </Provider>
    </AppContext.Provider>
  );
}

export default observer(App);
