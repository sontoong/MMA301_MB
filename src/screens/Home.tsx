import {View, Text} from 'react-native';
import React from 'react';
import {useAppSelector} from '../app/hooks';

export default function Home() {
  const {currentUser} = useAppSelector(state => state.auth);

  return (
    <View>
      <Text>Welcome {currentUser.name}</Text>
    </View>
  );
}
