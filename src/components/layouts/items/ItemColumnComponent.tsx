import React, {FC} from 'react';
import {Image, StyleProp, StyleSheet, ViewStyle} from 'react-native';
import {colors} from '../../../constants/colors';
import {fontFamilies} from '../../../constants/fontFamilies';
import NewOrDiscountComponent from '../../texts/NewOrDiscountComponent';
import SalePriceComponent from '../../texts/SalePriceComponent';
import TextColorAndSizeComponent from '../../texts/TextColorAndSizeComponent';
import TextComponent from '../../texts/TextComponent';
import IconBagOrFavoriteComponent from '../IconBagOrFavoriteComponent';
import IconDeleteItemComponent from '../IconDeleteItemComponent';
import RowComponent from '../RowComponent';
import SectionComponent from '../SectionComponent';
import SpaceComponent from '../SpaceComponent';
import StarComponent from '../StarComponent';

interface ItemProps {
  imageUrl: string;
  trademark: string;
  name: string;
  price: number;
  discount?: number;
  star: number;
  reviewCount: number;
  createAt: string;
  isFavorite?: boolean;
  stock?: number;
  isItemFavorite?: boolean;
  color?: string;
  size?: string;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  _id: string;
  onPressBag?: () => void;
}

const ItemColumnComponent: FC<ItemProps> = ({
  imageUrl,
  name,
  trademark,
  price,
  discount = 0,
  star,
  reviewCount,
  createAt,
  isFavorite,
  stock,
  isItemFavorite = false,
  color,
  size,
  style,
  onPress,
  _id,
  onPressBag,
}) => {
  return (
    <SectionComponent
      onPress={onPress}
      style={[styles.container, {opacity: stock === 0 ? 0.5 : 1}, style]}>
      <SectionComponent style={{flex: 0}}>
        {imageUrl && <Image source={{uri: imageUrl}} style={styles.image} />}
        <NewOrDiscountComponent discount={discount} createAt={createAt} />
        {stock !== 0 && (
          <IconBagOrFavoriteComponent
            isItemFavorite={isItemFavorite}
            isFavorite={isFavorite}
            product_id={_id}
            onPressBag={onPressBag}
          />
        )}
        {stock === 0 && (
          <RowComponent style={styles.containerTextSorry}>
            <TextComponent
              text="Sorry, this item is currently sold out"
              size={11}
            />
          </RowComponent>
        )}
        {isItemFavorite && (
          <IconDeleteItemComponent size={25} top={5} right={3} product_id={_id}/>
        )}
      </SectionComponent>
      <SpaceComponent height={10} />
      <StarComponent star={star} numberReviews={reviewCount} />
      <SpaceComponent height={6} />
      <TextComponent text={trademark} size={11} color={colors.Gray_Color} />
      <SpaceComponent height={5} />
      <TextComponent text={name} font={fontFamilies.semiBold} />
      <SpaceComponent height={4} />
      {isItemFavorite && color && size && (
        <TextColorAndSizeComponent color={color ?? ''} size={size ?? ''} />
      )}
      <RowComponent>
        <SalePriceComponent price={price} discount={discount} />
      </RowComponent>
    </SectionComponent>
  );
};

export default ItemColumnComponent;

const styles = StyleSheet.create({
  containerTextSorry: {
    width: '100%',
    padding: 10,
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  image: {
    width: '100%',
    height: 'auto',
    left: 1,
    borderRadius: 10,
    aspectRatio: 0.8,
  },
  favoriteContainer: {
    position: 'absolute',
    bottom: -18,
    end: -1,
    width: 36,
    height: 36,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.White_Color,
    elevation: 5,
  },
  container: {
    width: '50%',
    height: 'auto',
  },
});
