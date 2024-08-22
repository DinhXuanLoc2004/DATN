import React, { memo } from 'react';
import {StyleSheet, TouchableOpacity, ViewStyle} from 'react-native';
import {colors} from '../../constants/colors';
import {fontFamilies} from '../../constants/fontFamilies';
import {handleSize} from '../../utils/handleSize';
import TextComponent from './TextComponent';

interface Props {
  text: string;
  width?: number;
  height?: number;
  marginRight?: number;
  isSelected: boolean;
  onPress: () => void;
  marginVetycal?: number;
  style?: ViewStyle
}

const TextSelectComponent: React.FC<Props> = ({
  text,
  width,
  height,
  marginRight,
  isSelected,
  onPress,
  marginVetycal,
  style
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          width: handleSize(width ?? 40),
          height: handleSize(height ?? 40),
          marginRight: handleSize(marginRight ?? 16),
          marginVertical: handleSize(marginVetycal ?? 0),
          borderColor: isSelected ? colors.Primary_Color : colors.Gray_Color,
          backgroundColor: isSelected
            ? colors.Primary_Color
            : colors.White_Color,
        },
        style
      ]}
      onPress={onPress}>
      <TextComponent
        text={text}
        font={fontFamilies.medium}
        size={14}
        color={isSelected ? colors.White_Color : colors.Text_Color}
      />
    </TouchableOpacity>
  );
};

export default memo(TextSelectComponent);

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: handleSize(8),
  },
});
