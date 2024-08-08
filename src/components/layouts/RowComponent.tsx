import React, { FC, ReactNode } from 'react';
import { StyleProp, TouchableOpacity, View, ViewStyle } from 'react-native';
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
    disable?: boolean,
    flex?: number
}

const RowComponent: FC<Props> = ({ children, justify, onPress, style, disable, flex }) => {
    const LocalStyle = [
        globalStyles.row,
        {
            justifyContent: justify ?? 'center',
            flex: flex ?? 0
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