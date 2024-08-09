import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { colors } from '../../constants/colors';
import SectionComponent from './SectionComponent';

interface Props {
  isItemFavorite?: boolean;
  isFavorite?: boolean;
  onPress?: () => void;
}

const IconBagOrFavoriteComponent: FC<Props> = ({
  isItemFavorite,
  isFavorite,
  onPress,
}) => {
  return (
    <SectionComponent
      onPress={() => {
        onPress;
      }}
      style={[
        styles.containerIconShopping,
        {
          backgroundColor: isItemFavorite
            ? colors.Primary_Color
            : colors.White_Color,
          shadowColor: isItemFavorite
            ? colors.Primary_Color
            : colors.Gray_Color,
        },
      ]}>
      {isItemFavorite ? (
        <FontAwesome5Icon
          name="shopping-bag"
          size={16}
          color={colors.White_Color}
        />
      ) : isFavorite ? (
        <IonIcon name="heart" color={colors.Primary_Color} size={18} />
      ) : (
        <IonIcon name="heart-outline" color={colors.Gray_Color} size={18} />
      )}
    </SectionComponent>
  );
};

export default IconBagOrFavoriteComponent;

const styles = StyleSheet.create({
  containerIconShopping: {
    width: 36,
    height: 36,
    borderRadius: 100,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    end: 0,
    bottom: -18,
    // Shadow for iOS
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    // Elevation for Android
    elevation: 3,
  },
});
