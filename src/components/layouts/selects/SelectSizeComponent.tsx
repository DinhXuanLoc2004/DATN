import React, { FC, memo } from 'react';
import { Props_Select, sizes_select } from '../../../constants/filter';
import { handleSelect } from '../../../utils/handleSelect';
import TextSelectComponent from '../../texts/TextSelectComponent';
import RowComponent from '../RowComponent';
import { sizeType } from '../../../helper/types/size.type';
import { FlatList } from 'react-native';

interface Props {
  data: Array<sizeType>,
  arr_select: Array<string>,
  set_arr_select: (arr_select: Array<string>) => void
}

const SelectSizeComponent: FC<Props> = ({data, arr_select, set_arr_select}) => {
  return (
    <RowComponent justify='flex-start'>
      <FlatList
      data={data}
      keyExtractor={(_,index) => index.toString()}
      renderItem={({item}) => (
        <TextSelectComponent
          text={item.size}
          onPress={() => handleSelect(item._id, arr_select, set_arr_select)}
          isSelected={arr_select.includes(item._id)}
        />
      )}
      horizontal
      showsHorizontalScrollIndicator={false}
      />
    </RowComponent>
  );
};

export default memo(SelectSizeComponent);

