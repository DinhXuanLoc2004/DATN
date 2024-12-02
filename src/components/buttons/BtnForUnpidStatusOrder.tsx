import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {stackParamListMain} from '../../navigation/StackMainNavigation';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import RowComponent from '../layouts/RowComponent';
import {handleSize} from '../../utils/handleSize';
import BtnCancelOrder from './BtnCancelOrder';
import SpaceComponent from '../layouts/SpaceComponent';
import ButtonComponent from './ButtonComponent';

interface Props {
  order_id: string;
}

type stackProp = StackNavigationProp<stackParamListMain, 'OrdersScreen'>;

const BtnForUnpidStatusOrder: FC<Props> = ({order_id}) => {
  const navigation = useNavigation<stackProp>();
  return (
    <RowComponent>
      <RowComponent style={styles.row}>
        <BtnCancelOrder order_id={order_id} />
      </RowComponent>
      <RowComponent style={styles.row}>
        <ButtonComponent
          text="Payment"
          onPress={() =>
            navigation.navigate({
              name: 'CheckoutScreen',
              params: {
                order_id: order_id,
                is_continue_checkout: true,
              },
              key: Date.now().toString(),
            })
          }
          style={styles.btn}
        />
      </RowComponent>
    </RowComponent>
  );
};

export default BtnForUnpidStatusOrder;

const styles = StyleSheet.create({
  row: {
    width: '45%',
  },
  btn: {
    elevation: 0,
    paddingVertical: handleSize(10),
  },
});
