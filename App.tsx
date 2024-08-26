import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import ProfileScreen from './src/screens/mains/tabs/ProfileScreen';
function App(): React.JSX.Element {
  return <SafeAreaView style={{flex: 1}}>
    < ProfileScreen />
  </SafeAreaView>;
}

const styles = StyleSheet.create({});

export default App;
