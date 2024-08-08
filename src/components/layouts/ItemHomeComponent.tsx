import React, {FC} from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {colors} from '../../constants/colors';
import {fontFamilies} from '../../constants/fontFamilies';
import TextComponent from '../texts/TextComponent';
import NewOrDiscountComponent from './NewOrDiscountComponent';
import SalePriceComponent from './SalePriceComponent';
import SectionComponent from './SectionComponent';
import SpaceComponent from './SpaceComponent';
import StarComponent from './StarComponent';

interface ItemProps {
  imageUrl: string;
  trademark: string;
  name: string;
  price: number;
  discount?: number;
  star?: number;
  reviewCount?: number;
  createAt: Date;
  isFavorite?: boolean;
}

const ItemHomeComponent: FC<ItemProps> = ({
  imageUrl,
  name,
  trademark,
  price,
  discount = 0,
  star,
  reviewCount,
  createAt,
  isFavorite,
}) => {
  return (
    <SectionComponent style={styles.container}>
      <SectionComponent style={{flex: 0}}>
        <Image source={{uri: imageUrl}} style={styles.image} />
        <NewOrDiscountComponent discount={discount} createAt={createAt} />
        <SectionComponent style={styles.favoriteContainer}>
          <TouchableOpacity onPress={() => {}} style={{}}>
            {isFavorite ? (
              <IonIcon name="heart" color={colors.Primary_Color} size={18} />
            ) : (
              <IonIcon
                name="heart-outline"
                color={colors.Gray_Color}
                size={18}
              />
            )}
          </TouchableOpacity>
        </SectionComponent>
      </SectionComponent>
      <SpaceComponent height={10} />
      <StarComponent star={star} size={14} numberReviews={reviewCount} />
      <SpaceComponent height={6} />
      <TextComponent text={trademark} size={11} color={colors.Gray_Color} />
      <TextComponent text={name} font={fontFamilies.semiBold} />
      <SpaceComponent height={4} />
      <SalePriceComponent price={price} discount={discount} />
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
  container: {
    width: 148,
    height: 'auto',
  },
});
