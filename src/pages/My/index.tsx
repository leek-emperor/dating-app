import {View, Text, StyleSheet, StatusBar} from 'react-native';
import React, {useContext} from 'react';
import {observer} from 'mobx-react';
import {useAppContext} from '@/store/index.context';
import {Button} from '@rneui/base';
import {useZIM} from '@/hooks/zim';
import {NavigationContext} from '@react-navigation/native';
import {pxToDp} from '@/utils/styles.const';
const My: React.FC = () => {
  const {userStore} = useAppContext();
  const {userInfo} = userStore;
  const [_, zimAction] = useZIM();
  const navigation = useContext(NavigationContext);
  const logout = () => {
    zimAction.logout();
    (navigation as any).replace('Login');
  };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="transparent" translucent={true} />
      <Text>我的</Text>
      <Text>{userInfo.id}</Text>
      <Text>{userInfo.userName}</Text>

      <Button onPress={logout}>注销</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: pxToDp(10),
    backgroundColor: '#fff',
  },
});

export default React.memo(observer(My));
