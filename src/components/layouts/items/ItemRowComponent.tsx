import React, {FC} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {colors} from '../../../constants/colors';
import {fontFamilies} from '../../../constants/fontFamilies';
import TextColorAndSizeComponent from '../../texts/TextColorAndSizeComponent';
import TextComponent from '../../texts/TextComponent';
import IconBagOrFavoriteComponent from '../IconBagOrFavoriteComponent';
import IconDeleteItemComponent from '../IconDeleteItemComponent';
import NewOrDiscountComponent from '../../texts/NewOrDiscountComponent';
import RowComponent from '../RowComponent';
import SalePriceComponent from '../../texts/SalePriceComponent';
import SectionComponent from '../SectionComponent';
import SpaceComponent from '../SpaceComponent';
import StarComponent from '../StarComponent';
import {handleSize} from '../../../utils/handleSize';
import DisplayRating from '../DisplayRating';
import {productResponse} from '../../../helper/types/product.type';

interface Props {
  color?: string;
  size?: string;
  onFavoriteToggle?: () => void;
  isItemFavorite?: boolean;
  onPress?: () => void;
  onPressBag?: () => void;
  item: productResponse;
}

const ItemRowComponent: FC<Props> = ({
  color,
  size,
  onFavoriteToggle,
  isItemFavorite,
  onPress,
  onPressBag,
  item,
}) => {
  return (
    <SectionComponent
      style={{opacity: item.inventory_quantity === 0 ? 0.5 : 1}}
      onPress={onPress}>
      <SectionComponent style={styles.container}>
        <RowComponent justify="space-between" style={styles.containerItem}>
          <View style={styles.imageContainer}>
            {item.thumb && (
              <Image source={{uri: item.thumb}} style={styles.image} />
            )}
            <NewOrDiscountComponent
              discount={item.discount}
              createAt={item.createdAt}
              top={5}
              left={4}
            />
          </View>
          <SectionComponent style={styles.detailsContainer}>
            {isItemFavorite && (
              <IconDeleteItemComponent right={5} product_id={item._id} />
            )}
            <TextComponent
              text={`${item.name_brand} - ${item.name_category}`}
              font={fontFamilies.regular}
              color={colors.Gray_Color}
              size={11}
              numberOfLines={1}
            />
            <SpaceComponent height={6} />
            <TextComponent
              text={item.name_product}
              font={fontFamilies.semiBold}
              numberOfLines={1}
              flex={0.8}
              style={{width: '90%'}}
            />
            <SpaceComponent height={6} />
            {isItemFavorite && color && size ? (
              <TextColorAndSizeComponent color={color} size={size} />
            ) : (
              <DisplayRating
                avg_rating={item.averageRating}
                total_order={item.total_orders}
                size_icon={13}
                size_text={11}
              />
            )}
            <SpaceComponent height={12} />
            <SalePriceComponent
              discount={item.discount}
              price={item.price_min}
              flex={0}
              justify="flex-start"
              flex_left={0}
              flex_right={0}
              size={12}
            />
          </SectionComponent>
        </RowComponent>
        {item.inventory_quantity > 0 && (
          <IconBagOrFavoriteComponent
            isFavorite={item.isFavorite}
            isItemFavorite={isItemFavorite}
            product_id={item._id}
            onPressBag={onPressBag}
          />
        )}
      </SectionComponent>
      {item.inventory_quantity === 0 && (
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
    borderRadius: handleSize(8),
    flex: 0,
    elevation: 4,
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
