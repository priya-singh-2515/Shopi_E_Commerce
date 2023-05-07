import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SearchHome from './searchScreens/SearchHome';
import React from 'react';
import ProductDetails from './productScreens/ProductDetails';

const Stack = createNativeStackNavigator();

const SearchScreen = () => {
  return (
    <Stack.Navigator initialRouteName="SearchHome">
      <Stack.Screen
        name="SearchHome"
        component={SearchHome}
        options={{headerShown: false}}
      />
      <Stack.Screen name="ProductDetails" component={ProductDetails} />
    </Stack.Navigator>
  );
};

export default SearchScreen;
