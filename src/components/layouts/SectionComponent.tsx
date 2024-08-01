import { View, Text } from 'react-native'
import React, { FC, ReactNode } from 'react'

interface Props {
    children: ReactNode
}

const SectionComponent: FC<Props> = ({children}) => {
  return (
    <View>
      {children}
    </View>
  )
}

export default SectionComponent