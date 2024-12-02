import {Modal, StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import SectionComponent from '../layouts/SectionComponent';
import {TouchableOpacity} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {handleSize} from '../../utils/handleSize';
import {colors} from '../../constants/colors';
import RowComponent from '../layouts/RowComponent';
import SpaceComponent from '../layouts/SpaceComponent';
import TextComponent from '../texts/TextComponent';
import {fontFamilies} from '../../constants/fontFamilies';
import {media} from '../../helper/types/media.type';
import SliderImageComponent from '../layouts/SliderImageComponent';

interface Props {
  medias: media[];
  is_visible: boolean;
  set_isvisible: (val: boolean) => void;
  media_index: number;
  setmedia_index: (val: number) => void;
}

const MediaViewing: FC<Props> = ({
  is_visible,
  media_index,
  medias,
  set_isvisible,
  setmedia_index,
}) => {
  return (
    <Modal visible={is_visible} transparent animationType="slide">
      <SectionComponent style={styles.container}>
        <SpaceComponent height={20} />
        <RowComponent justify="flex-end">
          <TouchableOpacity onPress={() => set_isvisible(false)}>
            <FontAwesome5
              name="times"
              size={handleSize(25)}
              color={colors.White_Color}
            />
          </TouchableOpacity>
          <SpaceComponent width={20} />
        </RowComponent>
        <SpaceComponent height={10} />
        <SectionComponent style={styles.containerMedia}>
          <SliderImageComponent
            images={medias}
            index={media_index}
            setindex={setmedia_index}
          />
        </SectionComponent>
        <SpaceComponent height={10} />
        <RowComponent justify="center">
          <TextComponent
            text={`${media_index + 1}/${medias.length}`}
            color={colors.White_Color}
            size={14}
            font={fontFamilies.medium}
          />
        </RowComponent>
        <SpaceComponent height={25} />
      </SectionComponent>
    </Modal>
  );
};

export default MediaViewing;

const styles = StyleSheet.create({
  containerMedia: {
    justifyContent: 'center',
  },
  container: {
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
});
