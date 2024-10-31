import {createStackNavigator} from '@react-navigation/stack';
import {BottomTab} from './BottomTabNavigation';
import FilterScreen from '../screens/mains/stacks/FilterScreen';
import AddNewAddress from '../screens/mains/stacks/addresses/AddNewAddress';
import DetailProductScreen from '../screens/mains/stacks/DetailProductScreen';
import ProductSearchScreen from '../screens/mains/stacks/ProductSearchScreen';
import SalesScreen from '../screens/mains/stacks/sales/SalesScreen';
import UpdateNewAddress from '../screens/mains/stacks/addresses/UpdateNewAddress';
import PreviousScreenAdd from '../screens/mains/stacks/addresses/PreviousScreenAdd';
import SelectShippingAddressScreen from '../screens/mains/stacks/addresses/SelectShippingAddressScreen';
import PreviousScreenUpdate from '../screens/mains/stacks/addresses/PreviosScreenUpdate';
export type stackParamListMain = {
  BottomTab: undefined;
  FilterScreen: undefined;
  AddNewAddress: {
    province?: string; 
    district?: string;
    ward?: string; 
  };
  UpdateNewAddress: { addressId: string };
  PreviousScreenAdd: {
    selectionType: 'province' | 'district' | 'ward'; 
    selectedProvince?: string; 
    selectedDistrict?: string; 
  };
  SelectShippingAddressScreen: undefined;
  DetailProductScreen: {product_id: string};
  SearchScreen: undefined;
  SalesScreen: undefined;
  PreviousScreenUpdate: {
    selectionType: 'province' | 'district' | 'ward';
    selectedProvince?: string;
    selectedDistrict?: string;
    addressId: string;
  };
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
      <Stack.Screen name="UpdateNewAddress" component={UpdateNewAddress} />
      <Stack.Screen name="AddNewAddress" component={AddNewAddress} />
      <Stack.Screen name="PreviousScreenUpdate" component={PreviousScreenUpdate} />

      
      <Stack.Screen name="PreviousScreenAdd" component={PreviousScreenAdd} />
    </Stack.Navigator>
  );
};
