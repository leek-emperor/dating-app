import {View, Text} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {pxToDp, screenWidth} from '@/utils/styles.const';

interface Props {
  children: string;
}

const XHeaderNav = (props: Props) => {
  const {children} = props;
  return (
    <LinearGradient
      colors={['#CC3399', '#F75D59', '#FF9999']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={{
        width: screenWidth,
        height: pxToDp(80),
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
      }}>
      <Text
        style={{
          fontSize: pxToDp(20),
          color: '#000',
          position: 'absolute',
          bottom: pxToDp(10),
        }}>
        {children}
      </Text>
    </LinearGradient>
  );
};

export default XHeaderNav;
