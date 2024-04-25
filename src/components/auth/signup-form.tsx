import {StyleSheet} from 'react-native';
import React, {useCallback, useMemo, useRef, useState} from 'react';
import {Button, Text} from 'react-native-paper';
import {BottomSheetModal, BottomSheetView} from '@gorhom/bottom-sheet';
import CustomBackdrop from '../backdrop';
import {Space} from '../views';
import {CustomInput, CustomInputPassword} from '../inputs';
import {PrimaryButton} from '../buttons';
import Handle from '../bottom-sheet/handle';
import {signup, SignupParams} from '../../redux/slice/loginSlice';
import {useAppDispatch} from '../../redux/hooks';
import {useNavigation} from '@react-navigation/native';

type Props = {
  callbackFunction?: () => void;
};
export default function SignupButton({callbackFunction}: Props) {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['80%', '100%'], []);
  const [params, setParams] = useState<SignupParams>({
    email: '',
    firstName: '',
    lastName: '',
    middleName: '',
    password: '',
    phone_number: '',
  });

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const onSignup = async () => {
    try {
      const response = await dispatch(signup({...params})).unwrap();
      console.log(response);
      if (response.status === 200) {
        navigation.navigate('Login');
      }
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
        Sign up
      </Button>
      <BottomSheetModal
        handleComponent={Handle}
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        backdropComponent={CustomBackdrop}>
        <BottomSheetView style={styles.contentContainer}>
          <Text style={styles.title}>Sign up</Text>
          <Space direction="vertical" gap={15}>
            <Space direction="vertical" gap={10} extraStyle={{width: '80%'}}>
              <Space>
                <CustomInput
                  label="First Name"
                  onChangeText={value =>
                    setParams(prev => {
                      return {...prev, firstName: value};
                    })
                  }
                />
                <CustomInput
                  label="Middle Name"
                  onChangeText={value =>
                    setParams(prev => {
                      return {...prev, middleName: value};
                    })
                  }
                />
                <CustomInput
                  label="Last Name"
                  onChangeText={value =>
                    setParams(prev => {
                      return {...prev, lastName: value};
                    })
                  }
                />
              </Space>
              <CustomInput
                label="Phone Number"
                onChangeText={value =>
                  setParams(prev => {
                    return {...prev, phone_number: value};
                  })
                }
              />
              <CustomInput
                label="Email"
                onChangeText={value =>
                  setParams(prev => {
                    return {...prev, email: value};
                  })
                }
              />
              <CustomInputPassword
                label="Password"
                onChangeText={value =>
                  setParams(prev => {
                    return {...prev, password: value};
                  })
                }
              />
              <CustomInputPassword label="Repeat Password" />
            </Space>
            <PrimaryButton onPress={onSignup}>Sign Up</PrimaryButton>
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
