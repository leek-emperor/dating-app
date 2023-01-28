import {View, Text} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {pxToDp} from '@/utils/styles.const';

const Friend: React.FC = () => {
  return (
    <View style={{flex: 1, padding: pxToDp(10)}}>
      <Text>交友</Text>
      <Icon name="rocket" size={30} color="#900" />
    </View>
  );
};

export default React.memo(Friend);
