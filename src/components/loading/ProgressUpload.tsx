import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import DialogBase from '../dialogs/DialogBase';
import * as Progress from 'react-native-progress';
import {handleSize} from '../../utils/handleSize';
import {colors} from '../../constants/colors';
import TextComponent from '../texts/TextComponent';
import {fontFamilies} from '../../constants/fontFamilies';
import SpaceComponent from '../layouts/SpaceComponent';

interface Props {
  progress: number;
  is_visible: boolean;
  title: string;
}

const ProgressUpload: FC<Props> = ({is_visible, progress, title}) => {
  return (
    <DialogBase isVisible={is_visible} backgroundColor="rgba(0,0,0,0.8)">
      <TextComponent
        text={title}
        color={colors.White_Color}
        font={fontFamilies.medium}
        size={15}
      />
      <SpaceComponent height={10} />
      <Progress.Bar
        width={handleSize(200)}
        color={colors.Primary_Color}
        progress={progress}
        unfilledColor={colors.White_Color}
      />
    </DialogBase>
  );
};

export default ProgressUpload;

const styles = StyleSheet.create({});
