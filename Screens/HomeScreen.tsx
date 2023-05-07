import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './productScreens/Home';
import React from 'react';
import ProductDetails from './productScreens/ProductDetails';

const Stack = createNativeStackNavigator();

const HomeScreen = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen name="ProductDetails" component={ProductDetails} />
    </Stack.Navigator>
  );
};

export default HomeScreen;
