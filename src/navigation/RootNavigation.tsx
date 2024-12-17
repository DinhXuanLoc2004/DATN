import messaging from '@react-native-firebase/messaging';
import {
  createNavigationContainerRef
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useEffect } from 'react';
import { PermissionsAndroid, Platform, StyleSheet } from 'react-native';
import DialogIsLoginComponent from '../components/dialogs/DialogIsLoginComponent';
import ContainerComponent from '../components/layouts/ContainerComponent';
import { setFcmTokenAPI } from '../helper/apis/auth.api';
import { useAppSelector } from '../helper/store/store';
import { displayNotifycation } from '../notifycations/DisplayNotifacation';
import ForgotPasswordScreen from '../screens/auths/ForgotPasswordScreen';
import LoginScreen from '../screens/auths/LoginScreen';
import RegisterScreen from '../screens/auths/RegisterScreen';
import VerifyOTPScreen from '../screens/auths/VerifyOTPScreen';
import NewPasswordScreen from '../screens/auths/NewPasswordScreen';
import {StackMainNavigation} from './StackMainNavigation';
import {Portal} from '@gorhom/portal';

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
  const user_id = useAppSelector(state => state.auth.user.userId);

  async function requestAndroidNotificationPermission() {
    if (Platform.OS === 'android' && Platform.Version >= 33) {
      const granted = await PermissionsAndroid.request(
        'android.permission.POST_NOTIFICATIONS',
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  }

  const handleSetFcmToken = async () => {
    const hasPermission = await requestAndroidNotificationPermission();
    if (user_id && hasPermission) {
      messaging()
        .getToken()
        .then(
          async token =>
            await setFcmTokenAPI({user_id, body: {fcm_token: token}}),
        );

      return messaging().onTokenRefresh(async token => {
        await setFcmTokenAPI({user_id, body: {fcm_token: token}});
      });
    }
  };

  useEffect(() => {
    handleSetFcmToken();
  }, [user_id]);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      await displayNotifycation({
        title: remoteMessage.notification?.title || '',
        body: remoteMessage.notification?.body || '',
      });
    });

    return unsubscribe;
  }, []);

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
