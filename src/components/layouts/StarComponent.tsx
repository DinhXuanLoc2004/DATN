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
  spaceStar?: number;
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
  spaceStar,
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
            onPress &&
              onPress(
                roudingStar > 1 && index + 1 === roudingStar
                  ? index
                  : index + 1,
              );
          }}>
          {!itemRating ? (
            <View>
              {roudingStar >= index + 1 ? (
                <IonIcon
                  name="star"
                  color={colors.Star_Color}
                  size={handleSize(size ?? 14)}
                  style={{
                    marginEnd: index === 4 ? 0 : handleSize(spaceStar ?? 3.5),
                  }}
                />
              ) : (
                <IonIcon
                  name="star-outline"
                  color={colors.Gray_Color}
                  size={handleSize(size ?? 14)}
                  style={{
                    marginEnd: index === 4 ? 0 : handleSize(spaceStar ?? 3.5),
                  }}
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
                  style={{
                    marginEnd: index === 4 ? 0 : handleSize(spaceStar ?? 3.5),
                  }}
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

const styles = StyleSheet.create({});
