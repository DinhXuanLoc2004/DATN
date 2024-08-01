import { View, Text, StyleProp, TouchableOpacity, ViewStyle } from 'react-native'
import React, { Children, FC, ReactNode } from 'react'
import { globalStyles } from '../../styles/globalStyle';

interface Props {
    children: ReactNode;
    justify?:
    | 'center'
    | 'flex-start'
    | 'flex-end'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
    | undefined;
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
    disable?: boolean
}

const RowComponent: FC<Props> = ({ children, justify, onPress, style, disable }) => {
    const LocalStyle = [
        globalStyles.row,
        {
            justifyContent: justify ?? 'center',
        },
        style
    ]
    return onPress ? (
        <TouchableOpacity
            disabled={disable}
            onPress={onPress ? () => onPress() : undefined}
            style={LocalStyle}
        >
            {children}
        </TouchableOpacity>
    ) : (
        <View style={LocalStyle}>{children}</View>
    )
}

export default RowComponent