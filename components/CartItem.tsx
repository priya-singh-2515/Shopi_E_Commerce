import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';
import {useCart} from '../store/CartProvider';

interface IProps {
  item: {
    id: number;
    title: string;
    price: number;
    quantity: number;
    image: string;
  };
}

const CartItem: FC<IProps> = ({item}) => {
  const {id, title, price, image, quantity} = item;

  const {removeItem, updateItemQuantity} = useCart();

  const onRemove = () => {
    removeItem(id);
  };
  const onAdd = () => {
    updateItemQuantity(id, quantity + 1);
  };
  const onSubtract = () => {
    if (quantity > 1) {
      updateItemQuantity(id, quantity - 1);
    }
  };

  return (
    <View style={styles.card}>
      <Image
        source={{uri: image, cache: 'only-if-cached'}}
        resizeMethod={'resize'}
        resizeMode={'center'}
        style={styles.image}
      />
      <View style={styles.titleBox}>
        <Text numberOfLines={3} style={styles.cardText}>
          {title}
        </Text>
        <TouchableOpacity onPress={onRemove}>
          <Text style={styles.remove}>Remove</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.priceBox}>
        <View style={styles.quantityBox}>
          <TouchableOpacity style={styles.buttonQuantity} onPress={onSubtract}>
            <Text style={styles.quantityText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityValue}>{quantity}</Text>
          <TouchableOpacity style={styles.buttonQuantity} onPress={onAdd}>
            <Text style={styles.quantityText}>+</Text>
          </TouchableOpacity>
        </View>
        <Text numberOfLines={3} style={styles.cardTextPrice}>
          Rs. {(price * quantity).toFixed(2)}
        </Text>
      </View>
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 10,
    padding: 10,
    margin: 10,
    backgroundColor: '#fff',
  },
  cardText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'gray',
  },
  cardTextPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'gray',
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 10,
  },
  titleBox: {
    flex: 2,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 5,
  },
  priceBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
  },
  quantityText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'gray',
    position: 'absolute',
    alignSelf: 'center',
  },
  quantityValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'gray',
    marginLeft: 10,
  },
  buttonQuantity: {
    position: 'relative',
    backgroundColor: 'lightblue',
    borderRadius: 10,
    padding: 5,
    width: 30,
    height: 30,
    marginLeft: 10,
  },
  remove: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'red',
  },
});
