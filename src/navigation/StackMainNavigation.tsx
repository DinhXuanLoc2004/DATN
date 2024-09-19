import {createStackNavigator} from '@react-navigation/stack';
import {BottomTab} from './BottomTabNavigation';
import FilterScreen from '../screens/mains/stacks/FilterScreen';

export type stackParamListMain = {
  BottomTab: undefined;
  FilterScreen: undefined;
};

const Stack = createStackNavigator<stackParamListMain>();

export const StackMainNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="BottomTab"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="BottomTab" component={BottomTab} />
      <Stack.Screen name="FilterScreen" component={FilterScreen} />
    </Stack.Navigator>
  );
};
