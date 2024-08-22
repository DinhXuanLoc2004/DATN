import React, { memo } from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {colors} from '../../../constants/colors';
import {handleSize} from '../../../utils/handleSize';
import RowComponent from '../RowComponent';
import {colors_select, Props_Select} from '../../../constants/filter';
import {handleSelect} from '../../../utils/handleSelect';

const SelectColorsComponent: React.FC<Props_Select> = ({
  arr_select,
  set_arr_select,
}) => {
  return (
    <RowComponent justify="space-between">
      {colors_select.map((item, index) => (
        <TouchableOpacity
          onPress={() =>
            handleSelect(item, arr_select, set_arr_select)
          }
          key={index}
          style={[
            styles.btnSelect,
            {
              borderColor: arr_select.includes(item)
                ? colors.Primary_Color
                : colors.White_Color,
            },
          ]}>
          <View style={[styles.viewBg, {backgroundColor: item}]} />
        </TouchableOpacity>
      ))}
    </RowComponent>
  );
};

export default memo(SelectColorsComponent);

const styles = StyleSheet.create({
  viewBg: {
    borderRadius: 100,
    width: handleSize(36),
    height: handleSize(36),
  },
  btnSelect: {
    width: handleSize(44),
    height: handleSize(44),
    borderRadius: 100,
    borderWidth: handleSize(1.5),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
