import React, {FC} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import IonIcon from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {colors} from '../../constants/colors';
import {fontFamilies} from '../../constants/fontFamilies';
import TextComponent from '../texts/TextComponent';
import NewOrDiscountComponent from './NewOrDiscountComponent';
import RowComponent from './RowComponent';
import SalePriceComponent from './SalePriceComponent';
import SectionComponent from './SectionComponent';
import SpaceComponent from './SpaceComponent';
import StarComponent from './StarComponent';

interface Props {
  id: string;
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
  onFavoriteToggle: () => void;
}

const ItemFavoriteComponent: FC<Props> = ({
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
            <TouchableOpacity
              style={{position: 'absolute', right: 10, top: 15}}>
              <IonIcon name="close" size={24} />
            </TouchableOpacity>

            <TextComponent
              text={trademark}
              font={fontFamilies.regular}
              color={colors.Gray_Color}
              size={11}
            />
            <SpaceComponent height={3} />
            <TextComponent text={name} font={fontFamilies.semiBold} />
            <SpaceComponent height={8} />
            <RowComponent justify="space-between">
              <RowComponent justify="flex-start" flex={1}>
                <TextComponent
                  text="Color: "
                  color={colors.Gray_Color}
                  font={fontFamilies.regular}
                  size={11}
                />
                <TextComponent
                  text={color}
                  size={11}
                  color={colors.Text_Color}
                  font={fontFamilies.regular}
                />
              </RowComponent>
              <RowComponent justify="flex-start" flex={1}>
                <TextComponent
                  text="Size: "
                  color={colors.Gray_Color}
                  font={fontFamilies.regular}
                  size={11}
                />
                <TextComponent
                  text={size}
                  size={11}
                  font={fontFamilies.regular}
                />
              </RowComponent>
              <View style={{flex: 1}} />
            </RowComponent>
            <SpaceComponent height={12} />
            <RowComponent justify="space-between">
              <SalePriceComponent discount={discount} price={price} flex={1} />
              <StarComponent
                star={star}
                numberReviews={numberReviews}
                flex={1}
              />
              <View style={{flex: 1}} />
            </RowComponent>
          </SectionComponent>
        </RowComponent>
        {stock > 0 && (
          <SectionComponent
            onPress={() => {}}
            style={styles.containerIconShopping}>
            <FontAwesome5
              name="shopping-bag"
              size={16}
              color={colors.White_Color}
            />
          </SectionComponent>
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
  containerIconShopping: {
    width: 36,
    height: 36,
    borderRadius: 100,
    backgroundColor: colors.Primary_Color,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    end: 0,
    bottom: -18,
    // Shadow for iOS
    shadowColor: colors.Primary_Color,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    // Elevation for Android
    elevation: 3,
  },
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

export default ItemFavoriteComponent;
