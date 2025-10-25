import React, {FC, memo} from 'react';
import {FlatList} from 'react-native';
import {Props_Select, brands_select} from '../../../constants/filter';
import {handleSelect} from '../../../utils/handleSelect';
import TextCheckBoxComponent from '../../texts/TextCheckBoxComponent';
import SpaceComponent from '../SpaceComponent';
import {brandType} from '../../../helper/types/brand.type';
import {BottomSheetFlashList} from '@gorhom/bottom-sheet';

interface Props {
  data: Array<brandType>;
  arr_select: Array<string>;
  set_arr_select: (arr_select: Array<string>) => void;
}

const SelectBrandsComponent: FC<Props> = ({
  data,
  arr_select,
  set_arr_select,
}) => {
  return (
    <BottomSheetFlashList
      data={data}
      extraData={arr_select}
      estimatedItemSize={data.length}
      keyExtractor={(item: brandType) => item._id}
      renderItem={({item}: {item: brandType}) => (
        <TextCheckBoxComponent
          thumb={item.thumb_brand}
          text={item.name_brand}
          onPress={() => {
            handleSelect(item._id, arr_select, set_arr_select);
          }}
          isSelected={arr_select.includes(item._id)}
        />
      )}
      ItemSeparatorComponent={() => <SpaceComponent height={28} />}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default SelectBrandsComponent;
