import {createNavigationContainerRef} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import ForgotPasswordScreen from '../screens/auths/ForgotPasswordScreen';
import LoginScreen from '../screens/auths/LoginScreen';
import RegisterScreen from '../screens/auths/RegisterScreen';
import VerifyOTPScreen from '../screens/auths/VerifyOTPScreen';
import NewPasswordScreen from '../screens/auths/NewPasswordScreen';
import {StackMainNavigation} from './StackMainNavigation';
import {Modal, StyleSheet} from 'react-native';
import {Portal} from '@gorhom/portal';
import ContainerComponent from '../components/layouts/ContainerComponent';
import {useAppSelector} from '../helper/store/store';
import DialogIsLoginComponent from '../components/dialogs/DialogIsLoginComponent';

export type RootStackParamList = {
  LoginScreen: undefined;
  RegisterScreen: undefined;
  VerifyOTPScreen: {email: string, fromForgotPassword?: boolean};
  NewPasswordScreen: {email: string};
  ForgotPasswordScreen: undefined;
  StackMainNavigation: undefined;
};

const RootStack = createStackNavigator<RootStackParamList>();
export const RootNavigation = () => {
  const isLogged = useAppSelector(state => state.sort.isDiaLogLogin);
  return (
    <ContainerComponent style={styles.container}>
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
          name="NewPasswordScreen"
          component={NewPasswordScreen}
        />
        <RootStack.Screen
          name="StackMainNavigation"
          component={StackMainNavigation}
        />
      </RootStack.Navigator>
      <DialogIsLoginComponent isvisiable={isLogged} />
    </ContainerComponent>
  );
};

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 0,
  },
});
