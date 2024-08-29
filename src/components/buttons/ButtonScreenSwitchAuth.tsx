import { ArrowRight } from 'iconsax-react-native';
import React, { FC } from 'react';
import { TouchableOpacity } from 'react-native';
import { colors } from '../../constants/colors';
import { fontFamilies } from '../../constants/fontFamilies';
import RowComponent from '../layouts/RowComponent';
import SectionComponent from '../layouts/SectionComponent';
import SpaceComponent from '../layouts/SpaceComponent';
import TextComponent from '../texts/TextComponent';
import { handleSize } from '../../utils/handleSize';

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
              size={handleSize(24)}
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
