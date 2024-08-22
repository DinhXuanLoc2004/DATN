import React, { FC, memo } from 'react';
import { StyleSheet } from 'react-native';
import { Props_Select, sizes_select } from '../../../constants/filter';
import { handleSelect } from '../../../utils/handleSelect';
import TextSelectComponent from '../../texts/TextSelectComponent';
import RowComponent from '../RowComponent';

const SelectSizeComponent: FC<Props_Select> = ({arr_select, set_arr_select}) => {
  return (
    <RowComponent justify='flex-start'>
      {sizes_select.map((item, index) => (
        <TextSelectComponent
          key={index}
          text={item}
          onPress={() => handleSelect(item, arr_select, set_arr_select)}
          isSelected={arr_select.includes(item)}
        />
      ))}
    </RowComponent>
  );
};

export default memo(SelectSizeComponent);

