import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet
} from 'react-native';
import ItemCartComponent from './src/components/layouts/ItemCartComponent';

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={{flex: 1, padding: 20}}>
      <StatusBar />
      <ItemCartComponent />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});

export default App;