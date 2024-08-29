import React, {FC, memo} from 'react';
import {FlatList} from 'react-native';
import {Props_Select, brands_select} from '../../../constants/filter';
import {handleSelect} from '../../../utils/handleSelect';
import TextCheckBoxComponent from '../../texts/TextCheckBoxComponent';
import SpaceComponent from '../SpaceComponent';

const SelectBrandsComponent: FC<Props_Select> = ({
  arr_select,
  set_arr_select,
}) => {
  return (
    <FlatList
      data={brands_select}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({item}) => (
        <TextCheckBoxComponent
          text={item}
          onPress={() => handleSelect(item, arr_select, set_arr_select)}
          isSelected={arr_select.includes(item)}
        />
      )}
      ItemSeparatorComponent={() => <SpaceComponent height={28} />}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default memo(SelectBrandsComponent);
