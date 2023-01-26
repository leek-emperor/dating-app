import {View, Text} from 'react-native';
import React from 'react';

const My: React.FC = () => {
  return (
    <View style={{flex: 1}}>
      <Text>我的</Text>
    </View>
  );
};

export default React.memo(My);
