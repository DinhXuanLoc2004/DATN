import React, {memo} from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import {colors} from '../../../constants/colors';
import {colorType} from '../../../helper/types/color.type';
import {handleSelect} from '../../../utils/handleSelect';
import {handleSize} from '../../../utils/handleSize';
import RowComponent from '../RowComponent';
import SpaceComponent from '../SpaceComponent';

interface Props {
  data: Array<colorType>;
  arr_select: Array<string>;
  set_arr_select: (arr_select: Array<string>) => void;
}

const SelectColorsComponent: React.FC<Props> = ({
  arr_select,
  set_arr_select,
  data,
}) => {
  return (
    <RowComponent justify="center">
      <FlatList
        data={data}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => handleSelect(item._id, arr_select, set_arr_select)}
            style={[
              styles.btnSelect,
              {
                borderColor: arr_select.includes(item._id)
                  ? colors.Primary_Color
                  : colors.White_Color,
              },
            ]}>
            <View style={[styles.viewBg, {backgroundColor: item.hex_color}]} />
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <SpaceComponent width={20} />}
        contentContainerStyle={{justifyContent: 'center', flex: 1}}
      />
    </RowComponent>
  );
};

export default memo(SelectColorsComponent);

const styles = StyleSheet.create({
  viewBg: {
    borderRadius: 100,
    width: handleSize(34),
    height: handleSize(34),
  },
  btnSelect: {
    width: handleSize(44),
    height: handleSize(44),
    borderRadius: 100,
    borderWidth: handleSize(2),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.Backgournd_Color,
  },
});
