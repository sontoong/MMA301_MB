import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ContentView, Space} from '../components/views';
import LoginButton from '../components/auth/login-form';
import SignupButton from '../components/auth/signup-form';

export default function Login() {
  return (
    <ContentView>
      <View style={styles.buttonsContainer}>
        <Space direction="vertical">
          <LoginButton />
          <SignupButton />
        </Space>
      </View>
    </ContentView>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  buttonsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
});
