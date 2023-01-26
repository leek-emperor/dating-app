import {View, Text} from 'react-native';
import React from 'react';

const Message: React.FC = () => {
  return (
    <View style={{flex: 1}}>
      <Text>消息</Text>
    </View>
  );
};

export default React.memo(Message);
