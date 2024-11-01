import React, {FC} from 'react';
import {StyleSheet} from 'react-native';
import RowComponent from '../layouts/RowComponent';
import TextComponent from './TextComponent';
import {fontFamilies} from '../../constants/fontFamilies';
import SpaceComponent from '../layouts/SpaceComponent';
import {colors} from '../../constants/colors';
import { fotmatedAmount } from '../../utils/fotmats';

interface Props {
  price: number;
  discount: number;
  size?: number;
  flex?: number;
  font?: string;
}

const SalePriceComponent: FC<Props> = ({price, discount, size, flex, font}) => {
  const newPrice = discount > 0 ? fotmatedAmount((price - ((price * discount)/100)) * 1000) : fotmatedAmount(price * 1000);
  return (
    <RowComponent justify="flex-end" flex={flex}>
      {discount > 0 && (
        <RowComponent style={{flexShrink: 1}}>
          <TextComponent
            color={colors.Gray_Color}
            size={size ?? 14}
            font={font ?? fontFamilies.medium}
            text={`${fotmatedAmount(price * 1000)}`}
            style={{textDecorationLine: 'line-through'}}
            numberOfLines={1}
            ellipsizeMode="tail"
          />
          <SpaceComponent width={4} />
        </RowComponent>
      )}
      <TextComponent
        color={discount > 0 ? colors.Primary_Color : colors.Text_Color}
        size={size ?? 14}
        font={font ?? fontFamilies.medium}
        text={`${discount > 0 ? newPrice : fotmatedAmount(price * 1000)}`}
      />
    </RowComponent>
  );
};

export default SalePriceComponent;

const styles = StyleSheet.create({});
