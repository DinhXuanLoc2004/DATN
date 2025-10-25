import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {stackParamListMain} from '../../navigation/StackMainNavigation';
import {useNavigation} from '@react-navigation/native';
import ButtonComponent from './ButtonComponent';
import {handleSize} from '../../utils/handleSize';

interface Props {
  order_id: string;
}

type stackProp = StackNavigationProp<stackParamListMain, 'OrdersScreen'>;

const BtnForCanceledStatusOrder: FC<Props> = ({order_id}) => {
  const navigation = useNavigation<stackProp>();
  return (
    <ButtonComponent
      text="Re-order"
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
  );
};

export default BtnForCanceledStatusOrder;

const styles = StyleSheet.create({
  btn: {
    elevation: 0,
    paddingVertical: handleSize(10),
  },
});
