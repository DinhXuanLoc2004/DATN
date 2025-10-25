import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {colors} from '../../constants/colors';
import {fontFamilies} from '../../constants/fontFamilies';
import {handleSize} from '../../utils/handleSize';
import RowComponent from '../layouts/RowComponent';
import SectionComponent from '../layouts/SectionComponent';
import SpaceComponent from '../layouts/SpaceComponent';
import TextComponent from '../texts/TextComponent';

type Props = {
  title: string;
  description?: string;
  onPress: () => void;
};

const ButtonProfileComponent: React.FC<Props> = ({
  title,
  description,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <RowComponent justify="space-between">
        <SectionComponent>
          <TextComponent text={title} font={fontFamilies.semiBold} />
          {description && (
            <SectionComponent>
              <SpaceComponent height={9} />
              <TextComponent
                color={colors.Secondary_Text_Color}
                text={description}
                size={11}
              />
            </SectionComponent>
          )}
        </SectionComponent>
        <Icon
          name="chevron-forward"
          size={handleSize(24)}
          color={colors.Gray_Color}
        />
      </RowComponent>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: handleSize(18),
    paddingHorizontal: handleSize(14),
    borderBottomWidth: handleSize(1),
    borderBottomColor: 'rgba(155, 155, 155, 0.05)',
  },
});

export default ButtonProfileComponent;
