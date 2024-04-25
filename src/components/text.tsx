import {TextProps} from 'react-native';
import React from 'react';
import {Text, useTheme} from 'react-native-paper';

type ActiveTextProps = TextProps & {
  active?: boolean;
};
export function ActiveText(props: ActiveTextProps) {
  const theme = useTheme();
  const {active} = props;
  let color = 'black';
  if (active) {
    color = theme.colors.primary;
  }

  return <Text style={{color: color}}>{props.children}</Text>;
}
