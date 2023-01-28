import {View, Text, StatusBar, Image, StyleSheet} from 'react-native';
import React, {useState, useCallback} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Input} from '@rneui/themed';
import {pxToDp} from '@/utils/styles.const';
import {validatePhone} from '@/utils/validator';
import {userLogin, loginVerification} from '@/services/user';
import {Toast} from '@ant-design/react-native';
import XButton from '@/components/XButton';

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {observer} from 'mobx-react';

const CELL_COUNT = 6;

const Login: React.FC = (prop: any) => {
  const {navigation} = prop;
  const [phone, setPhone] = useState<string>(''); // 手机号
  const [typeErr, setTypeErr] = useState<boolean>(false); // 手机号是否正确
  const [sendType, setSendType] = useState<boolean>(false); // 验证码是否发送（验证码页面是否渲染）
  const [btnText, setBtnText] = useState<string>('重新获取验证码'); // 重新获取验证码按钮的文本
  const [disable, setDisable] = useState<boolean>(false); // 重新获取验证码按钮的disable
  const ALL_SECOND = 10; // 等待秒数

  const [verifyCode, setVerifyCode] = useState('');
  const ref = useBlurOnFulfill({value: verifyCode, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: verifyCode,
    setValue: setVerifyCode,
  });

  // 倒计时函数
  const countDown = useCallback(() => {
    let timer: any;
    setDisable(true);
    setBtnText(`重新获取验证码(${ALL_SECOND}s)`);
    let count = ALL_SECOND;
    timer = setInterval(() => {
      count--;
      if (count === 0) {
        clearInterval(timer);
        setDisable(false);
        setBtnText('重新获取验证码');
        return;
      }
      setBtnText(`重新获取验证码(${count}s)`);
    }, 1000);
  }, [disable, btnText]);

  const inputOnchange = useCallback(
    (data: string) => {
      setPhone(data);
      if (!validatePhone(data)) {
        setTypeErr(true);
      } else {
        setTypeErr(false);
      }
    },
    [phone],
  );

  // 提交手机号
  const phoneSubmit = async () => {
    if (!validatePhone(phone)) {
      Toast.info({
        content: '请输入正确的手机号',
        duration: 2,
      });
      return;
    }
    let t = Toast.loading({
      content: '发送中',
    });
    const res = await userLogin(phone);
    if (res.status === 0) {
      Toast.removeAll();
      setSendType(true);
      countDown();
    }
  };

  // 重新发送验证码的回调
  const resendVerifyCode = useCallback(() => {
    Toast.loading({
      content: '发送中',
    });
    userLogin(phone)
      .then(res => {
        if (res.status === 0) {
          countDown();
        }
      })
      .finally(() => {
        Toast.removeAll();
      });
  }, [verifyCode, phone]);
  // 验证码改变的回调
  const verifyCodeChange = useCallback(
    (verifyCode: string) => {
      setVerifyCode(verifyCode);
      if (verifyCode.length === CELL_COUNT) {
        Toast.loading({
          content: '发送中',
        });
        loginVerification(phone, verifyCode)
          .then(res => {
            if (res.status === 0) {
              AsyncStorage.setItem('token', res.data.token);
              if (res.data.newCustomer) {
                navigation.navigate('NewCustomer');
              } else {
                navigation.navigate('XLayout');
              }
            }
          })
          .finally(() => {
            Toast.removeAll();
          });
      }
    },
    [phone, verifyCode],
  );

  // 验证码完成的回调
  const verfitCodeSubmit = useCallback(() => {
    if (verifyCode.length !== CELL_COUNT) {
      Toast.info({
        content: `请输入长度为${CELL_COUNT}位的验证码`,
        duration: 1,
      });
      return;
    }
  }, [verifyCode]);

  return (
    <View>
      <StatusBar backgroundColor="transparent" translucent={true} />
      <Image
        style={{width: '100%', height: pxToDp(200)}}
        source={require('../../assets/images/welcome.jpg')}></Image>
      {/* 输入手机号 */}
      {!sendType ? (
        <View>
          <View style={style.login}>
            <Text style={style.Texttitle}>请输入手机号</Text>
            <View style={{marginTop: pxToDp(20)}}>
              <Input
                placeholder="请输入手机号"
                maxLength={11}
                keyboardType="phone-pad"
                onChangeText={inputOnchange}
                errorMessage={typeErr ? '请输入正确的手机号' : ''}
                onSubmitEditing={phoneSubmit}
                leftIcon={{
                  type: 'font-awesome',
                  name: 'phone',
                  size: pxToDp(20),
                }}
              />
            </View>
          </View>
          <View style={{alignItems: 'center'}}>
            <XButton
              style={{btnStyle: {width: '85%'}}}
              text="发送验证码"
              onPress={phoneSubmit}
            />
          </View>
        </View>
      ) : (
        <View>
          <View style={style.login}>
            <Text style={style.Texttitle}>请输入验证码</Text>
            <Text style={{marginTop: pxToDp(8)}}>已发到：+86 {phone}</Text>
            <CodeField
              ref={ref}
              {...props}
              // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
              value={verifyCode}
              onChangeText={verifyCodeChange}
              cellCount={CELL_COUNT}
              rootStyle={style.codeFieldRoot}
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              onSubmitEditing={verfitCodeSubmit}
              renderCell={({index, symbol, isFocused}) => (
                <Text
                  key={index}
                  style={[style.cell, isFocused && style.focusCell]}
                  onLayout={getCellOnLayoutHandler(index)}>
                  {symbol || (isFocused ? <Cursor /> : null)}
                </Text>
              )}
            />
          </View>
          <View style={{alignItems: 'center'}}>
            <XButton
              style={{btnStyle: {width: '85%', marginTop: pxToDp(20)}}}
              text={btnText}
              onPress={resendVerifyCode}
              disable={disable}
            />
          </View>
        </View>
      )}
    </View>
  );
};

const style = StyleSheet.create({
  login: {
    padding: pxToDp(20),
  },
  Texttitle: {
    fontSize: pxToDp(20),
    fontWeight: 'bold',
    color: '#000',
  },
  root: {flex: 1, padding: 20},
  codeFieldRoot: {marginTop: 20},
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderBottomWidth: 2,
    borderColor: '#00000030',
    textAlign: 'center',
  },
  focusCell: {
    borderColor: '#F75D59',
  },
});

export default observer(Login);
