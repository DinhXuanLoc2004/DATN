import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../../../constants/colors';
import { fontFamilies } from '../../../constants/fontFamilies';
import { handleSize } from '../../../utils/handleSize';
import TextComponent from '../../texts/TextComponent';
import RowComponent from '../RowComponent';
import SectionComponent from '../SectionComponent';
import SpaceComponent from '../SpaceComponent';

interface Props {
  fullname: string;
  province_city: string;
  district: string;
  commune_ward: string;
  house_number: string;
  isSelected: boolean;
  onEditPress: () => void;
  onCheckboxToggle: () => void;
}

const ItemAddress: React.FC<Props> = ({
  fullname,
  province_city,
  district,
  commune_ward,
  house_number,
  isSelected,
  onEditPress,
  onCheckboxToggle,
}) => {
  return (
    <SectionComponent style={styles.container}>
      <RowComponent>
        <TextComponent
          text={fullname}
          size={14}
          font={fontFamilies.medium}
        />
        <TouchableOpacity onPress={onEditPress}>
          <TextComponent
            text='Edit'
            size={14}
            font={fontFamilies.medium}
            color={colors.Primary_Color}
          />
        </TouchableOpacity>
      </RowComponent>
      <SpaceComponent height={10} />
      <TextComponent
        text={house_number}
        size={14}
        font={fontFamilies.regular}
      />
      <SpaceComponent height={8} />
      <TextComponent
        text={`${commune_ward}, ${district}, ${province_city}`}
        size={14}
        font={fontFamilies.regular}
      />
      <SpaceComponent height={10} />
      <RowComponent justify='flex-start'>
        <TouchableOpacity onPress={onCheckboxToggle}>
          <Icon
            name={isSelected ? "check-box" : "check-box-outline-blank"}
            size={24}
            color={isSelected ? colors.Text_Color : colors.Gray_Color}
          />
        </TouchableOpacity>
        <TextComponent
          style={styles.use}
          text='Use as the shipping address'
          size={14}
          font={fontFamilies.regular}
        />
      </RowComponent>
    </SectionComponent>
  );
};

const styles = {
  container: {
    flex: 0,
    borderRadius: handleSize(8),
    padding: handleSize(20),
    marginTop: handleSize(20),
    marginLeft: handleSize(16),
    marginRight: handleSize(16),
    backgroundColor: colors.White_Color,
    shadowColor: colors.Gray_Color,
    elevation: handleSize(3),
  },
  use: {
    marginLeft: handleSize(8)
  }
};

export default ItemAddress;
