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

interface Props {
  thumb: string;
  category: string;
  brand: string;
  color: string;
  size: string;
  quantity: number;
  price: number;
}

const ItemProductOrderComponent: FC<Props> = ({
  thumb,
  category,
  brand,
  color,
  size,
  quantity,
  price,
}) => {
  return (
    <RowComponent justify="flex-start" style={styles.container}>
      <Image source={{uri: thumb}} style={styles.thumb} />
      <SectionComponent style={styles.containerContent}>
        <TextComponent text={category} font={fontFamilies.semiBold} />
        <SpaceComponent height={4} />
        <TextComponent text={brand} size={11} color={colors.Gray_Color} />
        <SpaceComponent height={9} />
        <TextColorAndSizeComponent color={color} size={size} />
        <SpaceComponent height={13} />
        <RowComponent>
          <RowComponent justify="flex-start">
            <TextComponent text="Units: " size={11} color={colors.Gray_Color} />
            <TextComponent text={`${quantity}`} size={11} />
          </RowComponent>
          <TextComponent
            text={`${price}$`}
            font={fontFamilies.medium}
            size={14}
          />
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
    marginBottom: handleSize(24)
  },
});
