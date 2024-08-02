import {View, Text, StyleProp, ViewStyle, TouchableOpacity, ActivityIndicator} from 'react-native';
import React, {FC} from 'react';
import {globalStyles} from '../../styles/globalStyle';
import TextComponent from '../texts/TextComponent';
import {fontFamilies} from '../../constants/fontFamilies';
import {colors} from '../../constants/colors';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

interface Props {
  text: string;
  colorButton?: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  colorText?: string;
  isLoading?: boolean;
}

const ButtonComponent: FC<Props> = ({
  text,
  colorButton,
  onPress,
  style,
  colorText,
  isLoading,
}) => {
  return (
    <TouchableOpacity
      disabled={isLoading}
      onPress={onPress}
      style={[
        globalStyles.button,
        {
          backgroundColor: isLoading
            ? colors.White_Color
            : colorButton ?? colors.Primary_Color,
        },
        style,
      ]}>
      {isLoading ? (
        <ActivityIndicator color={colors.Primary_Color}/>
      ) : (
        <TextComponent
          text={text}
          size={14}
          font={fontFamilies.medium}
          color={colorText ?? colors.White_Color}
        />
      )}
    </TouchableOpacity>
  );
};

export default ButtonComponent;
