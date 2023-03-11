// import {View, Text} from 'react-native';
// import React from 'react';

// const Message: React.FC = () => {
//   return (
//     <View style={{flex: 1}}>
//       <Text>消息</Text>
//     </View>
//   );
// };

// export default React.memo(Message);

import React, {useEffect, useLayoutEffect, useState} from 'react';
import {useZIM} from '@/hooks/zim';
import {Divider, Layout, List, ListItem} from '@ui-kitten/components';
import {FlatList, StyleSheet, Text, View, Image, StatusBar} from 'react-native';
import {Icon} from 'react-native-eva-icons';
import {observer} from 'mobx-react-lite';
import {pxToDp} from '@/utils/styles.const';
import {getInfo} from '@/services/socal';
import {baseUrl} from '@/services/baseServices';
import {useNavigation} from '@react-navigation/native';
import {Avatar, Badge} from '@rneui/themed';

const timestampToTime = (timestamp: number) => {
  var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var Y = date.getFullYear() + '-';
  var M =
    (date.getMonth() + 1 < 10
      ? '0' + (date.getMonth() + 1)
      : date.getMonth() + 1) + '-';
  var D = date.getDate() + ' ';
  var h =
    (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
  var m =
    (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) +
    ':';
  var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
  return Y + M + D + h + m + s;
};

const RightBox = React.memo((props: any) => (
  <Layout style={{direction: 'rtl'}}>
    <Text>{props.text}</Text>
    {props.notify !== 1 && (
      <Icon
        name="bell-off-outline"
        fill="#a5a5a5"
        style={{width: 15, height: 15}}
      />
    )}
  </Layout>
));

const LeftBox = React.memo(({item, idMap}: any) => (
  <View style={styles.leftBox}>
    <Avatar
      rounded
      source={{
        uri: baseUrl + idMap[item.conversationID]?.avatar,
      }}
      size={40}
    />
    {item.unreadMessageCount > 0 &&
      (item.notificationStatus == 1 ? (
        <Badge
          status="error"
          value={item.unreadMessageCount > 99 ? '99+' : item.unreadMessageCount}
          containerStyle={{position: 'absolute', top: 0, left: 25}}
          badgeStyle={{
            borderColor: 'transparent',
            backgroundColor: '#FF6666',
            opacity: 0.95,
          }}
        />
      ) : (
        <View style={styles.min}></View>
      ))}
  </View>
));

const Message = () => {
  const navigation: any = useNavigation();
  const [state, zimAction] = useZIM();
  const [idMap, setIdMap] = useState({});
  useLayoutEffect(() => {
    zimAction.queryConversationList().then(res => {
      const id = res.map((val: any) => val.conversationID);
      getInfo({id: id.join(',')}).then(res => {
        const map = {};
        res.data.forEach((val: any) => {
          map[val.id] = val;
        });
        console.log(map);
        setIdMap(map);
      });
    });
  }, []);

  const lastMessage = (item: any) => {
    return item.lastMessage && item.lastMessage.message
      ? item.lastMessage.message.length > 20
        ? item.lastMessage.message.slice(0, 20) + '...'
        : item.lastMessage.message
      : '';
  };

  const intoChat = (item: any) => {
    const convInfo = {
      id: item.conversationID,
      type: item.type,
      name: idMap[item.conversationID]?.userName,
      avatar: idMap[item.conversationID]?.avatar,
    };
    zimAction
      .clearConversationUnreadMessageCount(convInfo.id, convInfo.type)
      .then(() => {
        console.log(111);
        console.log(navigation);
        navigation.navigate('Chat', convInfo);
      });
  };

  const renderItem = ({item, index}) => (
    <ListItem
      onPress={() => intoChat(item)}
      title={() => (
        <Text style={styles.title}>{idMap[item.conversationID]?.userName}</Text>
      )}
      description={() => (
        <Text style={styles.description}>{lastMessage(item)}</Text>
      )}
      accessoryLeft={<LeftBox item={item} idMap={idMap} />}
      accessoryRight={
        <RightBox
          notify={item.notificationStatus}
          text={
            (item.lastMessage && timestampToTime(item.lastMessage.timestamp)) ||
            ''
          }
        />
      }
    />
  );
  console.log('convs', state.convs);
  return (
    <View style={styles.context}>
      <StatusBar
        backgroundColor="transparent"
        translucent={true}
        barStyle={'dark-content'}
      />
      <View
        style={{
          flexDirection: 'row',
          height: pxToDp(80),
          justifyContent: 'center',
          alignItems: 'flex-end',
        }}>
        <Text
          style={{
            fontSize: pxToDp(20),
            fontWeight: '500',
            marginBottom: pxToDp(10),
          }}>
          消息
        </Text>
      </View>
      <List
        data={state.convs}
        ItemSeparatorComponent={Divider}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  context: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  title: {
    color: '#222B45',
    fontFamily: 'System',
    fontSize: pxToDp(14),
    fontWeight: '600',
    marginHorizontal: 8,
    marginTop: pxToDp(-2),
    marginBottom: pxToDp(2),
  },
  description: {
    fontSize: pxToDp(10),
    color: '#8F9BB3',
    fontFamily: 'System',
    fontWeight: '400',
    marginHorizontal: 8,
  },
  leftBox: {
    position: 'relative',
  },
  rightBox: {
    flexDirection: 'column',
  },
  point: {
    backgroundColor: 'red',
    width: 16,
    height: 16,
    borderRadius: 8,
    position: 'absolute',
    right: 0,
    zIndex: 999,
  },
  pointNumber: {
    color: 'white',
    fontWeight: '700',
    alignSelf: 'center',
  },
  min: {
    backgroundColor: 'red',
    width: 10,
    height: 10,
    borderRadius: 5,
    position: 'absolute',
    right: 0,
    zIndex: 999,
  },
  avatar: {
    height: 60,
    width: 60,
  },
});

export default React.memo(observer(Message));
