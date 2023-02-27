import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import {pxToDp} from '@/utils/styles.const';
import {baseUrl} from '@/services/baseServices';

interface Props {
  vistorsData: Vistor[];
}

export interface Vistor {
  target_uid?: number;
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

const Vistors: React.FC<Props> = props => {
  const {vistorsData = []} = props;
  return (
    <View style={styles.container}>
      <Text style={styles.txt}>
        最近有{vistorsData?.length}人来访，快去查看
      </Text>
      <View style={styles.imgContainer}>
        {vistorsData.length > 4
          ? vistorsData
              .slice(0, 4)
              .map((val, index) => (
                <Image
                  key={index}
                  style={styles.img}
                  source={{uri: baseUrl + val.avatar}}
                />
              ))
          : vistorsData.map((val, index) => (
              <Image
                key={index}
                style={styles.img}
                source={{uri: val.avatar}}
              />
            ))}
      </View>
      <Text style={styles.arrow}>&gt;</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: pxToDp(5),
    marginBottom: pxToDp(5),
    height: pxToDp(40),
  },
  imgContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  txt: {
    fontSize: pxToDp(13),
    color: '#777',
  },
  img: {
    width: pxToDp(40),
    height: pxToDp(40),
    borderRadius: pxToDp(20),
    marginLeft: pxToDp(4),
  },
  arrow: {fontSize: pxToDp(20), color: '#777', marginRight: pxToDp(10)},
});

export default React.memo(Vistors);
