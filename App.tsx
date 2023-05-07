/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import HomeScreen from './Screens/HomeScreen';
import SearchScreen from './Screens/SearchScreen';
import CartScreen from './Screens/CartScreen';
import CartProvider from './store/CartProvider';
import RNBootSplash from 'react-native-bootsplash';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <CartProvider>
      <NavigationContainer onReady={() => RNBootSplash.hide({fade: true})}>
        <Tab.Navigator
          initialRouteName="HomeStack"
          screenOptions={{
            tabBarActiveTintColor: '#e91e63',
            headerShown: false,
            tabBarLabelStyle: {
              fontSize: 14,
            },
            tabBarStyle: {
              height: 60,
              paddingBottom: 10,
              // paddingTop: 10,
            },
          }}>
          <Tab.Screen
            name="HomeStack"
            component={HomeScreen}
            options={{
              tabBarLabel: 'Home',
              tabBarIcon: ({color, size}) => (
                <Icon name="home" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="SearchStack"
            component={SearchScreen}
            options={{
              tabBarLabel: 'Search',
              tabBarIcon: ({color, size}) => (
                <Icon name="search" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="CartStack"
            component={CartScreen}
            options={{
              tabBarLabel: 'Cart',
              tabBarIcon: ({color, size}) => (
                <Icon name="shopping-cart" color={color} size={size} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
}
