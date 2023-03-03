import React, {useEffect, useState} from 'react';
import Navigation from './src/router';
import {observer} from 'mobx-react';
import {AppContext, AppStore} from './src/store/index.context';
import ZIM from 'zego-zim-react-native';

import {Provider} from '@ant-design/react-native';
import Geo from '@/utils/Geo';

// create 方法仅第一次调用时会创建 ZIM 实例，后续调用会返回 null。
ZIM.create({
  appID: 860542431,
  appSign: '754510fb980210e6ff564c6744e4cc1e625c9dbe49f17ab3b48e91d1d915139d',
});
const zim = ZIM.getInstance();

var userInfo = {userID: '1231', userName: '123'};
var token = ''; // 请求开发者服务端获取

zim
  .login(userInfo, token)
  .then(res => {
    // 登录成功
    console.log('登录成功');
    console.log(res);
  })
  .catch(err => {
    console.log(err);
    console.log('登录失败');
  });

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
