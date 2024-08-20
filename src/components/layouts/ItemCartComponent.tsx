import React, { useState } from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { colors } from '../../constants/colors';
import { fontFamilies } from '../../constants/fontFamilies';
import { handleSize } from '../../utils/handleSize';
import TextColorAndSizeComponent from '../texts/TextColorAndSizeComponent';
import TextComponent from '../texts/TextComponent';
import NewOrDiscountComponent from './NewOrDiscountComponent';
import RowComponent from './RowComponent';
import SalePriceComponent from './SalePriceComponent';
import SectionComponent from './SectionComponent';
import SpaceComponent from './SpaceComponent';

interface Props {
  name: string;
  color: string;
  size: string;
  price: number;
  image_url: string;
  quantity: number;
  discount: number;
  create_at: Date;
}

const ItemCartComponent: React.FC<Props> = ({
  name,
  color,
  size,
  price,
  image_url,
  quantity,
  discount,
  create_at,
}) => {
  const [menuVisible, setMenuVisible] = useState<boolean>(false);
  const [quantityLocal, setquantityLocal] = useState<number>(quantity);

  const handleChangeQuantity = (val: number): void => {
    if (val > 0) {
      setquantityLocal(quantityLocal + val);
    } else {
      if (quantityLocal > 1) {
        setquantityLocal(quantityLocal + val);
      }
    }
  };

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleAddToFavorites = () => {
    console.log('Added to favorites');
    setMenuVisible(false);
  };

  const handleDeleteFromList = () => {
    console.log('Deleted from the list');
    setMenuVisible(false);
  };

  return (
    <RowComponent flex={0} style={styles.card}>
      <Image source={{uri: image_url}} style={styles.image} />
      <SectionComponent style={styles.containerContent}>
        <RowComponent justify="space-between">
          <SectionComponent>
            <TextComponent text={name} font={fontFamilies.semiBold} />
            <SpaceComponent height={4} />
            <TextColorAndSizeComponent color={color} size={size} />
          </SectionComponent>
          <TouchableOpacity onPress={toggleMenu}>
            <Entypo name="dots-three-vertical" style={styles.iconMenu} />
          </TouchableOpacity>
        </RowComponent>
        <RowComponent justify="space-between">
          <RowComponent>
            <TouchableOpacity
              onPress={() => handleChangeQuantity(-1)}
              style={styles.iconButton}>
              <FontAwesome5 name="minus" style={styles.icon} />
            </TouchableOpacity>
            <SpaceComponent width={12} />
            <TextComponent
              text={`${quantityLocal}`}
              size={14}
              font={fontFamilies.medium}
            />
            <SpaceComponent width={12} />
            <TouchableOpacity
              onPress={() => handleChangeQuantity(1)}
              style={styles.iconButton}>
              <FontAwesome5 name="plus" style={styles.icon} />
            </TouchableOpacity>
          </RowComponent>
          <SpaceComponent width={10} />
          <SalePriceComponent
            discount={discount}
            price={price * quantityLocal}
            flex={1}
          />
        </RowComponent>
      </SectionComponent>
      {menuVisible && (
        <SectionComponent style={styles.menu}>
          <TouchableOpacity
            onPress={handleAddToFavorites}
            style={styles.btnMenu}>
            <TextComponent text="Add to favorite" size={11} />
          </TouchableOpacity>
          <SpaceComponent
            height={1}
            style={{width: '100%', backgroundColor: colors.Gray_Color}}
          />
          <TouchableOpacity
            onPress={handleDeleteFromList}
            style={styles.btnMenu}>
            <TextComponent text="Delete from the list" size={11} />
          </TouchableOpacity>
        </SectionComponent>
      )}
      <NewOrDiscountComponent
        createAt={create_at}
        discount={discount}
        top={5}
        left={4}
      />
    </RowComponent>
  );
};

const styles = StyleSheet.create({
  btnMenu: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: colors.White_Color,
    borderRadius: handleSize(8),
    elevation: handleSize(3),
    height: handleSize(104),
  },
  image: {
    width: handleSize(120),
    height: '100%',
    borderBottomStartRadius: handleSize(8),
    borderTopStartRadius: handleSize(8),
    borderBottomEndRadius: 20
  },
  containerContent: {
    padding: handleSize(11),
    justifyContent: 'space-between',
    height: '100%',
  },
  iconButton: {
    width: handleSize(36),
    height: handleSize(36),
    borderRadius: 100,
    backgroundColor: colors.White_Color,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: handleSize(4),
  },
  icon: {
    fontSize: 20,
    color: colors.Gray_Color,
  },
  iconMenu: {
    color: colors.Secondary_Text_Color,
    fontSize: handleSize(18),
  },
  menu: {
    width: handleSize(170),
    height: handleSize(96),
    backgroundColor: colors.White_Color,
    borderRadius: handleSize(8),
    position: 'absolute',
    right: handleSize(33),
    top: handleSize(-17),
    elevation: handleSize(5),
    zIndex: 1,
  },
});

export default ItemCartComponent;
