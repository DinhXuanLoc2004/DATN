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
import LoginScreen from './src/screens/auths/LoginScreen';
import RegisterScreen from './src/screens/auths/RegisterScreen';
import ItemHomeComponent from './src/components/layouts/ItemHomeComponent';
function App(): React.JSX.Element {
  return (
    <SafeAreaView style={{flex: 1}}>
      <ItemHomeComponent />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});

export default App;
