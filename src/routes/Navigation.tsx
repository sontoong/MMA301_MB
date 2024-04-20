import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/Home';

type TabBarIcons = {
  [key: string]: [string, string];
};

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const tabBarIcons: TabBarIcons = {
  Home: ['home', 'home'],
  Detail: ['book-outline', 'book-open-blank-variant'],
  Favorites: ['heart-outline', 'heart'],
};

const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size, focused}) => {
          let iconName = 'home';
          iconName = focused
            ? tabBarIcons[route.name][1]
            : tabBarIcons[route.name][0];

          return <Icon name={iconName} color={color} size={size} />;
        },
        tabBarActiveTintColor: '#663399',
        tabBarInactiveTintColor: 'gray',
        headerStyle: {
          backgroundColor: '#663399',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {fontWeight: 'bold'},
      })}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Home',
          tabBarLabel: 'Home',
        }}
      />
    </Tab.Navigator>
  );
};

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen
          name="Welcome"
          component={TabNavigation}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
