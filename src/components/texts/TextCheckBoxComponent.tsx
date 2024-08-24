import React, { memo } from 'react';
import { StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { colors } from '../../constants/colors';
import { fontFamilies } from '../../constants/fontFamilies';
import { handleSize } from '../../utils/handleSize';
import RowComponent from '../layouts/RowComponent';
import SectionComponent from '../layouts/SectionComponent';
import TextComponent from './TextComponent';
interface Props {
  text: string;
  isSelected: boolean;
  onPress: () => void;
  style?: ViewStyle;
}

const TextCheckBoxComponent: React.FC<Props> = ({
  text,
  isSelected,
  onPress,
  style,
}) => {
  return (
    <TouchableOpacity
      style={[
        {
          width: '100%',
        },
        style,
      ]}
      onPress={onPress}>
      <RowComponent justify="space-between">
        <TextComponent
          text={text}
          font={fontFamilies.medium}
          color={isSelected ? colors.Primary_Color : colors.Text_Color}
        />
        <SectionComponent
          flex={0}
          style={[styles.checkbox, isSelected && styles.checkboxSelected]}>
          {isSelected && (
            <Ionicon
              name="checkmark"
              size={handleSize(20)}
              color={colors.White_Color}
            />
          )}
        </SectionComponent>
      </RowComponent>
    </TouchableOpacity>
  );
};

export default memo(TextCheckBoxComponent);

const styles = StyleSheet.create({
  checkbox: {
    width: handleSize(24),
    height: handleSize(24),
    borderRadius: handleSize(4),
    borderWidth: 2,
    borderColor: colors.Gray_Color,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxSelected: {
    backgroundColor: colors.Primary_Color,
    borderColor: colors.Primary_Color,
  },
});
