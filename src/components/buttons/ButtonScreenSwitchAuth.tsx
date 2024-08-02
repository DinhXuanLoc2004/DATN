import {View, Text, TouchableOpacity} from 'react-native';
import React, {FC} from 'react';
import SectionComponent from '../layouts/SectionComponent';
import RowComponent from '../layouts/RowComponent';
import TextComponent from '../texts/TextComponent';
import SpaceComponent from '../layouts/SpaceComponent';
import {ArrowRight} from 'iconsax-react-native';
import {colors} from '../../constants/colors';
import {fontFamilies} from '../../constants/fontFamilies';

interface Props {
  text: string;
  onPress?: () => void;
}

const ButtonScreenSwitchAuth: FC<Props> = ({text, onPress}) => {
  return (
    <SectionComponent>
      <RowComponent justify="flex-end">
        <TouchableOpacity onPress={onPress}>
          <RowComponent justify="flex-start" style={{alignItems: 'center'}}>
            <TextComponent text={text} size={14} font={fontFamilies.regular} />
            <SpaceComponent width={5} />
            <ArrowRight
              size={24}
              variant="Outline"
              color={colors.Primary_Color}
            />
          </RowComponent>
        </TouchableOpacity>
      </RowComponent>
    </SectionComponent>
  );
};

export default ButtonScreenSwitchAuth;
