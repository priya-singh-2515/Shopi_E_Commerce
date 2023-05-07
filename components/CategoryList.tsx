/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';

interface IProps {
  item: string;
  selected: string;
}

const CategoryList: FC<IProps> = ({item, selected}) => {
  return (
    <View
      style={[
        styles.card,
        {backgroundColor: item === selected ? 'lightblue' : 'lightgray'},
      ]}>
      <Text style={styles.cardText}>{item.toUpperCase()}</Text>
    </View>
  );
};

export default CategoryList;

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    marginHorizontal: 5,
    padding: 10,
    height: 42,
    marginBottom: 10,
  },
  cardText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'gray',
  },
});
