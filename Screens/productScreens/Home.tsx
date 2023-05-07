import {FlatList, StyleSheet, Text, TextInput} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import LoaderIndicator from '../../components/LoaderIndicator';
import ProductCard from '../../components/ProductCard';
import EmptyProduct from '../../components/EmptyProduct';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState('');

  const onFetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      const product = await response.json();
      setProducts(product);
    } catch (error) {
      console.log('error', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    onFetchProducts();
  }, []);

  const onChangeText = (textValue: string) => {
    setText(textValue);
  };

  const filteredProducts = useMemo(
    () =>
      products.filter(product =>
        product?.title.toLowerCase().includes(text.toLowerCase()),
      ),
    [products, text],
  );

  return (
    <SafeAreaView style={styles.SafeAreaView}>
      <Text style={styles.title}>Shopi ECommerce</Text>

      {loading ? (
        <LoaderIndicator />
      ) : (
        <FlatList
          data={filteredProducts}
          renderItem={({item}) => <ProductCard item={item} />}
          numColumns={2}
          initialNumToRender={10}
          keyExtractor={(item: {id: number}) => item?.id.toString()}
          refreshing={false}
          onRefresh={onFetchProducts}
          ListEmptyComponent={<EmptyProduct />}
          ListHeaderComponent={
            <TextInput
              style={styles.input}
              onChangeText={onChangeText}
              value={text}
              placeholder={'Search product'}
              placeholderTextColor={'gray'}
            />
          }
        />
      )}
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  SafeAreaView: {
    flex: 1,
  },
  input: {
    height: 50,
    marginHorizontal: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    borderColor: 'gray',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FC4A1A',
    marginTop: 6,
    margin: 15,
  },
});
