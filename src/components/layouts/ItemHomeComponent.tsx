import React, {FC} from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {colors} from '../../constants/colors';
import {fontFamilies} from '../../constants/fontFamilies';
import {handleDate} from '../../utils/handleDate';
import TextComponent from '../texts/TextComponent';
import RowComponent from './RowComponent';
import SectionComponent from './SectionComponent';
import SpaceComponent from './SpaceComponent';
import StarComponent from './StarComponent';

interface ItemProps {
  imageUrl: string;
  category: string;
  name: string;
  price: number;
  discount?: number;
  star?: number;
  reviewCount?: number;
  createAt: Date;
  isFavorite?: number;
}

const ItemHomeComponent: FC<ItemProps> = ({
  imageUrl,
  name,
  category,
  price,
  discount = 0,
  star,
  reviewCount,
  createAt,
  isFavorite,
}) => {
  const newPrice = discount > 0 ? price - price * discount : price;
  const toDay = new Date();
  const isNew = handleDate.handleIsNewProduct(createAt, toDay);
  return (
    <SectionComponent style={styles.container}>
      <SectionComponent style={{flex: 0}}>
        <Image source={{uri: imageUrl}} style={styles.image} />
        {isNew ? (
          <SectionComponent style={styles.isNewContainer}>
            <TextComponent
              text="NEW"
              font={fontFamilies.semiBold}
              color={colors.White_Color}
              size={11}
            />
          </SectionComponent>
        ) : (
          discount > 0 && (
            <SectionComponent style={styles.discountContainer}>
              <TextComponent
                text={`-${discount * 100}%`}
                font={fontFamilies.semiBold}
                color={colors.White_Color}
                size={11}
              />
            </SectionComponent>
          )
        )}

        <SectionComponent style={styles.favoriteContainer}>
          <TouchableOpacity onPress={() => {}} style={{}}>
            {isFavorite ? (
              <IonIcon name="heart" color={colors.Primary_Color} size={13} />
            ) : (
              <IonIcon
                name="heart-outline"
                color={colors.Gray_Color}
                size={13}
              />
            )}
          </TouchableOpacity>
        </SectionComponent>
      </SectionComponent>

      <SpaceComponent height={10} />
      <RowComponent justify="flex-start">
        <StarComponent star={star} size={14} numberReviews={reviewCount} />
      </RowComponent>
      <SpaceComponent height={6} />
      <TextComponent text={category} size={11} color={colors.Gray_Color} />
      <TextComponent text={name} font={fontFamilies.semiBold} />
      <SpaceComponent height={4} />
      <RowComponent justify="flex-start">
        {discount > 0 && (
          <TextComponent
            style={styles.priceText}
            text={`${price}$`}
            size={14}
            font={fontFamilies.medium}
            color={colors.Gray_Color}
          />
        )}
        <TextComponent
          text={`${newPrice}$`}
          size={14}
          font={fontFamilies.medium}
          color={colors.Primary_Color}
        />
      </RowComponent>
    </SectionComponent>
  );
};

export default ItemHomeComponent;

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 184,
    left: 1,
    borderRadius: 10,
  },
  isNewContainer: {
    width: 40,
    height: 24,
    top: 8,
    left: 10,
    backgroundColor: colors.Text_Color,
    position: 'absolute',
    borderRadius: 29,
    justifyContent: 'center',
    alignItems: 'center',
  },
  discountContainer: {
    width: 40,
    height: 24,
    top: 8,
    left: 10,
    backgroundColor: colors.Primary_Color,
    position: 'absolute',
    borderRadius: 29,
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteContainer: {
    position: 'absolute',
    top: 164,
    end: -1,
    width: 36,
    height: 36,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.White_Color,
    elevation: 5,
  },
  favoriteIcon: {
    width: 23,
    height: 20,
  },
  costContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    top: 245,
    left: 1,
    position: 'absolute',
  },
  priceText: {
    textDecorationLine: 'line-through',
    marginEnd: 4,
  },
  container: {
    width: 148,
    height: 'auto',
  },
});
