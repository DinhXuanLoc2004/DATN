import {NavigationContainer} from '@react-navigation/native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import React from 'react';
import {SafeAreaView} from 'react-native';
import 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import {store, useAppSelector} from './src/helper/store/store';
import {navigationRef, RootNavigation} from './src/navigation/RootNavigation';
import {PortalProvider} from '@gorhom/portal';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import DialogIsLoginComponent from './src/components/dialogs/DialogIsLoginComponent';
import ProductSearchScreen from './src/screens/mains/stacks/ProductSearchScreen';
const queryClient = new QueryClient();
function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaView style={{flex: 1}}>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <NavigationContainer ref={navigationRef}>
              <BottomSheetModalProvider>
                <PortalProvider>
                  {/* <RootNavigation /> */}
                  <ProductSearchScreen/>
                </PortalProvider>
              </BottomSheetModalProvider>
            </NavigationContainer>
          </QueryClientProvider>
        </Provider>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

export default App;
