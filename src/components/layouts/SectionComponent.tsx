import { View, Text, StyleProp, ViewStyle } from 'react-native'
import React, { FC, ReactNode } from 'react'

interface Props {
    children: ReactNode,
    style?: StyleProp<ViewStyle>
}

const SectionComponent: FC<Props> = ({children, style}) => {
  return (
    <View style={[style]}>
      {children}
    </View>
  )
}

export default SectionComponent