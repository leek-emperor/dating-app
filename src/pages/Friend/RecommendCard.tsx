import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useMemo} from 'react';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import IconA from 'react-native-vector-icons/AntDesign';
import {baseUrl} from '@/services/baseServices';
import {pxToDp, screenWidth} from '@/utils/styles.const';
import {diffTime} from '@/utils/count.const';

interface Props {
  avatar: string;
  gender: string;
  birthday: string;
  marry: string;
  education: string;
  fateValue: number;
  userName: string;
}

const RecommendCard = (props: Props) => {
  const {avatar, gender, birthday, marry, education, fateValue, userName} =
    props;
  const genderColor = useMemo(
    () => (gender === 'female' ? '#FF00FF' : '#66CCFF'),
    [gender],
  );
  return (
    <TouchableOpacity>
      <View style={styles.container}>
        <Image style={styles.avatar} source={{uri: baseUrl + avatar}} />
        <View style={styles.middle}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              marginBottom: pxToDp(10),
            }}>
            <Text style={styles.topTxt}>{userName}</Text>
            <Icon
              style={{fontSize: pxToDp(15), marginRight: pxToDp(7)}}
              name={`symbol-${gender}`}
              size={18}
              color={genderColor}
            />
            <Text style={styles.topTxt}>{`${diffTime(birthday)}岁`}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}>
            <Text style={styles.infoTxt}>{marry}</Text>
            <Text style={styles.infoTxt}>|</Text>
            <Text style={styles.infoTxt}>{education}</Text>
          </View>
        </View>
        <View style={styles.right}>
          <IconA name="heart" size={20} color="red" />
          <Text style={{color: 'red', marginLeft: pxToDp(10)}}>
            {fateValue}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: screenWidth,
    height: pxToDp(80),
    flexDirection: 'row',
    borderBottomWidth: pxToDp(2),
    borderBottomColor: '#DDDDDD',
    alignItems: 'center',
  },
  avatar: {
    borderRadius: pxToDp(25),
    width: pxToDp(50),
    height: pxToDp(50),
    marginLeft: pxToDp(5),
  },
  middle: {
    flex: 3,
    marginLeft: pxToDp(10),
  },
  right: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  topTxt: {
    color: '#000',
    fontSize: pxToDp(15),
    marginRight: pxToDp(7),
  },
  infoTxt: {
    marginRight: pxToDp(7),
  },
});

export default React.memo(RecommendCard);
