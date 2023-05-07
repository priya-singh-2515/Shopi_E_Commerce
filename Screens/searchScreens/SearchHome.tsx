import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {FC, useEffect, useMemo, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import LoaderIndicator from '../../components/LoaderIndicator';
import ProductCard from '../../components/ProductCard';
import EmptyProduct from '../../components/EmptyProduct';
import CategoryList from '../../components/CategoryList';

const SearchHome: FC = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState('');
  const [category, setCategory] = useState([
    'electronics',
    'jewelery',
    "men's clothing",
    "women's clothing",
  ]);
  const [selectedCategory, setSelectedCategory] = useState('electronics');

  const onFetchProducts = async (selected: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://fakestoreapi.com/products/category/${selected}`,
      );
      const product = await response.json();
      setProducts(product);
    } catch (error) {
      console.log('error', error);
    }
    setLoading(false);
  };

  const onFetchCategory = async () => {
    try {
      const response = await fetch(
        'https://fakestoreapi.com/products/categories',
      );
      const product = await response.json();
      setCategory(product);
      setSelectedCategory(product[0]);
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    onFetchCategory();
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

  const onSelectedCategory = (item: string) => {
    setSelectedCategory(item);
    onFetchProducts(item);
  };

  const renderItem = ({item, index}: {item: string; index: number}) => (
    <TouchableOpacity key={index} onPress={() => onSelectedCategory(item)}>
      <CategoryList item={item} selected={selectedCategory} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.SafeAreaView}>
      <Text style={styles.title}>Search Product</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
        placeholder={'Search product'}
        placeholderTextColor={'gray'}
      />

      {loading ? (
        <LoaderIndicator />
      ) : (
        <FlatList
          data={filteredProducts}
          renderItem={({item}) => <ProductCard item={item} />}
          numColumns={2}
          initialNumToRender={10}
          keyExtractor={(item: {id: number}) => item?.id.toString()}
          ListEmptyComponent={<EmptyProduct />}
          ListHeaderComponent={
            <FlatList
              data={category}
              renderItem={renderItem}
              horizontal={true}
              keyExtractor={item => item.toString()}
              showsHorizontalScrollIndicator={false}
              style={styles.category}
            />
          }
        />
      )}
    </SafeAreaView>
  );
};

export default SearchHome;

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
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'gray',
    marginTop: 6,
    margin: 15,
  },
  category: {
    marginHorizontal: 10,
  },
});
