import React, {useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import ItemFavoriteComponent from './src/components/layouts/ItemFavoriteComponent';
function App(): React.JSX.Element {
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar />
      <ItemFavoriteComponent></ItemFavoriteComponent>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});

export default App;
