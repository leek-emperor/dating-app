import {View, Text, Image} from 'react-native';
import React, {useEffect} from 'react';
import {useAppContext} from '@/store/index.context';
import {pxToDp, screenHeight} from '@/utils/styles.const';
import {observer} from 'mobx-react';

const authMap = ['XLayout', 'NewCustomer', 'Login'];

const StartPage = (prop: any) => {
  const {navigation} = prop;
  const {userStore} = useAppContext();
  const {getAuth} = userStore;
  useEffect(() => {
    getAuth().then((res: number) => {
      navigation.replace(authMap[res]);
    });
  });
  return (
    <View
      style={{
        height: screenHeight,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Image
        style={{width: pxToDp(150), height: pxToDp(150)}}
        source={require('@/assets/images/JinXing.png')}
      />
      <Text style={{fontSize: pxToDp(20), marginTop: pxToDp(20)}}>
        离你的心更近一步
      </Text>
    </View>
  );
};

export default observer(StartPage);
