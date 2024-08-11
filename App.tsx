import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
function App(): React.JSX.Element {
  return (
    <SafeAreaView style={{flex: 1, padding: 20}}>
      <StatusBar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});

export default App;
