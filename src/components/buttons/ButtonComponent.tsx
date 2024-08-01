import { View, Text, StyleProp, ViewStyle, TouchableOpacity } from 'react-native'
import React, { FC } from 'react'
import { globalStyles } from '../../styles/globalStyle'
import TextComponent from '../texts/TextComponent'
import { fontFamilies } from '../../constants/fontFamilies'
import { colors } from '../../constants/colors'

interface Props {
    text: string,
    colorButton?: string,
    onPress: () => void,
    style?: StyleProp<ViewStyle>,
    colorText?: string
}

const ButtonComponent: FC<Props> = ({ text, colorButton, onPress, style, colorText }) => {
    return (
        <TouchableOpacity
        onPress={onPress}
            style={[
                globalStyles.button,
                {
                    backgroundColor: colorButton ?? colors.Primary_Color
                },
                style
            ]}>
            <TextComponent
                text={text}
                size={14}
                font={fontFamilies.medium}
                color={colorText ?? colors.White_Color}
            />
        </TouchableOpacity>
    )
}

export default ButtonComponent