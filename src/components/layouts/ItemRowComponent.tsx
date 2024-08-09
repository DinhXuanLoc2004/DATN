import React, {FC} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {colors} from '../../constants/colors';
import {fontFamilies} from '../../constants/fontFamilies';
import TextColorAndSizeComponent from '../texts/TextColorAndSizeComponent';
import TextComponent from '../texts/TextComponent';
import IconBagOrFavoriteComponent from './IconBagOrFavoriteComponent';
import IconDeleteItemComponent from './IconDeleteItemComponent';
import NewOrDiscountComponent from './NewOrDiscountComponent';
import RowComponent from './RowComponent';
import SalePriceComponent from './SalePriceComponent';
import SectionComponent from './SectionComponent';
import SpaceComponent from './SpaceComponent';
import StarComponent from './StarComponent';

interface Props {
  id?: string;
  trademark: string;
  name: string;
  price: number;
  color: string;
  size: string;
  stock: number;
  star: number;
  numberReviews: number;
  discount: number;
  createAt: Date;
  img: string;
  isFavorite: boolean;
  onFavoriteToggle?: () => void;
  isItemFavorite?: boolean;
}

const ItemRowComponent: FC<Props> = ({
  id,
  trademark,
  name,
  price,
  color,
  size,
  discount,
  stock,
  star,
  img,
  createAt,
  numberReviews,
  onFavoriteToggle,
  isFavorite,
  isItemFavorite,
}) => {
  return (
    <SectionComponent style={{opacity: stock === 0 ? 0.5 : 1}}>
      <SectionComponent style={styles.container}>
        <RowComponent justify="space-between" style={styles.containerItem}>
          <View style={styles.imageContainer}>
            <Image source={{uri: img}} style={styles.image} />
            <NewOrDiscountComponent
              discount={discount}
              createAt={createAt}
              top={5}
              left={4}
            />
          </View>
          <SectionComponent style={styles.detailsContainer}>
            {isItemFavorite && <IconDeleteItemComponent />}
            <TextComponent
              text={trademark}
              font={fontFamilies.regular}
              color={colors.Gray_Color}
              size={11}
            />
            <SpaceComponent height={3} />
            <TextComponent text={name} font={fontFamilies.semiBold} />
            <SpaceComponent height={8} />
            {isItemFavorite ? (
              <TextColorAndSizeComponent color={color} size={size} />
            ) : (
              <StarComponent
                star={star}
                numberReviews={numberReviews}
                flex={1}
              />
            )}
            <SpaceComponent height={12} />
            <RowComponent justify="space-between">
              <SalePriceComponent discount={discount} price={price} flex={1} />
              {isItemFavorite && (
                <StarComponent
                  star={star}
                  numberReviews={numberReviews}
                  flex={1}
                />
              )}
              <View style={{flex: 1}} />
            </RowComponent>
          </SectionComponent>
        </RowComponent>
        {stock > 0 && (
          <IconBagOrFavoriteComponent
            isFavorite={isFavorite}
            isItemFavorite={isItemFavorite}
          />
        )}
      </SectionComponent>
      {stock === 0 && (
        <View>
          <SpaceComponent height={7} />
          <TextComponent
            text="Sorry, this item is currently sold out"
            size={11}
            color={colors.Text_Color}
          />
        </View>
      )}
    </SectionComponent>
  );
};

const styles = StyleSheet.create({
  containerItem: {
    height: 116,
    alignItems: 'flex-start',
  },
  container: {
    width: '100%',
    height: 'auto',
    backgroundColor: colors.White_Color,
    borderRadius: 8,
    flex: 0,
  },
  imageContainer: {
    width: 116,
    height: '100%',
  },
  image: {
    flex: 1,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  detailsContainer: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
});

export default ItemRowComponent;
