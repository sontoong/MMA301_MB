import {StyleSheet} from 'react-native';
import React, {useCallback, useMemo, useRef} from 'react';
import {BottomSheetModal, BottomSheetView} from '@gorhom/bottom-sheet';
import CustomBackdrop from '../backdrop';
import {Button, Text} from 'react-native-paper';
import {Space} from '../views';
import {CustomInput, CustomInputPassword} from '../inputs';
import {PrimaryButton} from '../buttons';
import {useAppDispatch} from '../../redux/hooks';
import {login, setAccessToken} from '../../redux/slice/loginSlice';
import * as Keychain from 'react-native-keychain';
import Handle from '../bottom-sheet/handle';

type Props = {
  callbackFunction?: () => void;
};
export default function LoginButton({callbackFunction}: Props) {
  const dispatch = useAppDispatch();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['50%', '75%'], []);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const onLogin = async () => {
    try {
      const response = await dispatch(login({email, password})).unwrap();
      const {accessToken} = response.data;
      dispatch(setAccessToken(accessToken));

      await Keychain.setGenericPassword(
        'accessToken',
        JSON.stringify(accessToken),
      );
    } catch (error) {
      console.log('Login Failed:', error);
    }
  };

  return (
    <>
      <Button
        mode="elevated"
        onPress={() => {
          if (callbackFunction) {
            callbackFunction();
          }
          handlePresentModalPress();
        }}>
        Log in
      </Button>
      <BottomSheetModal
        handleComponent={Handle}
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        backdropComponent={CustomBackdrop}>
        <BottomSheetView style={styles.contentContainer}>
          <Text style={styles.title}>Login</Text>
          <Space direction="vertical" gap={15} extraStyle={{width: '80%'}}>
            <Space direction="vertical" gap={10}>
              <CustomInput
                label="Email"
                value={email}
                onChangeText={newText => setEmail(newText)}
              />
              <CustomInputPassword
                label="Password"
                value={password}
                onChangeText={newText => setPassword(newText)}
              />
            </Space>
            <PrimaryButton onPress={() => onLogin()}>Login</PrimaryButton>
          </Space>
        </BottomSheetView>
      </BottomSheetModal>
    </>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    color: 'black',
    fontSize: 30,
    fontWeight: 'bold',
  },
});
