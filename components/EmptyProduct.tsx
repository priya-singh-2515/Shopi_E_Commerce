import {StyleSheet, View, Dimensions, Text} from 'react-native';
import React, {FC} from 'react';

const EmptyProduct: FC = () => {
  const {height} = Dimensions.get('screen');
  return (
    <View style={[styles.container, {height: height / 2}]}>
      <Text style={styles.text}> No Product Found </Text>
    </View>
  );
};

export default EmptyProduct;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'gray',
    alignSelf: 'center',
  },
});
