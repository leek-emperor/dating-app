import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import React from 'react';
import Icon5 from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {pxToDp, screenWidth} from '@/utils/styles.const';

const iconColor = '#fff';

const HeaderNavbarComponent = () => {
  return (
    <View style={styles.nav}>
      <TouchableOpacity style={{...styles.circle, backgroundColor: '#FF3366'}}>
        <Icon5 name="user-friends" size={30} color={iconColor} />
        <Text style={styles.txt}>探一探</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{...styles.circle, backgroundColor: 'skyblue'}}>
        <Icon5 name="map-marker-alt" size={30} color={iconColor} />
        <Text style={styles.txt}>搜附近</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{...styles.circle, backgroundColor: '#FFCC66'}}>
        <Icon name="brain" size={30} color={iconColor} />
        <Text style={styles.txt}>测灵魂</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  nav: {
    width: screenWidth,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: pxToDp(25),
    height: 300,
    // backgroundColor: 'white',
  },
  circle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: pxToDp(70),
    height: pxToDp(70),
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: pxToDp(40),
  },
  txt: {
    fontSize: pxToDp(12),
    color: '#fff',
  },
});

export default HeaderNavbarComponent;
