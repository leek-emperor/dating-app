import {View, Text, Button, StatusBar} from 'react-native';
import React, {useEffect} from 'react';

const Home: React.FC = (props: any) => {
  const {navigation} = props;
  return (
    <View>
      <StatusBar backgroundColor="transparent" translucent={true} />
      <Text>主页</Text>
      <Button
        title="Go to Login"
        onPress={() => navigation.push('NewCustomer')}
      />
    </View>
  );
};

export default Home;
