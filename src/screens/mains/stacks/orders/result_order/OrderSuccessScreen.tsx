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
  const {app_trans_id, payment_type} = route.params;
  const order_id = payment_type === 'Zalo Pay' ? app_trans_id.split('_')[1] : '';

  const navigation = useNavigation<stackProp>();

  return (
    <ContainerComponent>
      <SpaceComponent height={50} />
      <SectionComponent style={styles.containerContent}>
        <Image
          source={require('../../../../../assets/images/img_order_success.png')}
        />
        <SpaceComponent height={15} />
        <TextComponent
          text="Order Success!"
          size={25}
          font={fontFamilies.bold}
        />
        <SpaceComponent height={10} />
        <TouchableOpacity style={styles.btnOrderDetail} onPress={() => navigation.navigate('OrderDetailScreen', {order_id})}>
          <TextComponent
            text="Order detail"
            font={fontFamilies.medium}
            color={colors.Success_Color}
          />
        </TouchableOpacity>
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
  },
});
