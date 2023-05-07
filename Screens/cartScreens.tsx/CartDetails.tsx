import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import CartItem from '../../components/CartItem';
import EmptyProduct from '../../components/EmptyProduct';
import {useCart} from '../../store/CartProvider';
import TotalPayment from '../../components/TotalPayment';

const CartDetails = () => {
  const {cartItems} = useCart();
  return (
    <SafeAreaView style={styles.SafeAreaView}>
      <View style={styles.container}>
        <Text style={styles.cartHeader}>CartDetails</Text>

        <FlatList
          data={cartItems}
          renderItem={({item}) => <CartItem item={item} />}
          keyExtractor={item => item.id.toString()}
          ListEmptyComponent={<EmptyProduct />}
          ListFooterComponent={
            cartItems.length > 0 ? <TotalPayment /> : undefined
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainerStyle}
        />
        {cartItems.length > 0 && (
          <TouchableOpacity style={styles.checkout}>
            <Text style={styles.payment}>Payment</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

export default CartDetails;

const styles = StyleSheet.create({
  SafeAreaView: {
    flex: 1,
  },
  container: {
    flex: 1,
    position: 'relative',
  },
  cartHeader: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'gray',
    marginTop: 6,
    margin: 15,
  },

  divider: {
    height: 1,
    backgroundColor: 'gray',
    marginHorizontal: 15,
  },
  checkout: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    borderRadius: 10,
    padding: 10,
  },
  payment: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  contentContainerStyle: {
    paddingBottom: 100,
  },
});
