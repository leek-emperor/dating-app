/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  Image,
  TouchableOpacity,
  PermissionsAndroid,
} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {useAppContext} from '@/store/index.context';
import {observer} from 'mobx-react';
import {pxToDp, screenWidth} from '@/utils/styles.const';
import {
  InputItem,
  DatePicker,
  List,
  Modal,
  Button,
} from '@ant-design/react-native';
import options from '@/utils/city';
import Geo from '@/utils/Geo';
import {CascadePicker} from 'react-native-slidepicker';
import ImagePicker from 'react-native-syan-image-picker';
import XButton from '@/components/XButton';
import {Toast} from '@ant-design/react-native';
import moment from 'moment';
import {ButtonGroup, Divider} from '@rneui/themed';

const educationList = ['高中', '大专', '本科', '硕士', '博士'];
const emotionList = ['单身', '已婚'];

const NewCustomer: React.FC = (props: any) => {
  const {navigation} = props;
  const {userStore} = useAppContext();
  const {setInfoValue, userInfo, submitUserInfo} = userStore;
  const [position, setPosition] = useState([
    {id: '110000', name: '北京市', value: '北京市'},
    {id: '110101', name: '东城区', value: '东城区'},
    {},
  ]);
  const [visible, setVisible] = useState<boolean>(false);
  const [granted, setGranted] = useState<boolean>(false);
  const [emotionIndex, setEmotionIndex] = useState(0);
  const [educationIndex, setEducationIndex] = useState(0);

  async function geoinit() {
    const res = await Geo.getCityByLocation();
    console.log(res);
  }

  useEffect(() => {
    async function requestCameraPermission() {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: '需要访问相册',
            message: '需要访问相册',
            buttonPositive: '',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          setGranted(true);
          return Promise.resolve(true);
        } else {
          return Promise.resolve(false);
        }
      } catch (err) {
        console.warn(err);
        return Promise.resolve(false);
      }
    }
    function handleClickAvatar() {
      requestCameraPermission().then((res: any) => console.log(res));
    }
    // geoinit();
    requestCameraPermission().then(res => console.log(res));
  }, []);

  const location = useMemo(() => {
    return position.map((val: any) => val?.name).join('，');
  }, [position]);

  // 点击选择头像的事件
  const onClickChoosePicture = () => {
    const options = {
      imageCount: 1, // 最大选择图片数目，默认6
      isCamera: true, // 是否允许用户在内部拍照，默认true
      isCrop: true, // 是否允许裁剪，默认false
      enableBase64: true,
      rotateEnabled: false,
    };
    ImagePicker.showImagePicker(options, (err, selectedPhotos) => {
      if (err) {
        console.log(err);
        return;
      }
      setInfoValue({avatar: selectedPhotos[0]?.base64});
    });
  };

  function onSubmit() {
    if (userInfo.avatar?.trim() === '') {
      Toast.fail({
        content: '请上传头像',
        duration: 3,
        stackable: true,
      });
      return;
    }
    if (userInfo.userName?.trim() === '') {
      Toast.fail({
        content: '昵称不能为空',
        duration: 3,
        stackable: true,
      });
      return;
    }
    const newInfo = {
      ...userInfo,
      birthday: moment(userInfo.birthday).format('YYYY-MM-DD'),
      position: position.map(val => val?.value),
      marry: emotionList[emotionIndex],
      education: educationList[educationIndex],
    };
    submitUserInfo(newInfo).then((res: any) => {
      console.log(res);
      navigation.navigate('StartPage');
    });
  }

  return (
    <View style={Styles.body}>
      <StatusBar backgroundColor="transparent" translucent={true} />
      <Text style={Styles.title}>填写资料</Text>
      <Text style={Styles.title}>提升我的魅力</Text>

      <View style={{alignItems: 'center', marginTop: pxToDp(20)}}>
        <TouchableOpacity
          style={Styles.avatarContain}
          onPress={onClickChoosePicture}>
          {userInfo.avatar === '' ? (
            <View style={Styles.setAvatar}>
              <Text style={{fontSize: pxToDp(17), textAlign: 'center'}}>
                设置头像
              </Text>
            </View>
          ) : (
            <Image style={Styles.avatar} source={{uri: userInfo.avatar}} />
          )}
        </TouchableOpacity>
      </View>
      <View style={Styles.gender}>
        <Text
          style={{
            fontSize: pxToDp(16),
            color: '#000',
            position: 'absolute',
            left: pxToDp(14),
          }}>
          性别
        </Text>
        <TouchableOpacity
          style={{marginRight: pxToDp(40)}}
          onPress={() => setInfoValue({gender: 'male'})}>
          <Image
            source={require('@/assets/images/MALE_ICON.png')}
            style={
              userInfo.gender === 'male'
                ? {...Styles.img, ...Styles.activeImg}
                : {...Styles.img}
            }
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setInfoValue({gender: 'female'})}>
          <Image
            source={require('@/assets/images/FEMALE_ICON.png')}
            style={
              userInfo.gender === 'female'
                ? {...Styles.img, ...Styles.activeImg}
                : {...Styles.img}
            }
          />
        </TouchableOpacity>
      </View>
      <Divider />
      <List>
        <InputItem
          clear
          value={userInfo.userName}
          onChange={(value: any) => {
            setInfoValue({userName: value});
          }}
          placeholder="请输入"
          maxLength={10}>
          昵称
        </InputItem>
      </List>
      <List>
        <DatePicker
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
          }}
          value={userInfo.birthday}
          mode="date"
          defaultDate={new Date()}
          minDate={new Date(1950, 1, 1)}
          maxDate={new Date()}
          onChange={(value: any) => {
            setInfoValue({birthday: value});
          }}
          format="YYYY-MM-DD">
          <List.Item align="bottom" arrow="horizontal">
            生日
          </List.Item>
        </DatePicker>
      </List>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          position: 'relative',
        }}>
        <Text
          style={{
            fontSize: pxToDp(16),
            color: '#000',
            position: 'absolute',
            left: pxToDp(14),
          }}>
          情感
        </Text>
        <ButtonGroup
          buttons={emotionList}
          selectedIndex={emotionIndex}
          onPress={value => {
            setEmotionIndex(value);
          }}
          containerStyle={{
            width: screenWidth / 2,
            // marginBottom: 20,
            borderRadius: pxToDp(10),
          }}
          selectedButtonStyle={{backgroundColor: '#F75D59'}}
          selectedTextStyle={{color: '#000'}}
        />
      </View>
      <Divider />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-end',
          position: 'relative',
        }}>
        <Text
          style={{
            fontSize: pxToDp(16),
            color: '#000',
            position: 'absolute',
            left: pxToDp(14),
          }}>
          学历
        </Text>
        <ButtonGroup
          buttons={educationList}
          selectedIndex={educationIndex}
          onPress={value => {
            setEducationIndex(value);
          }}
          containerStyle={{
            width: (2 * screenWidth) / 3,
            borderRadius: pxToDp(10),
          }}
          selectedButtonStyle={{backgroundColor: '#F75D59'}}
          selectedTextStyle={{color: '#000'}}
        />
      </View>
      <Divider />
      <Button
        style={{
          borderWidth: 0,
          flexDirection: 'row',
          justifyContent: 'flex-start',
        }}
        onPress={() => setVisible(true)}>
        <Text style={{fontSize: 18, color: 'black'}}>
          所在地{'      '}
          <Text style={{color: '#ccc'}}>{location}</Text>
        </Text>
      </Button>
      <View style={{alignItems: 'center'}}>
        <XButton
          text="确定"
          style={{btnStyle: Styles.makeSure}}
          onPress={onSubmit}
        />
      </View>
      <Modal popup visible={visible} animationType="slide-up">
        <View style={{paddingVertical: 20, paddingHorizontal: 20}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Button
              type="primary"
              style={Styles.modalBtn}
              activeStyle={Styles.modalActiveStyle}
              onPress={() => setVisible(false)}>
              <Text style={Styles.modalBtnText}>取消</Text>
            </Button>
            <Button
              type="primary"
              activeStyle={Styles.modalActiveStyle}
              style={Styles.modalBtn}
              onPress={() => setVisible(false)}>
              <Text style={Styles.modalBtnText}>确定</Text>
            </Button>
          </View>
          <CascadePicker
            headOptions={{
              confirmStyle: Styles.confirmStyle,
              cancelStyle: Styles.cancelStyle,
              backgroundColor: 'transparent',
            }}
            pickerStyle={{
              normalBgOpacity: 0,
            }}
            dataSource={options}
            value={position}
            onceChange={arr => {
              // console.log(arr);
              setPosition(arr);
            }}
            cancel={() => Promise.resolve()}
            confirm={() => Promise.resolve()}
          />
        </View>
      </Modal>
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
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: pxToDp(40),
    marginBottom: pxToDp(10),
  },
  img: {
    width: pxToDp(50),
    height: pxToDp(50),
    borderRadius: pxToDp(50),
  },
  activeImg: {
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: '#6699FF',
  },
  modal: {
    // backgroundColor: 'white',
    borderColor: 'blue',
    borderWidth: 10,
    borderStyle: 'solid',
    width: screenWidth,
    height: '35%',
    position: 'absolute',
    top: 0,
  },
  confirmStyle: {
    display: 'none',
  },
  cancelStyle: {
    display: 'none',
  },
  modalBtn: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    // color: 'skyblue',
  },
  modalBtnText: {color: 'skyblue', fontSize: pxToDp(18)},
  modalActiveStyle: {backgroundColor: '#ccc', opacity: 0.4},
  avatarContain: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: screenWidth / 3,
    height: screenWidth / 3,
    // padding: pxToDp(10),
    // backgroundColor: 'pink',
    borderWidth: pxToDp(1),
    borderColor: 'transparent',
    borderRadius: pxToDp(100),
  },
  avatar: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    borderWidth: pxToDp(1),
    borderColor: 'transparent',
    borderRadius: pxToDp(100),
  },
  setAvatar: {
    backgroundColor: '#ccc',
    opacity: 0.3,
    width: '100%',
    height: '100%',
    // height: pxToDp(50),
    justifyContent: 'center',
    borderWidth: pxToDp(1),
    borderColor: 'transparent',
    borderRadius: pxToDp(100),
  },
  makeSure: {
    marginTop: pxToDp(20),
    width: '70%',
    height: pxToDp(50),
    borderRadius: pxToDp(30),
    borderWidth: 1,
    borderColor: 'transparent',
    backgroundColor: 'pink',
  },
});

export default React.memo(observer(NewCustomer));
