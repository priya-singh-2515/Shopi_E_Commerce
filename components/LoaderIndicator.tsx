import {StyleSheet, ActivityIndicator, View, Dimensions} from 'react-native';
import React, {FC} from 'react';

const LoaderIndicator: FC = () => {
  const {height} = Dimensions.get('screen');
  return (
    <View style={[styles.container, {height: height / 2}]}>
      <ActivityIndicator size={'large'} />
    </View>
  );
};

export default LoaderIndicator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
