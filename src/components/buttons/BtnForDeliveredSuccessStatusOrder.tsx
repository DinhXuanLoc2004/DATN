import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {stackParamListMain} from '../../navigation/StackMainNavigation';
import {useNavigation} from '@react-navigation/native';
import RowComponent from '../layouts/RowComponent';
import ButtonComponent from './ButtonComponent';
import {handleSize} from '../../utils/handleSize';
import {colors} from '../../constants/colors';

interface Props {
  order_id: string;
}
type stackProp = StackNavigationProp<stackParamListMain, 'OrdersScreen'>;

const BtnForDeliveredSuccessStatusOrder: FC<Props> = ({order_id}) => {
  const navigation = useNavigation<stackProp>();
  return (
    <RowComponent>
      <ButtonComponent
        text="Review"
        colorText={colors.Primary_Color}
        colorButton={colors.White_Color}
        style={styles.btn}
        onPress={() => {
          navigation.navigate('ReviewProductsScreen', {order_id: order_id});
        }}
      />
      <ButtonComponent
        text="Re-order"
        onPress={() =>
          navigation.navigate({
            name: 'CheckoutScreen',
            params: {
              order_id: order_id,
              is_continue_checkout: true,
              is_re_order: true,
            },
            key: Date.now().toString(),
          })
        }
        style={styles.btn}
      />
    </RowComponent>
  );
};

export default BtnForDeliveredSuccessStatusOrder;

const styles = StyleSheet.create({
  btn: {
    elevation: 0,
    paddingVertical: handleSize(10),
    width: '45%',
  },
});
