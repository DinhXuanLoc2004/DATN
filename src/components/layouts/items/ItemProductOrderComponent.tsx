import {Image, StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import RowComponent from '../RowComponent';
import {handleSize} from '../../../utils/handleSize';
import {colors} from '../../../constants/colors';
import SectionComponent from '../SectionComponent';
import TextComponent from '../../texts/TextComponent';
import {fontFamilies} from '../../../constants/fontFamilies';
import SpaceComponent from '../SpaceComponent';
import TextColorAndSizeComponent from '../../texts/TextColorAndSizeComponent';
import {fotmatedAmount} from '../../../utils/fotmats';
import SalePriceComponent from '../../texts/SalePriceComponent';

interface Props {
  thumb: string;
  category: string;
  brand: string;
  color: string;
  size: string;
  quantity: number;
  price: number;
  name_product: string;
  discount: number;
}

const ItemProductOrderComponent: FC<Props> = ({
  thumb,
  category,
  brand,
  color,
  size,
  quantity,
  price,
  name_product,
  discount,
}) => {
  return (
    <RowComponent justify="flex-start" style={styles.container}>
      <Image source={{uri: thumb}} style={styles.thumb} />
      <SectionComponent style={styles.containerContent}>
        <TextComponent
          text={name_product}
          font={fontFamilies.semiBold}
          numberOfLines={1}
        />
        <SpaceComponent height={4} />
        <TextComponent
          text={`${brand} - ${category}`}
          size={11}
          color={colors.Gray_Color}
        />
        <SpaceComponent height={9} />
        <TextColorAndSizeComponent color={color} size={size} />
        <SpaceComponent height={13} />
        <RowComponent>
          <RowComponent justify="flex-start">
            <TextComponent text="Units: " size={11} color={colors.Gray_Color} />
            <TextComponent text={`${quantity}`} size={11} />
          </RowComponent>
          <RowComponent justify={'flex-end'}>
                <TextComponent
                  color={
                    discount > 0 ? colors.Primary_Color : colors.Text_Color
                  }
                  size={12}
                  font={fontFamilies.medium}
                  text={`${fotmatedAmount(
                    price - (price * discount) / 100,
                  )}`}
                  numberOfLines={1}
                />
                {discount > 0 && (
                  <RowComponent style={{flexShrink: 1}}>
                    <SpaceComponent width={5} />
                    <TextComponent
                      color={colors.Gray_Color}
                      size={12}
                      font={fontFamilies.medium}
                      text={`${fotmatedAmount(price)}`}
                      style={{
                        textDecorationLine: 'line-through',
                      }}
                      numberOfLines={1}
                    />
                  </RowComponent>
                )}
              </RowComponent>
        </RowComponent>
      </SectionComponent>
    </RowComponent>
  );
};

export default ItemProductOrderComponent;

const styles = StyleSheet.create({
  containerContent: {
    padding: handleSize(11),
    height: '100%',
  },
  thumb: {
    width: handleSize(104),
    height: '100%',
    borderTopLeftRadius: handleSize(8),
    borderBottomLeftRadius: handleSize(8),
  },
  container: {
    height: handleSize(104),
    backgroundColor: colors.White_Color,
    borderRadius: handleSize(8),
    marginBottom: handleSize(24),
    elevation: 5,
  },
});
