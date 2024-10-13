import React, {FC, memo} from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {colors} from '../../constants/colors';
import {handleSize} from '../../utils/handleSize';
import TextComponent from '../texts/TextComponent';
import RowComponent from './RowComponent';
import SpaceComponent from './SpaceComponent';

interface Props {
  star?: number;
  size?: number;
  maxStar?: number;
  onPress?: (star: number) => void;
  numberReviews?: number;
  flex?: number;
  itemRating?: boolean;
  style?: StyleProp<ViewStyle>;
}

const StarComponent: FC<Props> = ({
  star,
  size,
  maxStar,
  onPress,
  numberReviews,
  flex,
  itemRating,
  style,
}) => {
  
  const roudingStar = Math.floor(star ?? 0);
  const lengthListStar = maxStar ?? 5;

  return (
    <RowComponent flex={flex} justify="flex-start" style={style}>
      {Array.from({length: lengthListStar}).map((_, index) => (
        <TouchableOpacity
          key={index}
          disabled={onPress ? false : true}
          onPress={() => {
            onPress && onPress(index + 1);
          }}>
          {!itemRating ? (
            <View>
              {roudingStar >= index + 1 ? (
                <IonIcon
                  name="star"
                  color={colors.Star_Color}
                  size={handleSize(size ?? 14)}
                  style={styles.icon}
                />
              ) : (
                <IonIcon
                  name="star-outline"
                  color={colors.Gray_Color}
                  size={handleSize(size ?? 14)}
                  style={styles.icon}
                />
              )}
            </View>
          ) : (
            <View>
              {roudingStar <= index + 1 ? (
                <IonIcon
                  name="star"
                  color={colors.Star_Color}
                  size={handleSize(size ?? 14)}
                  style={styles.icon}
                />
              ) : (
                <SpaceComponent />
              )}
            </View>
          )}
        </TouchableOpacity>
      ))}
      {numberReviews !== undefined && numberReviews !== null && (
        <TextComponent
          text={` (${numberReviews})`}
          size={10}
          color={colors.Gray_Color}
        />
      )}
    </RowComponent>
  );
};

export default memo(StarComponent);

const styles = StyleSheet.create({
  icon: {
    marginEnd: 3.5,
  },
});
