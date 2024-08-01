import { View, Text, ViewStyle } from 'react-native'
import React, { FC } from 'react'
import { ViewProps } from 'react-native-svg/lib/typescript/fabric/utils'

type Props = Pick<ViewStyle, 'width' | 'height'>

const SpaceComponent: FC<Props> = ({width, height}) => {
  return (
    <View style={{width: width, height: height}}/>
  )
}

export default SpaceComponent