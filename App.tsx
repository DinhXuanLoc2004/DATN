import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import FilterScreen from './src/screens/mains/tabs/FilterScreen';
import ContainerFilterComponent from './src/components/layouts/ContainerFilterComponent';
function App(): React.JSX.Element {
  return <SafeAreaView style={{flex: 1}}>
    <FilterScreen/>
  </SafeAreaView>;
}

const styles = StyleSheet.create({});

export default App;
