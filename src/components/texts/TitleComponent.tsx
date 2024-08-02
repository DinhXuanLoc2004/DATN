import { View, Text, StyleProp, TextStyle, TextProps } from 'react-native'
import React, { FC, memo } from 'react'
import { colors } from '../../constants/colors'
import { globalStyles } from '../../styles/globalStyle'
import { fontFamilies } from '../../constants/fontFamilies'
import TextComponent from './TextComponent'

interface Props {
  text: string,
  color?: string,
  font?: string,
  size?: number,
  style?: StyleProp<TextStyle>,
  flex?: number,
  heightLine?: number
}

const TitleComponent: FC<Props> = ({ text, color, font, size, style, flex, heightLine }) => {
  return (
    <TextComponent
      text={text}
      size={size ?? 18}
      font={font ?? fontFamilies.semiBold}
      color={color}
      flex={flex}
      style={style}
      heightLine={heightLine ?? 22}
    />
  )
}

export default memo(TitleComponent) 