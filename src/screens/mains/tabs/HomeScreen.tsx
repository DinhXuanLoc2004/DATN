import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';
import ContainerComponent from '../../../components/layouts/ContainerComponent';
import HeaderAnimatinonComponent from '../../../components/layouts/HeaderAnimatinonComponent';
import SpaceComponent from '../../../components/layouts/SpaceComponent';

const HomeScreen = () => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [animatedValue]);
  return (
    <ContainerComponent
      isScroll
      onSroll={e => animatedValue.setValue(e.nativeEvent.contentOffset.y)}
      style={styles.containerHeader}>
      <HeaderAnimatinonComponent animatedValue={animatedValue} />
      <SpaceComponent height={500} />
    </ContainerComponent>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  containerHeader: {
    width: '100%',
    paddingHorizontal: 0,
  },
});
