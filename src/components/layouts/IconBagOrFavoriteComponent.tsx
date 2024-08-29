import React, { FC } from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { colors } from '../../constants/colors';
import SectionComponent from './SectionComponent';
import { handleSize } from '../../utils/handleSize';

interface Props {
  isItemFavorite?: boolean;
  isFavorite?: boolean;
  onPress?: () => void;
  styleContainer?: ViewStyle
}

const IconBagOrFavoriteComponent: FC<Props> = ({
  isItemFavorite,
  isFavorite,
  onPress,
  styleContainer
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
        styleContainer
      ]}>
      {isItemFavorite ? (
        <FontAwesome5Icon
          name="shopping-bag"
          size={handleSize(16)}
          color={colors.White_Color}
        />
      ) : isFavorite ? (
        <IonIcon name="heart" color={colors.Primary_Color} size={handleSize(18)} />
      ) : (
        <IonIcon name="heart-outline" color={colors.Gray_Color} size={handleSize(18)} />
      )}
    </SectionComponent>
  );
};

export default IconBagOrFavoriteComponent;

const styles = StyleSheet.create({
  containerIconShopping: {
    width: handleSize(36),
    height: handleSize(36),
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
