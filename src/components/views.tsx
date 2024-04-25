import {
  View,
  StyleSheet,
  ScrollViewProps,
  ViewProps,
  Image,
} from 'react-native';
import React from 'react';
import {useTheme} from 'react-native-paper';
import {ScrollView} from 'react-native-gesture-handler';

export function ContentView({children}: ViewProps) {
  const theme = useTheme();

  return (
    <View style={[{backgroundColor: theme.colors.primary}, styles.view]}>
      <View style={{flex: 1, paddingHorizontal: 50}}>
        <Image
          source={require('../assets/Logo.png')}
          style={styles.backgroundImage}
          resizeMode="contain"
        />
      </View>
      {children}
    </View>
  );
}

export function CustomView(props: ViewProps) {
  const {children, style} = props;
  return <View style={[styles.customView, style]}>{children}</View>;
}

type CustomScrollViewProps = ScrollViewProps & {
  gap?: number;
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
};
export function CustomScrollView(props: CustomScrollViewProps) {
  const {children} = props;
  const gap = props.gap !== undefined ? props.gap : 15;
  const direction = props.direction !== undefined ? props.direction : 'row';
  const isHorizontal = direction === 'row' || direction === 'row-reverse';

  return (
    <ScrollView
      indicatorStyle="white"
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      horizontal={isHorizontal}>
      <View style={[styles.listView, {gap: gap, flexDirection: direction}]}>
        {children}
      </View>
    </ScrollView>
  );
}

type SpaceProps = Omit<ViewProps, 'style'> & {
  direction?: 'horizontal' | 'vertical';
  gap?: number;
  extraStyle?: ViewProps['style'];
};
export function Space({
  children,
  direction = 'horizontal',
  gap = 5,
  extraStyle,
}: SpaceProps) {
  const style =
    direction === 'horizontal' ? styles.flexHorizontal : styles.flexVertical;
  return <View style={[style, {gap: gap}, extraStyle]}>{children}</View>;
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  customView: {
    paddingHorizontal: 23,
  },
  listView: {
    paddingHorizontal: 10,
    paddingTop: 10,
    display: 'flex',
  },
  flexHorizontal: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  flexVertical: {
    display: 'flex',
    flexDirection: 'column',
  },
});
