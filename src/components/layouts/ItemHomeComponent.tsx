import React, {FC, useState} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import StarComponent from './StarComponent';
import SectionComponent from './SectionComponent';
import TextComponent from '../texts/TextComponent';
import {fontFamilies} from '../../constants/fontFamilies';
import RowComponent from './RowComponent';
import SpaceComponent from './SpaceComponent';
import {Heart} from 'iconsax-react-native';

interface ItemProps {
  imageUrl: string;
  category: string;
  name: string;
  price: number;
  discount: number;
}

const ItemHomeComponent: FC<ItemProps> = ({
  imageUrl,
  name = 'a',
  category = 'a',
  price = 1,
  discount = 2,
}) => {
  const newprice = price - (price * discount) / 100;
  const [iconColor, setIconColor] = useState('gray');

  const handlePress = () => {
    setIconColor(prevColor => (prevColor === 'gray' ? 'red' : 'gray'));
  };
  return (
    <SectionComponent style={styles.container}>
      <Image
        source={{
          // uri: imageUrl,
          uri: 'data:image/jpeg;base64,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',
        }}
        style={styles.image}
      />
      <SectionComponent style={styles.discountContainer}>
        <TextComponent
          text={`-${discount}%`}
          font={fontFamilies.bold}
          color="white"
          size={11}
          style={styles.discount}></TextComponent>
      </SectionComponent>

      <SectionComponent style={styles.favoriteContainer}>
        <TouchableOpacity onPress={handlePress} style={styles.favoriteButton}>
          <Heart color={iconColor} variant="Bold" size={24} />
        </TouchableOpacity>
      </SectionComponent>
      <SectionComponent style={styles.starContainer}>
        <StarComponent star={5} size={14} />
      </SectionComponent>

      <SectionComponent style={styles.nameContainer}>
        <TextComponent
          style={{top: 3}}
          text={category}
          size={11}
          font={fontFamilies.regular}
          color="#9B9B9B"></TextComponent>
        <TextComponent
          text={name}
          size={16}
          font={fontFamilies.bold}
          color="black"></TextComponent>
      </SectionComponent>

      <RowComponent style={styles.costContainer}>
        <TextComponent
          style={styles.priceText}
          text={`${price}$`}
          size={14}
          font={fontFamilies.bold}
          color="#9B9B9B"></TextComponent>
        <SpaceComponent width={4} />
        <TextComponent
          text={`${newprice}$`}
          size={14}
          font={fontFamilies.bold}
          color="#DB3022"></TextComponent>
      </RowComponent>
    </SectionComponent>
  );
};

export default ItemHomeComponent;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    height: 270,
    width: 150,
    padding: 10,
    margin: 10,
    shadowOffset: {width: 0, height: 2},
    alignItems: 'center',
  },
  image: {
    width: 149,
    height: 184,
    left: 1,
    borderRadius: 10,
  },
  discountContainer: {
    width: 40,
    height: 24,
    top: 20,
    left: 10,
    backgroundColor: 'red',
    position: 'absolute',
    borderRadius: 10,
  },
  discount: {
    marginTop: 5,
    alignContent: 'center',
    alignSelf: 'center',
  },
  starContainer: {
    width: 40,
    height: 24,
    marginTop: 198,
    position: 'absolute',
    right: 85,
  },
  nameContainer: {
    top: 211,
    left: 1,
    position: 'absolute',
  },

  favoriteContainer: {
    top: 170,
    left: 120,
    position: 'absolute',
    width: 36,
    height: 36,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
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
  },
});
