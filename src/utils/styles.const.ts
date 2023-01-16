import {Dimensions} from 'react-native';

// 设计稿宽度 / 元素宽度 = 手机屏幕 / 手机中元素的宽度
// 手机中元素的宽度 = 手机屏幕 * 元素的宽度 / 设计稿的宽度

export const screenWidth = Dimensions.get('window').width;
export const screenHeight = Dimensions.get('window').height;

// 这里指定设计稿的高（宽？）度为375
export const pxToDp = (elePx: number) => (screenWidth * elePx) / 375;
