import React, {FC, memo} from 'react';
import {StyleProp, Text, TextStyle} from 'react-native';
import {colors} from '../../constants/colors';
import {fontFamilies} from '../../constants/fontFamilies';
import {globalStyles} from '../../styles/globalStyle';
import { handleSize } from '../../utils/handleSize';

interface Props {
  text: string;
  size?: number;
  font?: string;
  color?: string;
  line?: number;
  lineHeight?: number;
  style?: StyleProp<TextStyle>;
  flex?: number;
}

const TextComponent: FC<Props> = ({
  text,
  size,
  font,
  color,
  line,
  lineHeight,
  style,
  flex,
}) => {
  return (
    <Text
      style={[
        globalStyles.text,
        {
          fontSize: size ? handleSize(size) : handleSize(16),
          fontFamily: font ?? fontFamilies.regular,
          color: color ?? colors.Text_Color,
          flex: flex ?? 0,
          lineHeight: lineHeight ? handleSize(lineHeight) : size ? handleSize(size) : handleSize(16),
        },
        style,
      ]}>
      {text}
    </Text>
  );
};

export default memo(TextComponent);
