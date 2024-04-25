import {StyleSheet, StyleProp, ViewStyle} from 'react-native';
import React, {ReactNode} from 'react';
import {
  TouchableRipple,
  TouchableRippleProps,
  useTheme,
} from 'react-native-paper';
import {TouchableOpacity} from '@gorhom/bottom-sheet';
import {TouchableOpacityProps} from 'react-native-gesture-handler';

type CustomPressableProps = TouchableOpacityProps & {
  active?: boolean;
};
export function CustomPressable(props: CustomPressableProps) {
  const theme = useTheme();

  const {children, active, onPress} = props;
  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: active
            ? theme.colors.primary
            : theme.colors.primaryContainer,
        },
      ]}
      onPress={onPress}>
      {children as ReactNode}
    </TouchableOpacity>
  );
}

type CustomTouchableRippleprops = TouchableRippleProps;
export function CustomTouchableRipple(props: CustomTouchableRippleprops) {
  const {children} = props;
  return (
    <TouchableRipple
      onPress={props.onPress}
      rippleColor="rgba(0, 0, 0, .32)"
      style={props.style as StyleProp<ViewStyle>}>
      {children}
    </TouchableRipple>
  );
}

const styles = StyleSheet.create({
  wrapperCustom: {
    borderRadius: 8,
    padding: 6,
  },
  button: {
    padding: 6,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 90,
    width: 50,
    height: 50,
  },
});
