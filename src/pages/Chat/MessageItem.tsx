import {View, Text, StyleSheet} from 'react-native';
import React, {useMemo, useCallback} from 'react';
import {Avatar} from '@rneui/themed';
import {baseUrl} from '@/services/baseServices';
import {pxToDp, screenWidth} from '@/utils/styles.const';

const MessageItem = ({currAvatar, item}) => {
  const isMe = useMemo<boolean>(() => item.direction === 0, [item]);
  const transMsg = useCallback(
    (item: any) => {
      const msg = item.message || item.fileName;
      return <Text style={styles.messageText}>{msg}</Text>;
    },
    [item],
  );
  return (
    <View
      style={{
        ...styles.message,
        flexDirection: isMe ? 'row-reverse' : 'row',
      }}>
      <Avatar source={{uri: baseUrl + currAvatar}} size={40} rounded />
      <View style={styles.messageBox}>
        {/* <View style={styles.idBox}>
          <Text style={{...styles.id, textAlign: isMe ? 'right' : 'left'}}>
            {item.senderUserID}
          </Text>
        </View> */}
        <View
          style={{
            ...styles.messageTextBox,
            backgroundColor: isMe ? '#D9FEDA' : '#fff',
          }}>
          {transMsg(item)}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  message: {
    paddingHorizontal: pxToDp(15),
    paddingVertical: pxToDp(4),
    alignItems: 'center',
    marginBottom: pxToDp(2),
  },
  messageBox: {
    paddingHorizontal: pxToDp(10),
  },
  id: {
    fontSize: pxToDp(12),
    paddingBottom: pxToDp(3),
  },
  idBox: {
    justifyContent: 'flex-end',
  },
  messageTextBox: {
    borderWidth: pxToDp(1),
    borderColor: '#f0f0f0',
    borderRadius: pxToDp(8),
  },
  messageText: {
    paddingVertical: pxToDp(8),
    paddingHorizontal: pxToDp(8),
    maxWidth: screenWidth / 2,
  },
});

export default React.memo(MessageItem);
