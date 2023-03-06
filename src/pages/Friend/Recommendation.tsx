import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {pxToDp, screenWidth} from '@/utils/styles.const';
import IconA from 'react-native-vector-icons/AntDesign';
import {Overlay} from '@rneui/themed';
import RecommendCard from './RecommendCard';
// filter
interface User {
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
  recommendList: any[];
}

const Recommendation = (props: Props) => {
  const {recommendList} = props;

  const [visible, setVisible] = useState<boolean>(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };
  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text
            style={{
              fontSize: pxToDp(15),
              marginLeft: pxToDp(5),
              color: '#000',
            }}>
            推荐
          </Text>
          <TouchableOpacity onPress={() => toggleOverlay()}>
            <IconA
              style={{marginRight: pxToDp(10)}}
              name="filter"
              size={20}
              color="#000"
            />
          </TouchableOpacity>
        </View>
        <View>
          {recommendList.map(val => (
            <RecommendCard key={val.id} goUser {...val} />
          ))}
        </View>
      </ScrollView>

      <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
        <View style={styles.overlay}>
          <Text style={{fontSize: pxToDp(30)}}>筛选</Text>
          <Text>有什么好筛选的，反正都是假数据</Text>
        </View>
      </Overlay>
    </>
  );
};

const styles = StyleSheet.create({
  container: {},
  header: {
    flexDirection: 'row',
    height: pxToDp(30),
    backgroundColor: '#DDDDDD',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  overlay: {
    width: (3 * screenWidth) / 4,
    height: pxToDp(200),
    textAlign: 'center',
    alignItems: 'center',
  },
});

export default React.memo(Recommendation);
