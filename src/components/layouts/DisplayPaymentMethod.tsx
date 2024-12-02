import {Image, StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {payment_methods, payment_name} from '../../constants/payment_methods';
import RowComponent from './RowComponent';
import TextComponent from '../texts/TextComponent';
import {colors} from '../../constants/colors';
import SpaceComponent from './SpaceComponent';
import {handleSize} from '../../utils/handleSize';
import {fontFamilies} from '../../constants/fontFamilies';

interface Props {
  payment_method: payment_name;
  flex?: number;
}

const DisplayPaymentMethod: FC<Props> = ({payment_method, flex}) => {
  const payment_display = payment_methods.find(
    item => item.payment_name === payment_method,
  );

  return (
    <RowComponent justify="flex-start" flex={flex ?? 0.6}>
      <TextComponent
        text={payment_display?.payment_name ?? ''}
        color={payment_display?.color_payment ?? colors.Text_Color}
        size={14}
        font={fontFamilies.medium}
      />
      <SpaceComponent width={10} />
      <Image
        source={{
          uri: payment_display?.thum_payment ?? payment_methods[0].thum_payment,
        }}
        style={styles.image}
      />
    </RowComponent>
  );
};

export default DisplayPaymentMethod;

const styles = StyleSheet.create({
  image: {
    width: handleSize(30),
    height: handleSize(30),
    borderRadius: handleSize(8),
  },
});
