import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet
} from 'react-native';
import VerifyOTPScreen from './src/screens/auths/VerifyOTPScreen';
VerifyOTPScreen
function App(): React.JSX.Element {
  return (
    <SafeAreaView style={{flex: 1, padding: 20}}>
      <VerifyOTPScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});

export default App;
