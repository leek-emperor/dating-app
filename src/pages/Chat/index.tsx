import React, {useState, useEffect, useLayoutEffect} from 'react';
import {Input, Button} from '@rneui/base';
import {StyleSheet, View, FlatList, StatusBar} from 'react-native';
import {useZIM} from '../../hooks/zim';
import {pxToDp} from '@/utils/styles.const';
import {useAppContext} from '@/store/index.context';
import MessageItem from './MessageItem';
import {observer} from 'mobx-react';

const Chat = ({navigation, route}: any) => {
  const {id, type, name, avatar} = route.params;
  const {userStore} = useAppContext();
  console.log(id, type, name);
  const [isByte, setIsByte] = useState(false);
  const [inputText, setInputText] = useState('');
  const flatList = React.useRef(null);

  const [{chatMap}, zimAction] = useZIM();
  console.log(chatMap);
  useEffect(() => {
    zimAction.setScrollView(flatList);
    zimAction
      .queryHistoryMessage(id, type, {count: 1000, reverse: true})
      .then(res => {
        setTimeout(() => {
          (flatList.current as any).scrollToEnd();
        }, 300);
      });

    return () => {
      zimAction.clearConversationUnreadMessageCount(id, type);
    };
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({title: name, headerTintColor: 'black'});
  }, [navigation, route]);

  const msgs = chatMap[id] || [];

  const sendMessage = msg => {
    setInputText('');
    zimAction.sendChatMessage(type, msg, id, isByte).then(() => {
      setTimeout(() => {
        (flatList?.current as any).scrollToEnd();
      }, 200);
    });
  };
  return (
    <View style={styles.contain}>
      <StatusBar backgroundColor="transparent" translucent={true} />
      <FlatList
        ref={flatList}
        data={msgs}
        renderItem={(props: any) => {
          console.log(props);
          const {index, item} = props;
          const isMe = item.direction === 0;
          const currAvatar = isMe ? avatar : avatar;
          return (
            <MessageItem
              key={
                props.item.messageID != '0'
                  ? props.item.messageID
                  : props.item.localMessageID
              }
              currAvatar={currAvatar}
              {...props}
            />
          );
        }}
        keyExtractor={item =>
          item.messageID != '0' ? item.messageID : item.localMessageID
        }></FlatList>

      <View style={styles.footer}>
        <View style={styles.input}>
          <Input
            value={inputText}
            onChangeText={nextValue => setInputText(nextValue)}
          />
        </View>
        <Button
          onPress={() => sendMessage(inputText)}
          style={styles.sendButton}>
          发送
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contain: {
    flex: 1,
    zIndex: 600,
  },
  converse: {
    flex: 1,
  },
  footer: {
    backgroundColor: 'white',
    height: pxToDp(70),
    flexDirection: 'row',
    padding: pxToDp(10),
    alignItems: 'center',
  },
  plus: {
    height: 25,
    width: 25,
    backgroundColor: 'white',
    borderColor: 'white',
  },
  input: {
    flex: 1,
  },
  inputButton: {
    backgroundColor: '#f5f5f5',
    paddingVertical: 0,
    borderColor: 'white',
  },
  sendButton: {
    paddingVertical: pxToDp(4),
    borderRadius: pxToDp(5),
  },
  inputIcon: {
    height: 30,
    width: 30,
  },
  chooseMore: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    justifyContent: 'space-around',
    height: 80,
    alignItems: 'center',
  },
  chooseButton: {
    height: 50,
    width: 50,
  },
});

export default React.memo(observer(Chat));
