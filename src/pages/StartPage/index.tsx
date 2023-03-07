import {View, Text, Image} from 'react-native';
import React, {useEffect} from 'react';
import {useAppContext} from '@/store/index.context';
import {pxToDp, screenHeight} from '@/utils/styles.const';

const StartPage = (prop: any) => {
  const {navigation} = prop;
  const {userStore} = useAppContext();
  const {getAuth, authStatus} = userStore;
  let timer: any;
  useEffect(() => {
    getAuth();
    timer = setTimeout(() => {
      switch (authStatus) {
        case 1:
          navigation.replace('XLayout');
          break;
        case 2:
          navigation.replace('NewCustomer');
          break;
        default:
          navigation.replace('Login');
          break;
      }
      return () => clearTimeout(timer);
    }, 2000);
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

export default StartPage;
