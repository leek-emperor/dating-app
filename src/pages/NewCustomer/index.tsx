import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {useAppContext} from '@/store/index.context';
import {observer} from 'mobx-react';
import {pxToDp} from '@/utils/styles.const';
import {InputItem, DatePicker, List} from '@ant-design/react-native';

const NewCustomer: React.FC = (props: any) => {
  const {navigation} = props;
  const {userStore} = useAppContext();
  const {setInfo, userInfo} = userStore;
  const [message, setMessage] = useState<any>(userInfo);
  return (
    <View style={Styles.body}>
      <StatusBar backgroundColor="transparent" translucent={true} />
      <Text style={Styles.title}>填写资料</Text>
      <Text style={Styles.title}>提升我的魅力</Text>
      <View style={Styles.gender}>
        <TouchableOpacity
          style={{marginRight: pxToDp(40)}}
          onPress={() =>
            setMessage((message: any) => ({...message, gender: 'male'}))
          }>
          <Image
            source={require('@/assets/images/MALE_ICON.png')}
            style={
              message.gender === 'male'
                ? {...Styles.img, ...Styles.activeImg}
                : {...Styles.img}
            }
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            setMessage((message: any) => ({...message, gender: 'female'}))
          }>
          <Image
            source={require('@/assets/images/FEMALE_ICON.png')}
            style={
              message.gender === 'female'
                ? {...Styles.img, ...Styles.activeImg}
                : {...Styles.img}
            }
          />
        </TouchableOpacity>
      </View>
      <List>
        <InputItem
          clear
          value={message.userName}
          onChange={(value: any) => {
            setMessage((message: any) => ({...message, userName: value}));
          }}
          placeholder="请输入"
          maxLength={10}>
          昵称
        </InputItem>
      </List>
      <List>
        <DatePicker
          style={{flexDirection: 'row', justifyContent: 'flex-start'}}
          value={message.birthday}
          mode="date"
          defaultDate={new Date()}
          minDate={new Date(1950, 1, 1)}
          maxDate={new Date()}
          onChange={(value: any) => {
            setMessage((message: any) => ({...message, birthday: value}));
          }}
          format="YYYY-MM-DD">
          <List.Item
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              backgroundColor: 'pink',
            }}
            align="bottom"
            arrow="horizontal">
            生日
          </List.Item>
        </DatePicker>
      </List>
    </View>
  );
};

const Styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: pxToDp(30),
    paddingHorizontal: pxToDp(20),
  },
  title: {
    fontSize: pxToDp(22),
    color: '#242424',
    fontWeight: 'bold',
  },
  gender: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: pxToDp(40),
  },
  img: {
    width: pxToDp(100),
    height: pxToDp(100),
    borderRadius: pxToDp(50),
  },
  activeImg: {
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: '#6699FF',
  },
});

export default observer(NewCustomer);
