import {StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {TextInput, TextInputProps} from 'react-native-paper';

export function CustomInput(props: TextInputProps) {
  return <TextInput {...props} style={styles.inputBox} mode="outlined" />;
}

export function CustomInputPassword(props: TextInputProps) {
  const [showPassword, setshowPassword] = useState(false);
  const toggleShowPassword = () => {
    setshowPassword(!showPassword);
  };
  return (
    <TextInput
      {...props}
      style={styles.inputBox}
      mode="outlined"
      secureTextEntry={!showPassword}
      right={
        <TextInput.Icon
          icon={showPassword ? 'eye' : 'eye-off'}
          onPress={toggleShowPassword}
        />
      }
    />
  );
}

const styles = StyleSheet.create({
  inputBox: {
    borderRadius: 10,
  },
});
