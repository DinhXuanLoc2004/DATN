import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import React, {FC} from 'react';
import {handleDate} from '../../utils/handleDate';
import SectionComponent from './SectionComponent';
import {colors} from '../../constants/colors';
import TextComponent from '../texts/TextComponent';
import {discountString} from '../../utils/handleDiscount';
import {fontFamilies} from '../../constants/fontFamilies';

interface Props {
  createAt: Date;
  discount: number;
  style?: StyleProp<ViewStyle>;
  top?: number,
  left?: number
}

const NewOrDiscountComponent: FC<Props> = ({createAt, discount, style, left, top}) => {
  const isNew = handleDate.handleIsNewProduct(createAt);
  return isNew || discount > 0 ? (
    <SectionComponent
      style={[
        styles.container,
        {
          backgroundColor: isNew ? colors.Text_Color : colors.Primary_Color,
          top: top ?? 9,
          left: left ?? 9
        },
        style
      ]}
      flex={0}>
      <TextComponent
        text={isNew ? 'NEW' : discountString(discount)}
        size={11}
        font={fontFamilies.semiBold}
        color={colors.White_Color}
      />
    </SectionComponent>
  ) : (
    <View />
  );
};

export default NewOrDiscountComponent;

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 24,
    borderRadius: 29,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
});