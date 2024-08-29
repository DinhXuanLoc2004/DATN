import React, { memo } from 'react';
import { StyleSheet, Switch, TouchableOpacity, ViewStyle } from 'react-native';
import { colors } from '../../constants/colors';
import { fontFamilies } from '../../constants/fontFamilies';
import { handleSize } from '../../utils/handleSize';
import RowComponent from '../layouts/RowComponent';
import SpaceComponent from '../layouts/SpaceComponent';
import TextComponent from './TextComponent';

interface Props {
  text: string;
  selected: boolean;
  set_selected: (val: boolean) => void;
  style?: ViewStyle;
}

const SwitchNotifiComponent: React.FC<Props> = ({
  text,
  selected,
  set_selected,
  style,
}) => {
  return (
    <TouchableOpacity style={[style]}>
      <RowComponent>
        <TextComponent text={text} font={fontFamilies.medium} size={14} />
        <RowComponent justify='flex-end'>
          <Switch
            value={selected}
            onValueChange={() => set_selected(!selected)}
            trackColor={{false: colors.Gray_Color, true: colors.Success_Color}}
            thumbColor={colors.White_Color}
            style={styles.switch}
          />
          <SpaceComponent width={3} />
        </RowComponent>
      </RowComponent>
    </TouchableOpacity>
  );
};

export default memo(SwitchNotifiComponent);

const styles = StyleSheet.create({
  switch: {
    transform: [
      {
        scale: 1.3,
      },
    ],
    elevation: handleSize(2)
  },
});
