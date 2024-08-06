import React, {FC} from 'react';
import {Image, StyleSheet} from 'react-native';

import IonIcon from 'react-native-vector-icons/AntDesign';
import IonIcon1 from 'react-native-vector-icons/Entypo';
import {fontFamilies} from '../../constants/fontFamilies';
import TextComponent from '../texts/TextComponent';
import TitleComponent from '../texts/TitleComponent';
import RowComponent from './RowComponent';
import SectionComponent from './SectionComponent';
import SpaceComponent from './SpaceComponent';
import StarComponent from './StarComponent';

interface ItemFavoriteComponentProps {
  product: {
    id: string;
    trademark: string;
    category: string;
    price: number;
    color: string;
    size: string;
    stock: number;
    star: number;
    discount: number;
    status: string;
    isFavorite: boolean;
  };
  onFavoriteToggle: () => void;
}

const ItemFavoriteComponent: FC<ItemFavoriteComponentProps> = ({
  id,
  trademark,
  category,
  price,
  color,
  size,
  discount,
  stock,
  star,
  status,
  onFavoriteToggle,
}) => {
  const newPrice = price * (1 - discount / 100);
  const isOutOfStock = stock === 0;

  return (
    <SectionComponent style={{backgroundColor: 'white'}}>
      <SectionComponent
        style={[styles.container, isOutOfStock && styles.outOfStock]}>
        <SectionComponent style={styles.imageContainer}>
          <Image
            source={{
              uri: 'https://cdn.pixabay.com/photo/2022/05/22/16/50/outdoors-7213961_1280.jpg',
            }}
            style={styles.image}
          />
          {discount > 0 ? (
            <TitleComponent
              text={`-${discount}%`}
              size={11}
              color="white"
              style={styles.discountLabel}
            />
          ) : (
            <TitleComponent
              text={status}
              size={11}
              color="white"
              style={styles.statusLabel}
            />
          )}
        </SectionComponent>
        <SectionComponent style={styles.detailsContainer}>
          <IonIcon
            name="close"
            size={24}
            style={{position: 'absolute', right: 1, top: 0}}
          />
          {!isOutOfStock && (
            <SectionComponent
              style={{position: 'absolute', bottom: -30, right: 0}}>
              <IonIcon1
                name="shopping-bag"
                size={16}
                color="white"
                style={{
                  backgroundColor: '#DB3022',
                  padding: 10,
                  borderRadius: 50,
                }}
              />
            </SectionComponent>
          )}

          <TitleComponent
            text={category}
            font={fontFamilies.regular}
            size={11}
          />
          <TitleComponent text={trademark} size={16} />
          <RowComponent justify="flex-start">
            <TitleComponent
              text="Color:"
              color="gray"
              font={fontFamilies.regular}
              size={11}
            />
            <TitleComponent
              text={color}
              size={11}
              color="black"
              font={fontFamilies.regular}
            />
            <SpaceComponent width={30} />

            <TitleComponent
              text="Size:"
              color="gray"
              font={fontFamilies.regular}
              size={11}
            />
            <TitleComponent text={size} size={11} font={fontFamilies.regular} />
          </RowComponent>
          <SpaceComponent height={10} />

          <RowComponent justify="flex-start">
            {discount > 0 && (
              <TextComponent
                color="gray"
                size={14}
                font={fontFamilies.medium}
                text={`${price}$`}
                style={styles.originalPrice}
              />
            )}
            <SpaceComponent width={10} />
            <TextComponent
              color="red"
              size={14}
              font={fontFamilies.medium}
              text={`${discount > 0 ? newPrice.toFixed(2) : price.toFixed(2)}$`}
            />

            <SectionComponent style={{position: 'absolute', left: 90}}>
              <StarComponent star={star} />
            </SectionComponent>
            <TextComponent
              style={{position: 'absolute', right: 40}}
              text={`(${star})`}
              size={10}
              font={fontFamilies.regular}
            />
          </RowComponent>
        </SectionComponent>
      </SectionComponent>

      {isOutOfStock && (
        <TextComponent
          color="lightgray"
          size={12}
          text="Sorry, this item is currently sold out"
        />
      )}
    </SectionComponent>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: 116,
    height: 104,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  discountLabel: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'red',
    padding: 5,
    borderRadius: 50,
  },
  statusLabel: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'black',
    padding: 5,
    borderRadius: 50,
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 10,
  },
  originalPrice: {
    textDecorationLine: 'line-through',
  },
  outOfStock: {
    opacity: 0.5,
  },
});

export default ItemFavoriteComponent;
