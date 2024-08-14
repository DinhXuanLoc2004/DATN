import React, { FC, memo } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { colors } from '../../constants/colors';
import { fontFamilies } from '../../constants/fontFamilies';
import TextComponent from '../texts/TextComponent';
import RowComponent from './RowComponent';
import { handleSize } from '../../utils/handleSize';

interface Props {
  star?: number;
  size?: number;
  maxStar?: number;
  onPress?: (star: number) => void;
  numberReviews?: number;
  flex?: number
}

const StarComponent: FC<Props> = ({
  star,
  size,
  maxStar,
  onPress,
  numberReviews,
  flex
}) => {
  const roudingStar = Math.floor(star ?? 1);
  const lengthListStar = maxStar ?? 5;
  return (
    <RowComponent flex={flex} justify='flex-start'>
      {Array.from({length: lengthListStar}).map((_, index) => (
        <TouchableOpacity
          key={index}
          disabled={onPress ? false : true}
          onPress={() => {
            onPress && onPress(index + 1);
          }}>
          {roudingStar >= index + 1 ? (
            <IonIcon
              name="star"
              color={colors.Star_Color}
              size={size ? handleSize(size) : 14}
              style={styles.icon}
            />
          ) : (
            <IonIcon
              name="star-outline"
              color={colors.Gray_Color}
              size={size ? handleSize(size) : 14}
              style={styles.icon}
            />
          )}
        </TouchableOpacity>
      ))}
      {numberReviews && (
        <RowComponent>
          <View>
            <TextComponent
              text={` (${numberReviews})`}
              size={10}
              font={fontFamilies.regular}
              color={colors.Gray_Color}
            />
          </View>
        </RowComponent>
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
