import { createNavigationContainerRef } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ForgotPasswordScreen from '../screens/auths/ForgotPasswordScreen';
import LoginScreen from '../screens/auths/LoginScreen';
import RegisterScreen from '../screens/auths/RegisterScreen';
import VerifyOTPScreen from '../screens/auths/VerifyOTPScreen';
import { StackMainNavigation } from './StackMainNavigation';

type RootStackParamList = {
  LoginScreen: undefined;
  RegisterScreen: undefined;
  VerifyOTPScreen: undefined;
  ForgotPasswordScreen: undefined;
  StackMainNavigation: undefined;
};
const RootStack = createStackNavigator<RootStackParamList>();
export const RootNavigation = () => {
  return (
    <RootStack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="StackMainNavigation">
      <RootStack.Screen name="LoginScreen" component={LoginScreen} />
      <RootStack.Screen name="RegisterScreen" component={RegisterScreen} />
      <RootStack.Screen name="VerifyOTPScreen" component={VerifyOTPScreen} />
      <RootStack.Screen
        name="ForgotPasswordScreen"
        component={ForgotPasswordScreen}
      />
      <RootStack.Screen
        name="StackMainNavigation"
        component={StackMainNavigation}
      />
    </RootStack.Navigator>
  );
};

export const navigationRef = createNavigationContainerRef<RootStackParamList>();
