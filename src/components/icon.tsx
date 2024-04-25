import React from 'react';
import {useTheme} from 'react-native-paper';
import {IconProps} from 'react-native-vector-icons/Icon';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type CustomIconProps = IconProps & {
  active?: boolean;
};
export default function CustomIcon(props: CustomIconProps) {
  const theme = useTheme();
  const {active, color} = props;
  let customColor = theme.colors.onPrimaryContainer;
  if (active) {
    customColor = theme.colors.onPrimary;
  }
  return <Icon {...props} color={color ?? customColor} />;
}
