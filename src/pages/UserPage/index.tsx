import {View, Text} from 'react-native';
import {Button} from '@rneui/themed';
import React from 'react';
import {useRoute} from '@react-navigation/native';
import {observer} from 'mobx-react';

interface ChatParams {
  type: 0 | 1 | 2; // 私聊会话、房间会话、群聊会话
  id: string; // 聊天对象
  name: string; // 对象名称
  avatar: string; // 头像
}

const UserPage = (props: any) => {
  const {navigation} = props;
  const route = useRoute();
  const {id, userName, avatar}: any = route.params;
  console.log(route.params);
  const params: ChatParams = {type: 0, id, name: userName, avatar};
  return (
    <View>
      <Text>UserPage</Text>
      <Button
        onPress={() => {
          navigation.navigate('Chat', params);
        }}>
        聊天
      </Button>
    </View>
  );
};

export default React.memo(observer(UserPage));
