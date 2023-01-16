import {View, Text, Button, StatusBar, Image} from 'react-native';
import {pxToDp} from '../../utils/styles.const';
import React from 'react';

const Login: React.FC = (props: any) => {
  const {navigation} = props;
  return (
    <View>
      <StatusBar backgroundColor="transparent" translucent={true} />
      <Image
        style={{width: '100%', height: pxToDp(200)}}
        source={require('../../assets/images/welcome.jpg')}></Image>
      <Text>Home Screen</Text>
      <Button title="Go to Home" onPress={() => navigation.push('Home')} />
    </View>
  );
};

export default Login;
