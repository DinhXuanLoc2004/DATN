import {TickCircle} from 'iconsax-react-native';
import React, {FC, memo, ReactNode, useState} from 'react';
import {
  StyleProp,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import AntDesign from 'react-native-vector-icons/AntDesign';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {colors} from '../../constants/colors';
import {fontFamilies} from '../../constants/fontFamilies';
import {globalStyles} from '../../styles/globalStyle';
import RowComponent from '../layouts/RowComponent';
import TextComponent from '../texts/TextComponent';
import { handleSize } from '../../utils/handleSize';

interface Props {
  value: string;
  onChange: (val: string) => void;
  plahoder?: string;
  isPassword?: boolean;
  iconLeft?: ReactNode;
  style?: StyleProp<ViewStyle>;
  isSuccess?: boolean;
  isError?: boolean;
  allowClean?: boolean;
  errorMessage?: string;
}

const TextInputAnimated = Animated.createAnimatedComponent(TextInput);

const TextInputComponent: FC<Props> = ({
  value,
  onChange,
  plahoder,
  isPassword,
  iconLeft,
  style,
  isSuccess,
  isError,
  allowClean,
  errorMessage,
}) => {
  const [hidePassword, sethidePassword] = useState(isPassword ? true : false);
  const label = useSharedValue(plahoder);
  const translateY = useSharedValue(0);

  const triggerAnimation = (value: number, isFocus: boolean) => {
    if (isFocus) {
      label.value = '';
    }
    translateY.value = withTiming(value, {}, isFinished => {
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
      <RowComponent
        style={[
          globalStyles.input,
          {
            borderWidth: 1,
            borderColor: isSuccess
              ? colors.Success_Color
              : isError
              ? colors.Error_Color
              : colors.White_Color,
            zIndex: 0,
          },
          style,
        ]}>
        {iconLeft && iconLeft}

        <View style={[{flex: 1}]}>
          <Animated.Text style={[styles.label, labelAnimatedStyle]}>
            {plahoder}
          </Animated.Text>
          <TextInputAnimated
            value={value}
            onChangeText={val => onChange(val)}
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

        {isPassword ? (
          <TouchableOpacity onPress={() => sethidePassword(!hidePassword)}>
            {!hidePassword ? (
              <IonIcon
                name="eye-outline"
                size={handleSize(24)}
                color={
                  isSuccess
                    ? colors.Success_Color
                    : isError
                    ? colors.Error_Color
                    : colors.Text_Color
                }
              />
            ) : (
              <IonIcon
                name="eye-off-outline"
                size={handleSize(24)}
                color={
                  isSuccess
                    ? colors.Success_Color
                    : isError
                    ? colors.Error_Color
                    : colors.Text_Color
                }
              />
            )}
          </TouchableOpacity>
        ) : value !== '' && !isSuccess ? (
          <TouchableOpacity onPress={() => onChange('')}>
            <AntDesign
              name="close"
              size={handleSize(24)}
              color={isError ? colors.Error_Color : colors.Text_Color}
            />
          </TouchableOpacity>
        ) : isSuccess ? (
          <TickCircle size={handleSize(24)} color={colors.Success_Color} />
        ) : (
          <View />
        )}
      </RowComponent>
      {errorMessage && (
        <TextComponent
          text={errorMessage}
          color={colors.Error_Color}
          font={fontFamilies.regular}
          size={11}
          style={{marginTop: 5}}
        />
      )}
    </View>
  );
};

export default memo(TextInputComponent);

const styles = StyleSheet.create({
  label: {
    position: 'absolute',
    alignSelf: 'flex-start',
    opacity: 0,
    color: colors.Text_Color,
    fontFamily: fontFamilies.regular,
    fontSize: handleSize(16),
  },
  input: {
    padding: 0,
    margin: 0,
  },
  textInput: {
    flex: 1,
    fontFamily: fontFamilies.medium,
    fontSize: handleSize(14),
  },
  containerInput: {
    alignItems: 'center',
  },
});
