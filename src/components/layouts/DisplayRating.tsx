import React, {FC} from 'react';
import {StyleSheet} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {colors} from '../../constants/colors';
import {fontFamilies} from '../../constants/fontFamilies';
import {formatOrder} from '../../utils/fotmats';
import {handleSize} from '../../utils/handleSize';
import TextComponent from '../texts/TextComponent';
import RowComponent from './RowComponent';
import SpaceComponent from './SpaceComponent';

interface Props {
  avg_rating: number;
  total_order: number;
  size_icon?: number;
  size_text?: number;
}

const DisplayRating: FC<Props> = ({
  avg_rating,
  total_order,
  size_icon,
  size_text,
}) => {
  return (
    <RowComponent justify="flex-start">
      <FontAwesome5
        name="star"
        size={handleSize(size_icon ?? 14)}
        color={colors.Yellow_Color}
        solid
      />
      <SpaceComponent width={5} />
      <TextComponent
        text={`${avg_rating.toFixed(1)}`}
        size={size_text ?? 14}
        font={fontFamilies.medium}
      />
      {total_order > 0 && (
        <TextComponent
          text={`, Sold ${formatOrder(total_order)}`}
          size={size_text ?? 14}
          font={fontFamilies.medium}
        />
      )}
    </RowComponent>
  );
};

export default DisplayRating;

const styles = StyleSheet.create({});
