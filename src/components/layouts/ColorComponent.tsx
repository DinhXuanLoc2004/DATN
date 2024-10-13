import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {colorType} from '../../helper/types/color.type';
import RowComponent from './RowComponent';
import {handleSize} from '../../utils/handleSize';
import {colors} from '../../constants/colors';

interface Props {
  colors_props: colorType[];
}

const ColorComponent: FC<Props> = ({colors_props}) => {
  const colors = colors_props.slice(0, 3);
  return (
    <RowComponent justify="flex-start">
      {colors.map((color, index) => (
        <View key={index} style={styles.containerItemColor}>
          <View
            style={[styles.itemColor, {backgroundColor: color.hex_color}]}
          />
        </View>
      ))}
    </RowComponent>
  );
};

export default ColorComponent;

const styles = StyleSheet.create({
  containerItemColor: {
    marginRight: 3,
    width: handleSize(22),
    height: handleSize(22),
    backgroundColor: colors.Gray_Light_Color,
    borderRadius: handleSize(11),
    justifyContent: 'center',
    alignItems: 'center'
  },
  itemColor: {
    width: handleSize(18),
    height: handleSize(18),
    borderRadius: handleSize(8),
  },
});
