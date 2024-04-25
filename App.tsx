import React, {useCallback, useEffect, useState} from 'react';
import * as Keychain from 'react-native-keychain';

import {NavigationPublic} from './src/routes/Navigation';
import {
  adaptNavigationTheme,
  MD3LightTheme,
  MD3DarkTheme,
  PaperProvider,
  useTheme,
  Text,
} from 'react-native-paper';
import {DefaultTheme, DarkTheme} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {useAppDispatch, useAppSelector} from './src/redux/hooks';
import {resetState, setAccessToken} from './src/redux/slice/loginSlice';
import {NavigationCustomer} from './src/routes/NavigationCustomer';

const lightColors = {
  colors: {
    primary: 'rgb(0, 93, 181)',
    onPrimary: 'rgb(255, 255, 255)',
    primaryContainer: 'rgb(214, 227, 255)',
    onPrimaryContainer: 'rgb(0, 27, 61)',
    secondary: 'rgb(147, 75, 0)',
    onSecondary: 'rgb(255, 255, 255)',
    secondaryContainer: 'rgb(255, 220, 197)',
    onSecondaryContainer: 'rgb(48, 20, 0)',
    tertiary: 'rgb(0, 100, 148)',
    onTertiary: 'rgb(255, 255, 255)',
    tertiaryContainer: 'rgb(203, 230, 255)',
    onTertiaryContainer: 'rgb(0, 30, 48)',
    error: 'rgb(186, 26, 26)',
    onError: 'rgb(255, 255, 255)',
    errorContainer: 'rgb(255, 218, 214)',
    onErrorContainer: 'rgb(65, 0, 2)',
    background: 'rgb(253, 251, 255)',
    onBackground: 'rgb(26, 27, 30)',
    surface: 'rgb(253, 251, 255)',
    onSurface: 'rgb(26, 27, 30)',
    surfaceVariant: 'rgb(224, 226, 236)',
    onSurfaceVariant: 'rgb(67, 71, 78)',
    outline: 'rgb(116, 119, 127)',
    outlineVariant: 'rgb(196, 198, 207)',
    shadow: 'rgb(0, 0, 0)',
    scrim: 'rgb(0, 0, 0)',
    inverseSurface: 'rgb(47, 48, 51)',
    inverseOnSurface: 'rgb(241, 240, 244)',
    inversePrimary: 'rgb(168, 200, 255)',
    elevation: {
      level0: 'transparent',
      level1: 'rgb(240, 243, 251)',
      level2: 'rgb(233, 238, 249)',
      level3: 'rgb(225, 234, 247)',
      level4: 'rgb(223, 232, 246)',
      level5: 'rgb(218, 229, 245)',
    },
    surfaceDisabled: 'rgba(26, 27, 30, 0.12)',
    onSurfaceDisabled: 'rgba(26, 27, 30, 0.38)',
    backdrop: 'rgba(45, 48, 56, 0.4)',
  },
};

const darkColors = {
  colors: {
    primary: 'rgb(168, 200, 255)',
    onPrimary: 'rgb(0, 48, 98)',
    primaryContainer: 'rgb(0, 70, 139)',
    onPrimaryContainer: 'rgb(214, 227, 255)',
    secondary: 'rgb(255, 183, 130)',
    onSecondary: 'rgb(79, 37, 0)',
    secondaryContainer: 'rgb(112, 56, 0)',
    onSecondaryContainer: 'rgb(255, 220, 197)',
    tertiary: 'rgb(143, 205, 255)',
    onTertiary: 'rgb(0, 52, 79)',
    tertiaryContainer: 'rgb(0, 75, 113)',
    onTertiaryContainer: 'rgb(203, 230, 255)',
    error: 'rgb(255, 180, 171)',
    onError: 'rgb(105, 0, 5)',
    errorContainer: 'rgb(147, 0, 10)',
    onErrorContainer: 'rgb(255, 180, 171)',
    background: 'rgb(26, 27, 30)',
    onBackground: 'rgb(227, 226, 230)',
    surface: 'rgb(26, 27, 30)',
    onSurface: 'rgb(227, 226, 230)',
    surfaceVariant: 'rgb(67, 71, 78)',
    onSurfaceVariant: 'rgb(196, 198, 207)',
    outline: 'rgb(142, 144, 153)',
    outlineVariant: 'rgb(67, 71, 78)',
    shadow: 'rgb(0, 0, 0)',
    scrim: 'rgb(0, 0, 0)',
    inverseSurface: 'rgb(227, 226, 230)',
    inverseOnSurface: 'rgb(47, 48, 51)',
    inversePrimary: 'rgb(0, 93, 181)',
    elevation: {
      level0: 'transparent',
      level1: 'rgb(33, 36, 41)',
      level2: 'rgb(37, 41, 48)',
      level3: 'rgb(42, 46, 55)',
      level4: 'rgb(43, 48, 57)',
      level5: 'rgb(46, 51, 62)',
    },
    surfaceDisabled: 'rgba(227, 226, 230, 0.12)',
    onSurfaceDisabled: 'rgba(227, 226, 230, 0.38)',
    backdrop: 'rgba(45, 48, 56, 0.4)',
  },
};

const lightTheme = {
  ...MD3LightTheme,
  colors: lightColors.colors,
};

const darkTheme = {
  ...MD3DarkTheme,
  colors: darkColors.colors,
};

export type AppTheme = typeof lightTheme;

export const useAppTheme = () => useTheme<AppTheme>();

const {LightTheme} = adaptNavigationTheme({
  reactNavigationLight: DefaultTheme,
  reactNavigationDark: DarkTheme,
  materialLight: lightTheme,
  materialDark: darkTheme,
});

const App = () => {
  const dispatch = useAppDispatch();
  const {accessToken} = useAppSelector(state => state.auth);
  const [status, setStatus] = useState('loading');

  const loadJWT = useCallback(async () => {
    // await Keychain.resetGenericPassword();

    try {
      const value = await Keychain.getGenericPassword();
      if (value) {
        const storageAccessToken = value.password;
        dispatch(setAccessToken(storageAccessToken));
      } else {
        console.log('No credentials stored');
      }
      setStatus('success');
    } catch (error) {
      setStatus('error');
      dispatch(resetState());
    }
  }, [dispatch]);

  useEffect(() => {
    loadJWT();
  }, [loadJWT]);

  if (status === 'loading') {
    return <Text>Loading</Text>;
  }

  return (
    <PaperProvider theme={lightTheme}>
      <GestureHandlerRootView style={{flex: 1}}>
        <BottomSheetModalProvider>
          {accessToken ? (
            <NavigationCustomer lightTheme={LightTheme} />
          ) : (
            <NavigationPublic lightTheme={LightTheme} />
          )}
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </PaperProvider>
  );
};

export default App;
