import React, {FC, memo} from 'react';
import {StyleProp, Text, TextStyle} from 'react-native';
import {colors} from '../../constants/colors';
import {fontFamilies} from '../../constants/fontFamilies';
import {globalStyles} from '../../styles/globalStyle';

interface Props {
  text: string;
  size?: number;
  font?: string;
  color?: string;
  line?: number;
  heightLine?: number;
  style?: StyleProp<TextStyle>;
  flex?: number;
}

const TextComponent: FC<Props> = ({
  text,
  size,
  font,
  color,
  line,
  heightLine,
  style,
  flex,
}) => {
  return (
    <Text
      style={[
        globalStyles.text,
        {
          fontSize: size ?? 16,
          fontFamily: font ?? fontFamilies.regular,
          color: color ?? colors.Text_Color,
          flex: flex ?? 0,
        },
        style,
      ]}>
      {text}
    </Text>
  );
};

export default memo(TextComponent);
