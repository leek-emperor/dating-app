/* eslint-disable react-native/no-inline-styles */
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {pxToDp} from '@/utils/styles.const';
import {isFunction} from 'lodash-es';

interface Style {
  btnStyle?: any;
  textStyle?: any;
}

interface Props {
  onPress?: any;
  style?: Style;
  text: string;
  disable?: boolean;
}

const XButton = (props: Props) => {
  const {disable = false, text, onPress, style = {}} = props;

  const _onPress = () => {
    if (isFunction(onPress)) {
      onPress();
    }
  };

  return (
    <TouchableOpacity
      disabled={disable}
      style={{
        ...styles.basetnStyle,
        ...style.btnStyle,
      }}
      activeOpacity={0.7}
      onPress={_onPress}>
      <LinearGradient
        colors={
          !disable ? ['#CC3399', '#F75D59', '#FF9999'] : ['#777777', '#888888']
        }
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={{
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontSize: pxToDp(16),
            color: !disable ? '#242424' : '#fff',
            ...style.textStyle,
          }}>
          {text}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  basetnStyle: {
    width: pxToDp(200),
    height: pxToDp(50),
    borderRadius: pxToDp(20),
    overflow: 'hidden',
  },
  disable: {
    color: 'white',
    backgroundColor: '',
  },
});

export default React.memo(XButton);
