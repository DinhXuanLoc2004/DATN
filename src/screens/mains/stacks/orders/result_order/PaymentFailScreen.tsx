import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {stackParamListMain} from '../../../../../navigation/StackMainNavigation';
import {StackNavigationProp} from '@react-navigation/stack';
import ContainerComponent from '../../../../../components/layouts/ContainerComponent';
import {handleSize} from '../../../../../utils/handleSize';
import FastImage from 'react-native-fast-image';
import {colors} from '../../../../../constants/colors';
import SpaceComponent from '../../../../../components/layouts/SpaceComponent';
import TextComponent from '../../../../../components/texts/TextComponent';
import {fontFamilies} from '../../../../../constants/fontFamilies';
import ButtonComponent from '../../../../../components/buttons/ButtonComponent';
import SectionComponent from '../../../../../components/layouts/SectionComponent';
import {Home} from 'iconsax-react-native';

type routeProp = RouteProp<stackParamListMain, 'PaymentFailScreen'>;
type stackProp = StackNavigationProp<stackParamListMain, 'PaymentFailScreen'>;

const PaymentFailScreen = ({route}: {route: routeProp}) => {
  const {order_id} = route.params;
  const navigation = useNavigation<stackProp>();
  return (
    <ContainerComponent
      style={styles.container}
      isHeader
      back
      iconBack={
        <View style={styles.containerIconBack}>
          <Home size={handleSize(25)} color={colors.Primary_Color} />
        </View>
      }
      backOnPress={() => navigation.navigate('BottomTab')}>
      <FastImage
        source={{
          uri: 'https://easyfashion.com.bd/wp-content/uploads/2021/04/payment-failed-min.gif',
          priority: FastImage.priority.normal,
        }}
        style={styles.img}
        resizeMode={FastImage.resizeMode.contain}
      />
      <TextComponent
        text="Payment Failed!"
        size={20}
        font={fontFamilies.semiBold}
      />
      <SpaceComponent height={10} />
      <TextComponent text="Payment failed, please pay again." />
      <ButtonComponent
        style={styles.btn}
        text="TRY AGAIN"
        onPress={() => {
          navigation.navigate({
            name: 'CheckoutScreen',
            params: {
              order_id,
              is_continue_checkout: true,
            },
            key: `CheckoutScreen-${Date.now()}`,
          });
        }}
      />
    </ContainerComponent>
  );
};

export default PaymentFailScreen;

const styles = StyleSheet.create({
  containerIconBack: {
    width: 40,
    height: 40,
    borderRadius: 15,
    backgroundColor: 'rgba(219, 48, 34, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    position: 'absolute',
    bottom: 20,
  },
  img: {
    height: handleSize(300),
    width: handleSize(300),
    borderRadius: handleSize(20),
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.Gray_Light_Color,
  },
});
