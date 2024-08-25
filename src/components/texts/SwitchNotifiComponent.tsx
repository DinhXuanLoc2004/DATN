import React, {memo} from 'react';
import {StyleSheet, TouchableOpacity, ViewStyle, Switch} from 'react-native';
import {colors} from '../../constants/colors';
import {handleSize} from '../../utils/handleSize';
import RowComponent from '../layouts/RowComponent';
import TextComponent from './TextComponent';
import {fontFamilies} from '../../constants/fontFamilies';

interface Props {
  text: string;
  isSelected: boolean;
  onPress: () => void;
  style?: ViewStyle;
}

const SwitchNotifiComponent: React.FC<Props> = ({
  text,
  isSelected,
  onPress,
  style,
}) => {
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <RowComponent>
        <TextComponent
          text={text}
          font={fontFamilies.medium}
          size={handleSize(14)}
          color={colors.Text_Color}
        />
        <Switch
          value={isSelected}
          onValueChange={onPress}
          trackColor={{false: colors.Gray_Color, true: colors.Gray_Color}}
          thumbColor={isSelected ? colors.Success_Color : colors.White_Color}
        />
      </RowComponent>
    </TouchableOpacity>
  );
};

export default memo(SwitchNotifiComponent);

const styles = StyleSheet.create({
  container: {
    paddingVertical: handleSize(10),
  },
});
