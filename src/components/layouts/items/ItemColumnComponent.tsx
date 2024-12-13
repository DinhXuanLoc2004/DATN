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
import DisplayRating from '../DisplayRating';
import {handleSize} from '../../../utils/handleSize';
import {productResponse} from '../../../helper/types/product.type';

interface ItemProps {
  isItemFavorite?: boolean;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  onPressBag?: () => void;
  item: productResponse;
}

const ItemColumnComponent: FC<ItemProps> = ({
  isItemFavorite = false,
  style,
  onPress,
  onPressBag,
  item,
}) => {
  return (
    <SectionComponent
      onPress={onPress}
      style={[
        styles.container,
        {opacity: item.inventory_quantity === 0 ? 0.5 : 1},
        style,
      ]}>
      <SectionComponent style={{flex: 0}}>
        {item.thumb && (
          <Image source={{uri: item.thumb}} style={styles.image} />
        )}
        <NewOrDiscountComponent
          discount={item.discount}
          createAt={item.createdAt}
        />
        {item.inventory_quantity !== 0 && (
          <IconBagOrFavoriteComponent
            isItemFavorite={isItemFavorite}
            isFavorite={item.isFavorite}
            product_id={item._id}
            onPressBag={onPressBag}
          />
        )}
        {item.inventory_quantity === 0 && (
          <RowComponent style={styles.containerTextSorry}>
            <TextComponent
              text="Sorry, this item is currently sold out"
              size={11}
            />
          </RowComponent>
        )}
        {isItemFavorite && (
          <IconDeleteItemComponent
            size={25}
            top={5}
            right={3}
            product_id={item._id}
          />
        )}
      </SectionComponent>
      <SpaceComponent height={10} />
      <SectionComponent style={{paddingHorizontal: 10}} flex={0}>
        <DisplayRating
          avg_rating={item.averageRating}
          total_order={item.total_orders}
          size_text={11}
        />
        <SpaceComponent height={5} />
        <TextComponent
          text={item.name_product}
          font={fontFamilies.semiBold}
          numberOfLines={2}
          size={12}
        />
        <SpaceComponent height={4} />
        <TextComponent
          text={`${item.name_brand} - ${item.name_category}`}
          size={11}
          color={colors.Gray_Color}
          numberOfLines={1}
        />
        <SpaceComponent height={5} />
        <RowComponent>
          <SalePriceComponent
            price={item.price_min}
            discount={item.discount}
            justify="flex-start"
            flex_left={0}
            flex_right={0}
            flex={0}
            size={12}
          />
        </RowComponent>
      </SectionComponent>
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
    borderRadius: handleSize(10),
    backgroundColor: colors.White_Color,
    elevation: 5,
    paddingBottom: 10,
  },
});
