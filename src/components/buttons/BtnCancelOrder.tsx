import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {stackParamListMain} from '../../navigation/StackMainNavigation';
import {useNavigation} from '@react-navigation/native';
import ButtonComponent from './ButtonComponent';
import {colors} from '../../constants/colors';
import {handleSize} from '../../utils/handleSize';

interface Props {
  order_id: string;
}

type stackProp = StackNavigationProp<stackParamListMain, 'OrdersScreen'>;

const BtnCancelOrder: FC<Props> = ({order_id}) => {
  const navigation = useNavigation<stackProp>();
  return (
    <ButtonComponent
      text="Cancel"
      colorText={colors.Primary_Color}
      colorButton={colors.White_Color}
      style={styles.btn}
      onPress={() => navigation.navigate('CancelOrderScreen', {order_id})}
    />
  );
};

export default BtnCancelOrder;

const styles = StyleSheet.create({
  btn: {
    elevation: 0,
    paddingVertical: handleSize(10),
  },
});
