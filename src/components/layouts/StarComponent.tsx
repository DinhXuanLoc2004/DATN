import React, {FC, memo} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {colors} from '../../constants/colors';
import {fontFamilies} from '../../constants/fontFamilies';
import TextComponent from '../texts/TextComponent';
import RowComponent from './RowComponent';
import SpaceComponent from './SpaceComponent';

interface Props {
  star?: number;
  size?: number;
  maxStar?: number;
  onPress?: (star: number) => void;
  numberReviews?: number;
}

const StarComponent: FC<Props> = ({
  star,
  size,
  maxStar,
  onPress,
  numberReviews,
}) => {
  const roudingStar = Math.floor(star ?? 1);
  const lengthListStar = maxStar ?? 5;
  return (
    <RowComponent>
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
              size={size ?? 14}
              style={styles.icon}
            />
          ) : (
            <IonIcon
              name="star-outline"
              color={colors.Gray_Color}
              size={size ?? 14}
              style={styles.icon}
            />
          )}
        </TouchableOpacity>
      ))}
      {numberReviews && (
        <RowComponent>
          <SpaceComponent width={2} />
          <TextComponent
            text={`(${numberReviews})`}
            size={10}
            font={fontFamilies.regular}
            color={colors.Gray_Color}
          />
        </RowComponent>
      )}
    </RowComponent>
  );
};

export default memo(StarComponent);

const styles = StyleSheet.create({
  icon: {
    marginHorizontal: 2,
  },
});
