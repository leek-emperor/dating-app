import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import XHeaderNav from '@/components/XHeaderNav';
import {pxToDp, screenHeight, screenWidth} from '@/utils/styles.const';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import IconF from 'react-native-vector-icons/FontAwesome5';
import Swiper from 'react-native-deck-swiper';
import {exploration} from '@/services/socal';
import {baseUrl} from '@/services/baseServices';
import {diffTime} from '@/utils/count.const';
const Tan = () => {
  const [cardsItem, setCardsItem] = useState([]);
  const swiperRef = useRef(null);
  const setLike = useCallback(() => {
    (swiperRef?.current as any).swipeRight();
  }, [swiperRef]);
  const setUnlike = useCallback(() => {
    (swiperRef?.current as any).swipeLeft();
  }, [swiperRef]);
  useEffect(() => {
    exploration().then(res => {
      setCardsItem(res.data);
    });
  }, []);
  return (
    <>
      <XHeaderNav>探一探</XHeaderNav>
      <View>
        <LinearGradient
          colors={['#FF9999', '#F75D59', '#CC3399']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={{
            width: screenWidth,
            height: screenHeight / 2,
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            zIndex: 0,
          }}></LinearGradient>
        <Swiper
          ref={swiperRef}
          cards={cardsItem}
          renderCard={(card: any) => {
            if (cardsItem.length === 0) {
              return <></>;
            } else {
              return (
                <View style={styles.card}>
                  <Image
                    style={{width: '100%', height: '80%'}}
                    source={{uri: baseUrl + card.avatar}}
                  />
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      marginTop: pxToDp(20),
                    }}>
                    <Text
                      style={{fontSize: pxToDp(15), marginRight: pxToDp(7)}}>
                      {card.userName}
                    </Text>
                    <Icon
                      style={{marginRight: pxToDp(7)}}
                      name={`symbol-${card.gender}`}
                      size={18}
                      color={card.gender === 'female' ? '#FF00FF' : '#66CCFF'}
                    />
                    <Text
                      style={{
                        color: '#000',
                        fontSize: pxToDp(15),
                        marginRight: pxToDp(7),
                      }}>{`${diffTime(card.birthday)}岁`}</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      marginTop: pxToDp(20),
                    }}>
                    <Text style={styles.infoTxt}>{card.marry}</Text>
                    <Text style={styles.infoTxt}>|</Text>
                    <Text style={styles.infoTxt}>{card.education}</Text>
                  </View>
                </View>
              );
            }
          }}
          onSwipedLeft={cardIndex => {
            console.log('left', cardIndex);
          }}
          onSwipedRight={cardIndex => {
            console.log('right', cardIndex);
          }}
          cardIndex={0}
          cardVerticalMargin={pxToDp(10)}
          backgroundColor={'transparent'}
          stackSize={6}></Swiper>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          position: 'absolute',
          bottom: pxToDp(80),
          width: screenWidth,
        }}>
        <TouchableOpacity onPress={setUnlike}>
          <View style={{...styles.circle, backgroundColor: '#FFCC99'}}>
            <IconF name="heart-broken" size={50} color="#fff" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={setLike}>
          <View style={{...styles.circle, backgroundColor: '#FF6666'}}>
            <IconF name="heart" size={50} color="#fff" />
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 4,
    borderWidth: 2,
    height: '70%',
    borderColor: '#E8E8E8',
    backgroundColor: 'white',
  },
  text: {
    textAlign: 'center',
    fontSize: 50,
    backgroundColor: 'transparent',
  },
  infoTxt: {
    marginRight: pxToDp(7),
  },
  circle: {
    width: pxToDp(80),
    height: pxToDp(80),
    borderRadius: pxToDp(40),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default React.memo(Tan);
