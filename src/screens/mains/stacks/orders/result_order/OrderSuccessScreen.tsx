import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {stackParamListMain} from '../../../../../navigation/StackMainNavigation';
import ContainerComponent from '../../../../../components/layouts/ContainerComponent';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {handleSize} from '../../../../../utils/handleSize';
import {colors} from '../../../../../constants/colors';
import SpaceComponent from '../../../../../components/layouts/SpaceComponent';
import SectionComponent from '../../../../../components/layouts/SectionComponent';
import TextComponent from '../../../../../components/texts/TextComponent';
import {fontFamilies} from '../../../../../constants/fontFamilies';
import {StackNavigationProp} from '@react-navigation/stack';
import ButtonComponent from '../../../../../components/buttons/ButtonComponent';

type routeProp = RouteProp<stackParamListMain, 'OrderSuccessScreen'>;
type stackProp = StackNavigationProp<stackParamListMain, 'OrderSuccessScreen'>;

const OrderSuccessScreen = ({route}: {route: routeProp}) => {
  const navigation = useNavigation<stackProp>();

  return (
    <ContainerComponent>
      <SpaceComponent height={50} />
      <SectionComponent style={styles.containerContent}>
        <Image
          source={require('../../../../../assets/images/img_order_success.png')}
        />
        <SpaceComponent height={49} />
        <TextComponent
          text="Order Success!"
          size={25}
          font={fontFamilies.bold}
        />
        <SpaceComponent height={12} />
        <TextComponent
          text="Your order will be delivered soon. Thank you for choosing our app!"
          size={14}
          style={{textAlign: 'center'}}
        />
      </SectionComponent>
      <ButtonComponent
        text="CONTINUE SHOPPING"
        onPress={() => navigation.navigate('BottomTab')}
        style={styles.btnShopping}
      />
    </ContainerComponent>
  );
};

export default OrderSuccessScreen;

const styles = StyleSheet.create({
  btnShopping: {
    bottom: handleSize(20),
  },
  btnOrderDetail: {
    width: '60%',
    height: handleSize(40),
    borderRadius: handleSize(25),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(42, 169, 82, 0.3)',
  },
  containerContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
