import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { FC } from 'react'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { handleSize } from '../../../utils/handleSize';
import { colors } from '../../../constants/colors';

interface Props {
    onPress: () => void 
}

const IconSearch: FC<Props> = ({onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
        <FontAwesome5 name='search' size={handleSize(22)} color={colors.Text_Color}/>
    </TouchableOpacity>
  )
}

export default IconSearch

const styles = StyleSheet.create({})