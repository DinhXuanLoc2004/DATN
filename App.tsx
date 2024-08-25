import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import DetailProductScreen from './src/screens/mains/stacks/DetailProductScreen';
function App(): React.JSX.Element {
  return <SafeAreaView style={{flex: 1}}>
    <DetailProductScreen/>
  </SafeAreaView>;
}

const styles = StyleSheet.create({});

export default App;