import React, { FC, memo } from 'react';
import { Props_Select, brand_checkbox_select } from '../../../constants/filter';
import { handleSelect } from '../../../utils/handleSelect';
import TextCheckBoxComponent from '../../texts/TextCheckBoxComponent';
import SectionComponent from '../SectionComponent';

const SelectsCheckBoxComponent: FC<Props_Select> = ({
  arr_select,
  set_arr_select,
}) => {
  return (
    <SectionComponent>
      {brand_checkbox_select.map((item, index) => (
        <TextCheckBoxComponent
          key={index}
          text={item}
          onPress={() => handleSelect(item, arr_select, set_arr_select)}
          isSelected={arr_select.includes(item)}
          style={{
            paddingVertical: 12,
            paddingHorizontal: 20,
          }}
        />
      ))}
    </SectionComponent>
  );
};

export default memo(SelectsCheckBoxComponent);
