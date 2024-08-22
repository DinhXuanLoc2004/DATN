import React, {FC, memo} from 'react';
import {categories_select} from '../../../constants/filter';
import TextSelectComponent from '../../texts/TextSelectComponent';
import RowComponent from '../RowComponent';

interface Props {
  select: string;
  set_select: (val: string) => void;
}

const SelectCategoriesComponent: FC<Props> = ({select, set_select}) => {
  return (
    <RowComponent justify="space-around" style={{flexWrap: 'wrap', flex: 1}}>
      {categories_select.map((item, index) => (
        <TextSelectComponent
          key={index}
          text={item}
          onPress={() => set_select(item)}
          isSelected={item === select}
          width={100}
          marginVetycal={6}
          marginRight={0}
        />
      ))}
    </RowComponent>
  );
};

export default memo(SelectCategoriesComponent);
