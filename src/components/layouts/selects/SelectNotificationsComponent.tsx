import React, {FC, memo} from 'react';
import {Props_Select, notifications_select} from '../../../constants/filter';
import {handleSelect} from '../../../utils/handleSelect';
import SwitchNotifiComponent from '../../texts/SwitchNotifiComponent';
import SectionComponent from '../SectionComponent';
const SelectNotificationsComponent: FC<Props_Select> = ({
  arr_select,
  set_arr_select,
}) => {
  return (
    <SectionComponent>
      {notifications_select.map((item, index) => (
        <SwitchNotifiComponent
          key={index}
          text={item}
          onPress={() => handleSelect(item, arr_select, set_arr_select)}
          isSelected={arr_select.includes(item)}
        />
      ))}
    </SectionComponent>
  );
};

export default memo(SelectNotificationsComponent);
