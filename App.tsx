import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import RatingComponent from './src/components/layouts/RatingComponent';
function App(): React.JSX.Element {
  return <SafeAreaView style={{flex: 1, padding: 20}}>
<RatingComponent arr_star={[12, 5, 4 ,2 ,0]} avegare_star={4.5}/>
  </SafeAreaView>;
}

const styles = StyleSheet.create({});

export default App;
