import React, {useEffect, useState} from 'react';
import {Text, useWindowDimensions} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {observer} from 'mobx-react';
import My from '../My';
import Friend from '../Friend';
import Message from '../Message';
import Group from '../Group';
import makeIcon, {activeColor, defaultColor} from './IconMap';
import {StatusBar} from 'react-native';
import {useZIM} from '@/hooks/zim';

const renderScene = SceneMap({
  Friend,
  Group,
  Message,
  My,
});

function XLayout() {
  const layout = useWindowDimensions();
  const [{callID}, zimAction] = useZIM();
  useEffect(() => {
    zimAction.initEvent();
  }, []);
  const [index, setIndex] = useState<number>(0);
  const [routes] = useState([
    {
      key: 'Friend',
      title: '交友',
    },
    {
      key: 'Group',
      title: '圈子',
    },
    {
      key: 'Message',
      title: '消息',
    },
    {
      key: 'My',
      title: '我的',
    },
  ]);

  const renderTabBar = (props: any) => {
    return (
      <TabBar
        renderIcon={({route, focused, color}) => {
          return makeIcon(route.key, focused, color);
        }}
        indicatorStyle={{backgroundColor: 'white'}}
        renderLabel={({route, focused, color}) => (
          <Text style={{color: focused ? activeColor : defaultColor}}>
            {route.title}
          </Text>
        )}
        style={{backgroundColor: '#fff'}}
        {...props}
      />
    );
  };

  return (
    <>
      <StatusBar
        backgroundColor="transparent"
        translucent={true}
        // hidden={true}
        barStyle={'dark-content'}
      />
      <TabView
        style={{flex: 1}}
        lazy
        navigationState={{index, routes}}
        renderTabBar={renderTabBar}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
        tabBarPosition="bottom"
      />
    </>
  );
}

export default observer(XLayout);
