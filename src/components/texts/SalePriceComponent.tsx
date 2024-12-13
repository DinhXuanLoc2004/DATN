import React, {FC} from 'react';
import {StyleProp, StyleSheet, ViewStyle} from 'react-native';
import RowComponent from '../layouts/RowComponent';
import TextComponent from './TextComponent';
import {fontFamilies} from '../../constants/fontFamilies';
import SpaceComponent from '../layouts/SpaceComponent';
import {colors} from '../../constants/colors';
import {fotmatedAmount} from '../../utils/fotmats';

interface Props {
  price: number;
  discount: number;
  size?: number;
  flex?: number;
  font?: string;
  flex_left?: number;
  flex_right?: number;
  text_align?: 'auto' | 'left' | 'right' | 'center' | 'justify';
  justify?:
    | 'center'
    | 'flex-start'
    | 'flex-end'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  styleContainer?: StyleProp<ViewStyle>;
}

const SalePriceComponent: FC<Props> = ({
  price,
  discount,
  size,
  flex,
  font,
  flex_left,
  flex_right,
  text_align,
  justify,
  styleContainer,
}) => {
  const newPrice =
    discount > 0
      ? fotmatedAmount(price - (price * discount) / 100)
      : fotmatedAmount(price);
  return (
    <RowComponent
      justify={justify ?? 'flex-end'}
      flex={flex}
      style={styleContainer}>
      <TextComponent
        color={discount > 0 ? colors.Primary_Color : colors.Text_Color}
        size={size ?? 14}
        font={font ?? fontFamilies.medium}
        text={`${discount > 0 ? newPrice : fotmatedAmount(price)}`}
        numberOfLines={1}
        flex={flex_left ?? 1}
        style={{textAlign: text_align ?? 'left'}}
      />
      {discount > 0 && (
        <RowComponent style={{flexShrink: 1}} flex={flex_right ?? 0.8}>
          <SpaceComponent width={5} />
          <TextComponent
            color={colors.Gray_Color}
            size={size ?? 14}
            font={font ?? fontFamilies.medium}
            text={`${fotmatedAmount(price)}`}
            style={{
              textDecorationLine: 'line-through',
              textAlign: text_align ?? 'left',
            }}
            numberOfLines={1}
            flex={1}
          />
        </RowComponent>
      )}
    </RowComponent>
  );
};

export default SalePriceComponent;

const styles = StyleSheet.create({});
