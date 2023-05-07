import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {FC, useMemo} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useCart} from '../../store/CartProvider';
import {useNavigation} from '@react-navigation/native';

interface IProps {
  route: {
    params: {
      item: {
        id: number;
        title: string;
        price: number;
        description: string;
        image: string;
        rating: {
          rate: number;
          count: number;
        };
      };
    };
  };
}

const ProductDetails: FC<IProps> = ({route}) => {
  const {id, image, title, description, price, rating} = route.params.item;
  const {cartItems, addItem, removeItem} = useCart();
  const navigation = useNavigation();

  const itemInCart = useMemo(
    () => cartItems.filter(cartItem => cartItem.id === id),
    [cartItems, id],
  );

  const onAddToCart = () => {
    if (itemInCart.length > 0) {
      removeItem(id);
    } else {
      addItem({
        id: id,
        title: title,
        price: price,
        quantity: 1,
        image: image,
      });
    }
  };

  const onBuyNow = () => {
    addItem({
      id: id,
      title: title,
      price: price,
      quantity: 1,
      image: image,
    });
    navigation.navigate('CartStack');
  };

  return (
    <SafeAreaView style={styles.SafeAreaView}>
      <View style={styles.container}>
        <Image
          source={{uri: image, cache: 'only-if-cached'}}
          resizeMethod={'resize'}
          resizeMode={'contain'}
          style={styles.image}
        />
        <Text style={styles.title}>{title}</Text>
        <View style={styles.priceBox}>
          <Text style={styles.price}>Rs. {price}</Text>
          <Text style={styles.rating}>
            Rating: {rating.rate} ({rating.count})
          </Text>
        </View>
        <Text style={styles.description}>{description}</Text>
        <View style={styles.bottomBox}>
          <TouchableOpacity style={styles.cartButton} onPress={onAddToCart}>
            <Text style={styles.buttonText}>
              {' '}
              {itemInCart.length > 0 ? 'Remove' : 'Add to Cart'}{' '}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buyButton} onPress={onBuyNow}>
            <Text style={styles.buttonText}> Buy Now </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  SafeAreaView: {
    flex: 1,
    padding: 10,
  },
  container: {
    flex: 1,
    position: 'relative',
  },
  image: {
    height: 300,
    width: '100%',
    backgroundColor: '#ffff',
    borderRadius: 10,
    padding: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'gray',
    margin: 10,
  },
  priceBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10,
  },
  price: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'black',
  },
  rating: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  description: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'gray',
    margin: 10,
  },
  bottomBox: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cartButton: {
    backgroundColor: '#fcd54a',
    padding: 10,
    borderRadius: 10,
    flex: 1,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buyButton: {
    backgroundColor: 'skyblue',
    padding: 10,
    borderRadius: 10,
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'gray',
  },
});
