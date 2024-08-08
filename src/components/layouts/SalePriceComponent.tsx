import React, {FC} from 'react';
import {StyleSheet} from 'react-native';
import RowComponent from './RowComponent';
import TextComponent from '../texts/TextComponent';
import {fontFamilies} from '../../constants/fontFamilies';
import SpaceComponent from './SpaceComponent';
import {colors} from '../../constants/colors';

interface Props {
  price: number;
  discount: number;
  size?: number;
  flex?: number;
}

const SalePriceComponent: FC<Props> = ({price, discount, size, flex}) => {
  const newPrice = discount > 0 ? price - price * discount : price;
  return (
    <RowComponent justify="flex-start" flex={flex}>
      {discount > 0 && (
        <RowComponent>
          <TextComponent
            color={colors.Gray_Color}
            size={size ?? 14}
            font={fontFamilies.medium}
            text={`${price}$`}
            style={{textDecorationLine: 'line-through'}}
          />
          <SpaceComponent width={4} />
        </RowComponent>
      )}
      <TextComponent
        color={discount > 0 ? colors.Primary_Color : colors.Text_Color}
        size={size ?? 14}
        font={fontFamilies.medium}
        text={`${discount > 0 ? newPrice : price}$`}
      />
    </RowComponent>
  );
};

export default SalePriceComponent;

const styles = StyleSheet.create({});
