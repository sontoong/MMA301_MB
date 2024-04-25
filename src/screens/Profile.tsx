import React, {useEffect} from 'react';
import {CustomView, Space} from '../components/views';
import {Avatar, Text} from 'react-native-paper';
import {StyleSheet} from 'react-native';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {getUserById} from '../redux/slice/userSlice';
import CustomIcon from '../components/icon';
import {PrimaryButton} from '../components/buttons';
import {CustomInput} from '../components/inputs';
import Loader from '../components/loader';
import {resetState} from '../redux/slice/loginSlice';
import * as Keychain from 'react-native-keychain';

export default function Profile() {
  const dispatch = useAppDispatch();
  const {currentUser, isFetching} = useAppSelector(state => state.user);

  // console.log(currentUser.orders);

  useEffect(() => {
    dispatch(getUserById());
  }, [dispatch]);

  const logout = () => {
    (async () => await Keychain.resetGenericPassword())();
    dispatch(resetState());
  };

  return (
    <>
      {isFetching ? (
        <Loader />
      ) : (
        <CustomView style={styles.container}>
          <Avatar.Image size={120} source={require('../assets/avatar.png')} />
          <Space direction="vertical" extraStyle={{alignItems: 'center'}}>
            <Text style={[styles.textLarge, styles.textBold]}>
              {currentUser.full_name}
            </Text>
            <Text>{currentUser.email}</Text>
            <Space>
              <CustomIcon name="phone" />
              <Text>{currentUser.phone_number}</Text>
            </Space>
            <Space>
              <CustomIcon name="flag" />
              <Text>{currentUser.address ? currentUser.address : '--'}</Text>
            </Space>
            <Space direction="vertical" gap={15}>
              <Space direction="vertical" gap={10} extraStyle={{width: '80%'}}>
                <Space>
                  <CustomInput label="First Name" />
                  <CustomInput label="Middle Name" />
                  <CustomInput label="Last Name" />
                </Space>
                <CustomInput label="Phone Number" />
                <CustomInput label="Address" />
              </Space>
              <PrimaryButton>Update Info</PrimaryButton>
              <PrimaryButton onPress={() => logout()}>Log out</PrimaryButton>
            </Space>
          </Space>
        </CustomView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textLarge: {
    fontSize: 20,
  },
  text: {
    fontSize: 20,
  },
  textSmall: {
    fontSize: 12,
  },
  textBold: {
    fontWeight: 'bold',
  },
});
