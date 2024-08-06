import React, { FC, ReactNode } from 'react'
import { StyleProp, View, ViewStyle } from 'react-native'

interface Props {
    children: ReactNode,
    style?: StyleProp<ViewStyle>
}

const SectionComponent: FC<Props> = ({children, style}) => {
  return (
    <View style={[{flex: 1},style]}>
      {children}
    </View>
  )
}

export default SectionComponent