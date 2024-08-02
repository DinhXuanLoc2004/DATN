import { StyleProp, StyleSheet, Text, TextInput, TouchableOpacity, View, ViewStyle } from 'react-native'
import React, { FC, ReactNode, useState, memo } from 'react'
import { globalStyles } from '../../styles/globalStyle'
import { colors } from '../../constants/colors'
import TextComponent from '../texts/TextComponent'
import { fontFamilies } from '../../constants/fontFamilies'
import RowComponent from '../layouts/RowComponent'
import { CloseCircle, CloseSquare, Eye, EyeSlash, PenClose, TickCircle } from 'iconsax-react-native'
import IonIcon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Animated, {
    Extrapolation,
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withTiming
} from 'react-native-reanimated';

interface Props {
    value: string,
    onChange: (val: string) => void,
    plahoder?: string,
    isPassword?: boolean,
    iconLeft?: ReactNode,
    style?: StyleProp<ViewStyle>,
    isSuccess?: boolean,
    isError?: boolean,
    allowClean?: boolean,
    errorMessage?: string
}

const TextInputAnimated = Animated.createAnimatedComponent(TextInput);

const TextInputComponent: FC<Props> = ({ value, onChange, plahoder, isPassword, iconLeft, style, isSuccess, isError, allowClean, errorMessage }) => {
    const [hidePassword, sethidePassword] = useState(isPassword ? true : false);
    const label = useSharedValue(plahoder)
    const translateY = useSharedValue(0)


    const triggerAnimation = (value: number, isFocus: boolean) => {
        if (isFocus) {
            label.value = ''
        }
        translateY.value = withTiming(value, {}, (isFinished) => {
            if (isFinished && !isFocus) {
                label.value = plahoder;
            }
        });
    };

    const labelAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateY: translateY.value,
                },
            ],
            opacity: interpolate(
                translateY.value,
                [0, -16 * 2],
                [0, 1],
                Extrapolation.CLAMP,
            ),
        };
    });

    return (
        <View style={styles.containerInput}>
            <RowComponent style={[
                globalStyles.input,
                {
                    borderWidth: 1,
                    borderColor: isSuccess ? colors.Success_Color : isError ? colors.Error_Color : colors.White_Color,
                    zIndex: 0
                },
                style
            ]}>
                {iconLeft && iconLeft}

                <View style={[{flex: 1}]}>
                    <Animated.Text style={[styles.label, labelAnimatedStyle]}>
                        {plahoder}
                    </Animated.Text>
                    <TextInputAnimated
                        value={value}
                        onChangeText={(val) => onChange(val)}
                        placeholder={label}
                        style={styles.textInput}
                        secureTextEntry={hidePassword}
                        onFocus={() => {
                            triggerAnimation(-16 * 2, true);
                        }}
                        onBlur={() => {
                            triggerAnimation(0, false);
                        }}
                    />
                </View>

                {
                    isPassword ?
                        <TouchableOpacity onPress={() => sethidePassword(!hidePassword)}>
                            {
                                !hidePassword ?
                                    <IonIcon name='eye-outline' size={24} color={isSuccess ? colors.Success_Color : isError ? colors.Error_Color : colors.Text_Color} />
                                    : <IonIcon name='eye-off-outline' size={24} color={isSuccess ? colors.Success_Color : isError ? colors.Error_Color : colors.Text_Color} />
                            }
                        </TouchableOpacity>
                        : value !== '' && !isSuccess ?
                            <TouchableOpacity onPress={() => onChange('')}>
                                <AntDesign name='close'
                                    size={24}
                                    color={isError ? colors.Error_Color : colors.Text_Color}
                                />
                            </TouchableOpacity>
                            : isSuccess ?
                                <TickCircle size={24} color={colors.Success_Color} /> : <View />
                }

            </RowComponent>
            {errorMessage &&
                <TextComponent
                    text={errorMessage}
                    color={colors.Error_Color}
                    font={fontFamilies.regular}
                    size={11}
                    style={{ marginTop: 5 }}
                />}
        </View>
    )
}

export default memo(TextInputComponent)

const styles = StyleSheet.create({
    label: {
        position: 'absolute',
        alignSelf: 'flex-start',
        opacity: 0,
        color: colors.Text_Color,
        fontFamily: fontFamilies.regular,
        fontSize: 16
    },
    input: {
        padding: 0,
        margin: 0,
    },
    container: {
        // borderColor: 'black',
        // flexDirection: 'row',
        // alignItems: 'stretch',
        // paddingVertical: 16,
        // borderBottomWidth: 1,
        // borderBottomColor: 'black',
    },
    textInput: {
        flex: 1,
        fontFamily: fontFamilies.medium,
        fontSize: 14
    },
    containerInput: {
        alignItems: 'center'
    }
})