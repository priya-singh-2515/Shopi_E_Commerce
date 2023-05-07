import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {useCart} from '../store/CartProvider';

const TotalPayment: FC = () => {
  const {cartItems} = useCart();
  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.cardText}>Item Total</Text>
        <Text style={styles.cardText}>Rs. {total.toFixed(2)}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.cardText}>Delivery Fee</Text>
        <Text style={styles.cardText}>FREE</Text>
      </View>
      <View style={styles.Divider} />
      <View style={styles.row}>
        <Text style={styles.cardTextPayable}>Total Payable</Text>
        <Text style={styles.cardTextPayable}>Rs. {total.toFixed(2)}</Text>
      </View>
    </View>
  );
};

export default TotalPayment;

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    marginHorizontal: 5,
    padding: 10,
    height: 42,
    marginBottom: 50,
  },
  cardText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'gray',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  Divider: {
    height: 1,
    backgroundColor: 'gray',
    marginVertical: 10,
  },
  cardTextPayable: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
});
