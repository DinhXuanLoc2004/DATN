import React, {FC, memo} from 'react';
import {StyleProp, TextStyle} from 'react-native';
import {fontFamilies} from '../../constants/fontFamilies';
import TextComponent from './TextComponent';
import { handleSize } from '../../utils/handleSize';

interface Props {
  text: string;
  color?: string;
  font?: string;
  size?: number;
  style?: StyleProp<TextStyle>;
  flex?: number;
  lineHeight?: number;
}

const TitleComponent: FC<Props> = ({
  text,
  color,
  font,
  size,
  style,
  flex,
  lineHeight,
}) => {
  return (
    <TextComponent
      text={text}
      size={size ?? handleSize(18)}
      font={font ?? fontFamilies.semiBold}
      color={color}
      flex={flex}
      style={style}
      lineHeight={lineHeight ? lineHeight : size ? size : handleSize(18)}
    />
  );
};

export default memo(TitleComponent);
