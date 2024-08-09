import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import {colors} from '../../constants/colors';
import {fontFamilies} from '../../constants/fontFamilies';
import RowComponent from '../layouts/RowComponent';
import TextComponent from './TextComponent';

interface Props {
  color: string;
  size: string;
}

const TextColorAndSizeComponent: FC<Props> = ({color, size}) => {
  return (
    <RowComponent
      justify="space-between"
      style={{width: '100%', marginBottom: 5}}>
      <RowComponent justify="flex-start" flex={1}>
        <TextComponent
          text="Color: "
          color={colors.Gray_Color}
          font={fontFamilies.regular}
          size={11}
        />
        <TextComponent
          text={color}
          size={11}
          color={colors.Text_Color}
          font={fontFamilies.regular}
        />
      </RowComponent>
      <RowComponent justify="flex-start" flex={1}>
        <TextComponent
          text="Size: "
          color={colors.Gray_Color}
          font={fontFamilies.regular}
          size={11}
        />
        <TextComponent text={size} size={11} font={fontFamilies.regular} />
      </RowComponent>
      <View style={{flex: 1}} />
    </RowComponent>
  );
};

export default TextColorAndSizeComponent;

const styles = StyleSheet.create({});
