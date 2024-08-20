import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import { colors } from '../../constants/colors';


interface Props {
  name: string;
  color: string;
  size: string;
  price: number;
  imageUrl: string;
  menuIconUrl: string;
}

const ItemCartComponent: React.FC<Props> = ({ name, color, size, price, imageUrl, menuIconUrl }) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [menuVisible, setMenuVisible] = useState<boolean>(false);

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleAddToFavorites = () => {
    console.log("Added to favorites");
    setMenuVisible(false);
  };

  const handleDeleteFromList = () => {
    console.log("Deleted from the list");
    setMenuVisible(false);
  };

  return (
    <View style={styles.card}>
      <Image source={require('../../assets/images/photo.png')} style={styles.image} />
      <View style={styles.content}>
        <View style={styles.containerTitle}>
          <Text style={styles.title}>{name}</Text>
          <View style={styles.menuContainer}>
            <TouchableOpacity onPress={toggleMenu}>
              <Entypo name="dots-three-vertical" style={styles.iconMenu} />
            </TouchableOpacity>
            {menuVisible && (
              <View style={styles.menu}>
                <TouchableOpacity onPress={handleAddToFavorites}>
                  <Text style={styles.menuItem}>Add to favorites</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleDeleteFromList}>
                  <Text style={styles.menuItem}>Delete from the list</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
        <View style={styles.describeContainer}>
          <Text style={styles.subtitleC}>Color: <Text style={styles.CS}>{color}</Text></Text>
          <Text style={styles.subtitleL}>Size: <Text style={styles.CS}>{size}</Text></Text>
        </View>
        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={handleDecrease} style={styles.iconButton}>
            <Icon name="minus" style={styles.icon} />
          </TouchableOpacity>
          <Text style={styles.quantity}>{quantity}</Text>
          <TouchableOpacity onPress={handleIncrease} style={styles.iconButton}>
            <Icon name="plus" style={styles.icon} />
          </TouchableOpacity>
          <Text style={styles.price}>{price * quantity}$</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: colors.White_Color,
    borderRadius: 8,
    elevation: 2,
    position: 'relative',
    height: 115,
  },
  image: {
    width: 120,
    height: '100%',
  },
  containerTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    marginLeft: 16,
  },
  title: {
    marginTop: 10,
    fontSize: 16,
    lineHeight: 16,
    color: colors.Text_Color,
    fontWeight: 'bold',
  },
  subtitleC: {
    fontSize: 11,
    lineHeight: 11,
    color: colors.Secondary_Text_Color,
  },
  subtitleL: {
    fontSize: 11,
    lineHeight: 11,
    color: colors.Secondary_Text_Color,
    marginLeft: 10,
  },
  CS: {
    fontSize: 11,
    lineHeight: 11,
    color: colors.Text_Color,
    marginLeft: 10,
  },
  describeContainer: {
    flexDirection: 'row',
    marginTop: 5
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 18,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  icon: {
    fontSize: 20,
    color: colors.Secondary_Text_Color,
  },
  quantity: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 5,
    fontSize: 14,
    marginHorizontal: 5,
    color: colors.Text_Color
  },
  price: {
    marginRight: 20,
    color: colors.Text_Color,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: 'bold',
    marginLeft: 'auto',
  },
  menuContainer: {
    position: 'absolute',
    right: 0,
  },
  iconMenu: {
    color: colors.Secondary_Text_Color,
    fontSize: 20,
    top: 10,
    right: 10
  },
  menu: {
    width: 160,
    backgroundColor: colors.White_Color,
    borderRadius: 8,
    padding: 8,
    position: 'absolute',
    right: 35,
    bottom: -60,
    elevation: 4,
    zIndex: 1000,
  },
  menuItem: {
    alignSelf: 'center',
    fontSize: 11,
    paddingVertical: 12,
    color: colors.Text_Color
  },
});

export default ItemCartComponent;
