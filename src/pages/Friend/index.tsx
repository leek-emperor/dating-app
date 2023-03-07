import {View, Text} from 'react-native';
import React, {useLayoutEffect, useState} from 'react';
import {AnimatedScrollView} from '@kanelloc/react-native-animated-header-scroll-view';
import HeaderNavbarComponent from './HeaderNavbarComponent';
import {pxToDp} from '@/utils/styles.const';
import Vistors from '@/components/Vistors';
import {
  friendVistors,
  friendTodayBeatuy,
  getRecommendation,
} from '@/services/socal';
import BeautyList from './BeautyList';
import Recommendation from './Recommendation';

const initData = {
  id: 1,
  userName: '',
  birthday: '2022-10-02',
  marry: '单身',
  education: '大专',
  gender: 'female',
  avatar: '',
  distance: 0,
  fateValue: 1,
};

const Friend: React.FC = () => {
  const [vistorsData, setVistorsData] = useState([]);
  const [recommendList, setRecommendList] = useState([]);
  const [beauty, setBeauty] = useState(initData);

  useLayoutEffect(() => {
    friendVistors().then(res => {
      setVistorsData(res.data);
    });
    friendTodayBeatuy().then(res => {
      setBeauty(res.data[0]);
    });
    getRecommendation({}).then(res => {
      setRecommendList(res.data);
    });
  }, []);

  return (
    <AnimatedScrollView
      HeaderNavbarComponent={<HeaderNavbarComponent />}
      TopNavBarComponent={
        <View>
          <Text style={{fontSize: pxToDp(18), color: '#000'}}>交友</Text>
        </View>
      }
      headerImage={require('@/assets/images/header_image.png')}
      topBarHeight={80}
      imageStyle={{height: pxToDp(180)}}>
      <View>
        {/* 访客 */}
        <Vistors vistorsData={vistorsData} />
        {/* 心动 */}
        <BeautyList beauty={beauty} />
        {/* 推荐列表 */}
        <Recommendation recommendList={recommendList} />
      </View>
    </AnimatedScrollView>
  );
};

export default React.memo(Friend);
