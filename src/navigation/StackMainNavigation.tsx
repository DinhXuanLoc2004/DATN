import {createStackNavigator} from '@react-navigation/stack';
import {BottomTab, RootBottomTabParamList} from './BottomTabNavigation';
import FilterScreen from '../screens/mains/stacks/FilterScreen';
import AddNewAddress from '../screens/mains/stacks/AddNewAddress';
import DetailProductScreen from '../screens/mains/stacks/DetailProductScreen';
import ProductSearchScreen from '../screens/mains/stacks/ProductSearchScreen';
import SalesScreen from '../screens/mains/stacks/sales/SalesScreen';

import PreviousScreen from '../screens/mains/stacks/PreviousScreen';
import SelectShippingAddressScreen from '../screens/mains/stacks/SelectShippingAddressScreen';
import CartScreen from '../screens/mains/tabs/CartScreen';
import ProductsSaleScreen from '../screens/mains/stacks/sales/ProductsSaleScreen';
import VouchersScreen from '../screens/mains/stacks/vouchers/VouchersScreen';
import VoucherDetailScreen from '../screens/mains/stacks/vouchers/VoucherDetailScreen';
import VouchersUserScreen from '../screens/mains/stacks/voucher_user/VouchersUserScreen';
import CheckoutScreen from '../screens/mains/stacks/orders/CheckoutScreen';
import DeliveryMethodScreen from '../screens/mains/stacks/DeliveryMethodScreen';
export type stackParamListMain = {
  BottomTab: undefined;
  FilterScreen: undefined;
  AddNewAddress: undefined;
  PreviousScreen: undefined;
  SelectShippingAddressScreen: undefined;
  DetailProductScreen: {product_id: string};
  SearchScreen: undefined;
  SalesScreen: undefined;
  CartScreen: {cart_id?: string};
  ProductsSaleScreen: {sale_id: string; name_sale: string};
  VouchersScreen: undefined;
  VoucherDetailScreen: {voucher_id: string};
  VouchersUserScreen: undefined;
  CheckoutScreen: {cart_ids: string[]};
  DeliveryMethodScreen: {delivery_id: string}
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
      <Stack.Screen
        name="SelectShippingAddressScreen"
        component={SelectShippingAddressScreen}
      />
      <Stack.Screen name="AddNewAddress" component={AddNewAddress} />
      <Stack.Screen name="PreviousScreen" component={PreviousScreen} />
      <Stack.Screen name="CartScreen" component={CartScreen} />
      <Stack.Screen name="ProductsSaleScreen" component={ProductsSaleScreen} />
      <Stack.Screen name="VouchersScreen" component={VouchersScreen} />
      <Stack.Screen
        name="VoucherDetailScreen"
        component={VoucherDetailScreen}
      />
      <Stack.Screen name="VouchersUserScreen" component={VouchersUserScreen} />
      <Stack.Screen name='CheckoutScreen' component={CheckoutScreen}/>
      <Stack.Screen name='DeliveryMethodScreen' component={DeliveryMethodScreen}/>
    </Stack.Navigator>
  );
};
