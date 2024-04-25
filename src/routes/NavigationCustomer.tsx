import {NavigationContainer} from '@react-navigation/native';
import React, {ReactElement} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import MainContainer from '../layout/container';

import HomeScreen from '../screens/Home';
import Test from '../screens/Test';
import PlaceOrder from '../screens/PlaceOrder';
import Profile from '../screens/Profile';
import Orders from '../screens/Orders';
import OrderDetail from '../screens/OrderDetail';

type TabBarIcons = {
  [key: string]: [string, string];
};

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const tabBarIcons: TabBarIcons = {
  Home: ['home-outline', 'home'],
  Orders: ['order-bool-ascending', 'order-bool-ascending'],
  Profile: ['account-circle-outline', 'account-circle'],
  Test: ['cog', 'cog'],
};

const CustomerLayout: React.FC<{
  children: ReactElement;
  navigation: any;
  route: any;
  minHeight?: any;
}> = ({children, navigation, route, minHeight}) => {
  return (
    <MainContainer navigation={navigation} route={route} minHeight={minHeight}>
      {children}
    </MainContainer>
  );
};

const TabNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size, focused}) => {
          let iconName = 'home';
          if (tabBarIcons[route.name]) {
            iconName = focused
              ? tabBarIcons[route.name][1]
              : tabBarIcons[route.name][0];
          }

          return <Icon name={iconName} color={color} size={size} />;
        },
        headerStyle: {},
        headerTitleStyle: {fontWeight: 'bold'},
        headerShown: false,
      })}>
      <Tab.Screen
        name="Home"
        options={{
          title: 'Services',
          tabBarLabel: 'Home',
        }}>
        {props => (
          <CustomerLayout {...props}>
            <HomeScreen />
          </CustomerLayout>
        )}
      </Tab.Screen>
      <Tab.Screen
        name="Orders"
        options={{
          title: 'Orders',
          tabBarLabel: 'Orders',
        }}>
        {props => (
          <CustomerLayout {...props}>
            <Orders />
          </CustomerLayout>
        )}
      </Tab.Screen>
      <Tab.Screen
        name="PlaceOrder"
        options={{
          title: 'PlaceOrder',
          tabBarButton: () => null,
        }}>
        {props => (
          <CustomerLayout {...props}>
            <PlaceOrder />
          </CustomerLayout>
        )}
      </Tab.Screen>
      <Tab.Screen
        name="OrderDetail"
        options={{
          title: 'OrderDetail',
          tabBarButton: () => null,
        }}>
        {props => (
          <CustomerLayout {...props}>
            <OrderDetail />
          </CustomerLayout>
        )}
      </Tab.Screen>
      <Tab.Screen
        name="Profile"
        options={{
          title: 'Profile',
          tabBarLabel: 'Profile',
        }}>
        {props => (
          <CustomerLayout {...props}>
            <Profile />
          </CustomerLayout>
        )}
      </Tab.Screen>
      {/* <Tab.Screen
        name="Test"
        options={{
          title: 'Test',
          tabBarLabel: 'Test',
        }}>
        {() => <Test />}
      </Tab.Screen> */}
    </Tab.Navigator>
  );
};

export const NavigationCustomer = ({lightTheme}: any) => {
  return (
    <NavigationContainer theme={lightTheme}>
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
