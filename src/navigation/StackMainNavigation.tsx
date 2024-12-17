import {createStackNavigator} from '@react-navigation/stack';
import DetailProductScreen from '../screens/mains/stacks/DetailProductScreen';
import FilterScreen from '../screens/mains/stacks/FilterScreen';
import ProductSearchScreen from '../screens/mains/stacks/ProductSearchScreen';
import AddNewAddress from '../screens/mains/stacks/addresses/AddNewAddress';
import DistrictScreen from '../screens/mains/stacks/addresses/DistrictScreen';
import ProvinceScreen from '../screens/mains/stacks/addresses/ProvinceScreen';
import SelectShippingAddressScreen from '../screens/mains/stacks/addresses/SelectShippingAddressScreen';
import UpdateAddressScreen from '../screens/mains/stacks/addresses/UpdateAddressScreen';
import WardScreen from '../screens/mains/stacks/addresses/WardScreen';
import CheckoutScreen from '../screens/mains/stacks/orders/CheckoutScreen';
import OrderDetailScreen from '../screens/mains/stacks/orders/OrderDetailScreen';
import OrdersScreen from '../screens/mains/stacks/orders/OrdersScreen';
import PaypalWebview from '../screens/mains/stacks/orders/PaypalWebview';
import OrderSuccessScreen from '../screens/mains/stacks/orders/result_order/OrderSuccessScreen';
import ProductsSaleScreen from '../screens/mains/stacks/sales/ProductsSaleScreen';
import SalesScreen from '../screens/mains/stacks/sales/SalesScreen';
import VouchersUserScreen from '../screens/mains/stacks/voucher_user/VouchersUserScreen';
import VoucherDetailScreen from '../screens/mains/stacks/vouchers/VoucherDetailScreen';
import VouchersScreen from '../screens/mains/stacks/vouchers/VouchersScreen';
import CartScreen from '../screens/mains/tabs/CartScreen';
import {BottomTab} from './BottomTabNavigation';
import PaymentFailScreen from '../screens/mains/stacks/orders/result_order/PaymentFailScreen';
import CancelOrderScreen from '../screens/mains/stacks/orders/CancelOrderScreen';
import ReviewProductsScreen from '../screens/mains/stacks/reviews/ReviewProductsScreen';
import ReviewScreen from '../screens/mains/stacks/reviews/ReviewScreen';
import ReviewsForProductScreen from '../screens/mains/stacks/reviews/ReviewsForProductScreen';

export type stackParamListMain = {
  BottomTab: undefined;
  FilterScreen: undefined;
  AddNewAddress: undefined;
  UpdateAddressScreen: {address_id: string};
  SelectShippingAddressScreen: {is_select: boolean};
  DetailProductScreen: {product_id: string};
  SearchScreen: undefined;
  SalesScreen: undefined;
  CartScreen: {cart_id?: string};
  ProductsSaleScreen: {sale_id: string; name_sale: string};
  VouchersScreen: undefined;
  VoucherDetailScreen: {voucher_id: string};
  VouchersUserScreen: undefined;
  CheckoutScreen: {
    cart_ids?: string[];
    order_id?: string;
    is_continue_checkout: boolean;
    is_re_order?: boolean;
  };
  OrderSuccessScreen: undefined;
  OrderDetailScreen: {order_id: string};
  PaypalWebview: {approve: string};
  OrdersScreen: undefined;
  ProvinceScreen: undefined;
  DistrictScreen: undefined;
  WardScreen: undefined;
  PaymentFailScreen: {order_id: string};
  CancelOrderScreen: {order_id: string};
  ReviewProductsScreen: {order_id: string};
  ReviewScreen: {product_order_id: string};
  ReviewsForProductScreen: {product_id: string};
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
      <Stack.Screen
        name="UpdateAddressScreen"
        component={UpdateAddressScreen}
      />
      <Stack.Screen name="AddNewAddress" component={AddNewAddress} />
      <Stack.Screen name="CartScreen" component={CartScreen} />
      <Stack.Screen name="ProductsSaleScreen" component={ProductsSaleScreen} />
      <Stack.Screen name="VouchersScreen" component={VouchersScreen} />
      <Stack.Screen
        name="VoucherDetailScreen"
        component={VoucherDetailScreen}
      />
      <Stack.Screen name="VouchersUserScreen" component={VouchersUserScreen} />
      <Stack.Screen name="CheckoutScreen" component={CheckoutScreen} />
      <Stack.Screen name="OrderSuccessScreen" component={OrderSuccessScreen} />
      <Stack.Screen name="OrderDetailScreen" component={OrderDetailScreen} />
      <Stack.Screen name="PaypalWebview" component={PaypalWebview} />
      <Stack.Screen name="OrdersScreen" component={OrdersScreen} />
      <Stack.Screen name="ProvinceScreen" component={ProvinceScreen} />
      <Stack.Screen name="DistrictScreen" component={DistrictScreen} />
      <Stack.Screen name="WardScreen" component={WardScreen} />
      <Stack.Screen name="PaymentFailScreen" component={PaymentFailScreen} />
      <Stack.Screen name="CancelOrderScreen" component={CancelOrderScreen} />
      <Stack.Screen
        name="ReviewProductsScreen"
        component={ReviewProductsScreen}
      />
      <Stack.Screen name="ReviewScreen" component={ReviewScreen} />
      <Stack.Screen
        name="ReviewsForProductScreen"
        component={ReviewsForProductScreen}
      />
    </Stack.Navigator>
  );
};
