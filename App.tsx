import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import LoginScreen from './src/screens/auths/LoginScreen';
import {Provider} from 'react-redux';
import {store} from './src/helper/store/store';
function App(): React.JSX.Element {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Provider store={store}>
        <LoginScreen />
      </Provider>
    </SafeAreaView>
  );
}

export default App;
