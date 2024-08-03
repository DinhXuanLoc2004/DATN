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
function App(): React.JSX.Element {
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});

export default App;
