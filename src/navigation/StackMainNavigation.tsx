import {createStackNavigator} from '@react-navigation/stack';
import {BottomTab} from './BottomTabNavigation';
import FilterScreen from '../screens/mains/stacks/FilterScreen';
import DetailProductScreen from '../screens/mains/stacks/DetailProductScreen';
import ProductSearchScreen from '../screens/mains/stacks/ProductSearchScreen';
import SalesScreen from '../screens/mains/stacks/sales/SalesScreen';

export type stackParamListMain = {
  BottomTab: undefined;
  FilterScreen: undefined;
  DetailProductScreen: {product_id: string};
  SearchScreen: undefined;
  SalesScreen: undefined;
};

const Stack = createStackNavigator<stackParamListMain>();

export const StackMainNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="BottomTab"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="BottomTab" component={BottomTab} />
      <Stack.Screen name="FilterScreen" component={FilterScreen} />
      <Stack.Screen
        name="DetailProductScreen"
        component={DetailProductScreen}
      />
      <Stack.Screen name="SearchScreen" component={ProductSearchScreen} />
      <Stack.Screen name="SalesScreen" component={SalesScreen} />
    </Stack.Navigator>
  );
};
