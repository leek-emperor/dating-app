import {View, Text} from 'react-native';
import React from 'react';

const Group: React.FC = () => {
  return (
    <View style={{flex: 1}}>
      <Text>圈子</Text>
    </View>
  );
};

export default React.memo(Group);
