import {View, Text} from 'react-native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
const NewCustomer = (props: any) => {
  const {navigation} = props;
  AsyncStorage.getItem('token', (err, res) => {
    console.log(err, res);
  });
  AsyncStorage.getItem('111', (err, res) => {
    console.log(err, res);
  });
  return (
    <View>
      <Text>NewCustomer</Text>
    </View>
  );
};

export default NewCustomer;
