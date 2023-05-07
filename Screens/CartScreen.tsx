import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import ProductDetails from './productScreens/ProductDetails';
import CartDetails from './cartScreens.tsx/CartDetails';

const Stack = createNativeStackNavigator();

const SearchScreen = () => {
  return (
    <Stack.Navigator initialRouteName="CartDetails">
      <Stack.Screen
        name="CartDetails"
        component={CartDetails}
        options={{headerShown: false}}
      />
      <Stack.Screen name="ProductDetails" component={ProductDetails} />
    </Stack.Navigator>
  );
};

export default SearchScreen;
