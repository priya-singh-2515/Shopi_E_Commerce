import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC, useMemo} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useCart} from '../store/CartProvider';

interface IProps {
  item: {
    id: number;
    title: string;
    price: number;
    image: string;
  };
}

const ProductCard: FC<IProps> = ({item}) => {
  const {title, price, image} = item;
  const navigation = useNavigation();

  const {cartItems, addItem, removeItem} = useCart();

  const onPress = () => {
    navigation.navigate('ProductDetails', {item: item});
  };

  const itemInCart = useMemo(
    () => cartItems.filter(cartItem => cartItem.id === item.id),
    [cartItems, item.id],
  );

  const onAddToCart = () => {
    if (itemInCart.length > 0) {
      removeItem(item.id);
    } else {
      addItem({
        id: item.id,
        title: item.title,
        price: item.price,
        quantity: 1,
        image: item.image,
      });
    }
  };
  const onRemoveToCart = () => {
    if (itemInCart.length > 0) {
      removeItem(item.id);
    }
  };

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Image
        source={{uri: image, cache: 'only-if-cached'}}
        resizeMethod={'resize'}
        resizeMode={'contain'}
        style={styles.Images}
      />
      <Text numberOfLines={2} style={styles.title}>
        {title}
      </Text>
      <View style={styles.priceBox}>
        <Text style={styles.price}>Rs. {price}</Text>
        {itemInCart.length > 0 ? (
          <TouchableOpacity
            style={styles.removeButton}
            onPress={onRemoveToCart}>
            <Text style={styles.removeText}> Remove </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.addButton} onPress={onAddToCart}>
            <Text style={styles.addText}> + Add </Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  container: {
    width: '45%',
    backgroundColor: '#fff',
    borderRadius: 10,
    margin: 10,
    padding: 10,
  },
  Images: {
    height: 200,
    width: '100%',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'gray',
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  priceBox: {
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: '#fcd54a',
    borderRadius: 10,
    padding: 6,
  },
  removeButton: {
    backgroundColor: '#f44336',
    borderRadius: 10,
    padding: 6,
  },
  addText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'black',
  },
  removeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#ffff',
  },
});
