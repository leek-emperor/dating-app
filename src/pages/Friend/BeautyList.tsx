import {View, Text, Image, StyleSheet} from 'react-native';
import React, {useMemo} from 'react';
import Icon from 'react-native-vector-icons/SimpleLineIcons'; // symbol-female
import IconA from 'react-native-vector-icons/AntDesign'; // symbol-female

import {diffTime} from '@/utils/count.const';
import {baseUrl} from '@/services/baseServices';
import {pxToDp} from '@/utils/styles.const';

interface Beauty {
  id: number;
  userName: string;
  birthday: string;
  marry: string;
  education: string;
  gender: string;
  distance: number;
  avatar: string;
  fateValue: number;
}
interface Props {
  beauty: Beauty;
}

const BeautyList: React.FC<Props> = props => {
  const {beauty} = props;
  const genderColor = useMemo(
    () => (beauty.gender === 'female' ? '#FF00FF' : '#66CCFF'),
    [beauty],
  );

  return (
    <View style={styles.container}>
      <Image style={styles.avatar} source={{uri: baseUrl + beauty.avatar}} />
      <View style={styles.abContainer}>
        <Text style={styles.txt}>灵魂伴侣</Text>
      </View>
      <View style={styles.rightConatiner}>
        <View style={{flex: 2, paddingVertical: pxToDp(10)}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              marginBottom: pxToDp(20),
            }}>
            <Text style={styles.infoTxt}>{beauty.userName}</Text>
            <Icon
              style={styles.infoTxt}
              name={`symbol-${beauty.gender}`}
              size={18}
              color={genderColor}
            />
            <Text style={styles.infoTxt}>{`${diffTime(
              beauty?.birthday,
            )}岁`}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}>
            <Text style={styles.infoTxt}>{beauty.marry}</Text>
            <Text style={styles.infoTxt}>|</Text>
            <Text style={styles.infoTxt}>{beauty.education}</Text>
            <Text style={styles.infoTxt}>|</Text>
            <Text style={styles.infoTxt}>年龄相仿</Text>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            position: 'relative',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <IconA name="heart" size={40} color="red" />
          <Text style={{position: 'absolute', color: '#fff', top: pxToDp(30)}}>
            {beauty.fateValue}
          </Text>
          <Text style={{color: 'red'}}>缘分值</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flexDirection: 'row',
    marginTop: pxToDp(10),
    borderColor: '#DDDDDD',
    borderWidth: pxToDp(4),
  },
  avatar: {width: pxToDp(100), height: pxToDp(100)},
  abContainer: {
    position: 'absolute',
    left: pxToDp(10),
    bottom: pxToDp(0),
    width: pxToDp(70),
    height: pxToDp(28),
    backgroundColor: '#b564bf',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: pxToDp(10),
    opacity: 0.8,
  },
  txt: {
    color: '#fff',
    fontSize: pxToDp(14),
  },
  rightConatiner: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: pxToDp(5),
  },
  infoTxt: {
    marginRight: pxToDp(7),
  },
});

export default BeautyList;
