import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ContainerComponent from '../../../../components/layouts/ContainerComponent';
import WebView, {WebViewNavigation} from 'react-native-webview';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {stackParamListMain} from '../../../../navigation/StackMainNavigation';
import {StackNavigationProp} from '@react-navigation/stack';

type routeProp = RouteProp<stackParamListMain, 'PaypalWebview'>;
type stackProp = StackNavigationProp<stackParamListMain, 'PaypalWebview'>;

const PaypalWebview = ({route}: {route: routeProp}) => {
  const {approve} = route.params;

  const navigation = useNavigation<stackProp>();

  const _onNavigationStateChange = async (webViewState: WebViewNavigation) => {
    const {url} = webViewState;
    if (
      url.includes(
        'https://backenddatn-production.up.railway.app/v1/api/payment_method/return_url_paypal',
      )
    ) {
      navigation.navigate('OrderSuccessScreen');
    }

    // Kiểm tra URL hủy bỏ
    // if (url.includes('https://example.cancel.com')) {
    //   Alert.alert('Thanh toán bị hủy', 'Bạn đã hủy thanh toán.');
    //   navigaiton.goBack(); // Quay lại ứng dụng
    // }
  };

  return (
    <ContainerComponent>
      <WebView
        source={{uri: approve}}
        style={{flex: 1}}
        onNavigationStateChange={state => _onNavigationStateChange(state)}
      />
    </ContainerComponent>
  );
};

export default PaypalWebview;

const styles = StyleSheet.create({});
